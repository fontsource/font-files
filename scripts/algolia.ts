import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { algoliasearch } from "algoliasearch";
import metadataImport from "../metadata/fontsource.json";

type Metadata = (typeof metadataImport)[keyof typeof metadataImport];
interface Family {
	family: string;
	displayName?: string;
	designer?: string;
	classifications: string[];
	tags: string[];
	languages: string[];
}
interface Taxonomy {
	classifications: Record<string, { label: string }>;
	tags: Record<string, { label: string }>;
}
interface Registry {
	families: Map<string, Family>;
	languageIndexVersion: string;
	taxonomy: Taxonomy;
	curatedTags: Record<string, string[]>;
}

export function languageIndexVersion(
	families: ReadonlyMap<string, Pick<Family, "languages">>,
) {
	const membership = [...families]
		.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
		.map(([id, family]) => [id, [...family.languages].sort()]);
	return createHash("sha256").update(JSON.stringify(membership)).digest("hex");
}

async function readRegistry(): Promise<Registry> {
	const directory = ".registry/registry/data";
	const families = new Map<string, Family>();
	for (const provider of await readdir(join(directory, "families"))) {
		for (const id of await readdir(join(directory, "families", provider))) {
			families.set(
				id,
				JSON.parse(
					await readFile(
						join(directory, "families", provider, id, "family.json"),
						"utf8",
					),
				),
			);
		}
	}
	if (!families.size) throw new Error("Registry contains no families");
	return {
		families,
		languageIndexVersion: languageIndexVersion(families),
		taxonomy: JSON.parse(
			await readFile(join(directory, "taxonomy.json"), "utf8"),
		),
		curatedTags: JSON.parse(
			await readFile(join(directory, "family-tags.json"), "utf8"),
		),
	};
}

export function projectRecord(
	id: string,
	metadata: Metadata,
	registry: Registry,
	downloadMonth: number,
	randomIndex: number,
) {
	const family = registry.families.get(id);
	const classifications = family?.classifications ?? [];
	const tags = family
		? [
				...new Set([
					...family.tags,
					...Object.entries(registry.curatedTags)
						.filter(([, ids]) => ids.includes(id))
						.map(([tag]) => tag),
				]),
			].sort()
		: [];
	return {
		objectID: id,
		family: metadata.family,
		subsets: metadata.subsets,
		weights: metadata.weights,
		styles: metadata.styles,
		category: metadata.category,
		defSubset: metadata.defSubset,
		variable: Boolean(metadata.variable),
		lastModified: Math.floor(new Date(metadata.lastModified).getTime() / 1000),
		downloadMonth,
		randomIndex,
		classifications,
		tags,
		languageIds: family?.languages ?? [],
		languageIndexVersion: registry.languageIndexVersion,
		displayName: family?.displayName ?? family?.family ?? metadata.family,
		designer: family?.designer ?? "",
		classificationLabels: classifications.map(
			(id) => registry.taxonomy.classifications[id].label,
		),
		tagLabels: tags.map((id) => registry.taxonomy.tags[id].label),
	};
}

async function updateAlgoliaIndex() {
	const registry = await readRegistry();
	const ids = Object.keys(metadataImport) as (keyof typeof metadataImport)[];
	const missing = ids.filter((id) => !registry.families.has(id));
	if (missing.length)
		console.warn(
			`Registry missing ${missing.length} legacy families; retaining with empty new facets: ${missing.join(", ")}`,
		);
	const randomIndexes = [...ids.keys()];
	for (let i = randomIndexes.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[randomIndexes[i], randomIndexes[j]] = [randomIndexes[j], randomIndexes[i]];
	}
	const key = process.env.ALGOLIA_ADMIN_KEY;
	if (!key) throw new Error("ALGOLIA_ADMIN_KEY is required");
	const response = await fetch("https://api.fontsource.org/v1/stats");
	if (!response.ok)
		throw new Error(`Failed to fetch stats: ${response.status}`);
	const stats = (await response.json()) as Record<
		string,
		{ total: { npmDownloadMonthly: number } }
	>;
	const records = ids.map((id, index) => {
		const downloads = stats[id]?.total.npmDownloadMonthly ?? 0;
		if (!Number.isSafeInteger(downloads) || downloads < 0)
			throw new Error(`Invalid monthly downloads for ${id}`);
		return projectRecord(
			id,
			metadataImport[id],
			registry,
			downloads,
			randomIndexes[index],
		);
	});
	// Preserve records outside this source during the additive rollout.
	const client = algoliasearch("WNATE69PVR", key);
	await client.saveObjects({
		indexName: "prod_NAME",
		objects: records,
		waitForTasks: true,
	});
	console.log("Updated Algolia index prod_NAME");
}

if (import.meta.main) await updateAlgoliaIndex();
