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
	taxonomy: Taxonomy;
	curatedTags: Record<string, string[]>;
}

async function readRegistry(directory: string): Promise<Registry> {
	const families = new Map<string, Family>();
	for (const provider of await readdir(join(directory, "families"))) {
		for (const id of await readdir(join(directory, "families", provider))) {
			if (families.has(id)) throw new Error(`Duplicate registry family: ${id}`);
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
	const label = (dictionary: Record<string, { label: string }>, id: string) => {
		if (!dictionary[id]) throw new Error(`Unknown registry taxonomy ID: ${id}`);
		return dictionary[id].label;
	};
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
		displayName: family?.displayName ?? family?.family ?? metadata.family,
		designer: family?.designer ?? "",
		classificationLabels: classifications.map((id) =>
			label(registry.taxonomy.classifications, id),
		),
		tagLabels: tags.map((id) => label(registry.taxonomy.tags, id)),
	};
}

export function checkRecordSizes(
	records: ReturnType<typeof projectRecord>[],
	maxBytes: number,
) {
	if (!Number.isSafeInteger(maxBytes) || maxBytes <= 0)
		throw new Error("ALGOLIA_MAX_RECORD_BYTES must be a positive integer");
	if (!records.length) throw new Error("Refusing to index an empty catalog");
	const sizes = records.map((record) => ({
		id: record.objectID,
		bytes: Buffer.byteLength(JSON.stringify(record)),
	}));
	const average = Math.ceil(
		sizes.reduce((sum, record) => sum + record.bytes, 0) / sizes.length,
	);
	const largest = sizes.reduce((a, b) => (a.bytes > b.bytes ? a : b));
	const oversized = sizes.filter(({ bytes }) => bytes > maxBytes);
	console.log(
		`${records.length} records; average ${average} bytes; largest ${largest.id}: ${largest.bytes} bytes; record limit ${maxBytes} bytes`,
	);
	if (oversized.length) console.error("Oversized records:", oversized);
	if (oversized.length || average > 10000)
		throw new Error(
			`${oversized.length} records exceed the configured cap; average must remain <= 10000 bytes. Verify Algolia plan limits before changing ALGOLIA_MAX_RECORD_BYTES.`,
		);
}

async function updateAlgoliaIndex() {
	const registry = await readRegistry(
		process.env.REGISTRY_DATA_DIR ?? ".registry/registry/data",
	);
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
	// Reserve enough digits for popularity during the offline size check.
	const records = ids.map((id, index) =>
		projectRecord(
			id,
			metadataImport[id],
			registry,
			Number.MAX_SAFE_INTEGER,
			randomIndexes[index],
		),
	);
	const maxBytes = Number(process.env.ALGOLIA_MAX_RECORD_BYTES ?? 10000);
	checkRecordSizes(records, maxBytes);
	if (process.argv.includes("--dry-run")) {
		console.log("Offline dry run complete; no stats or Algolia requests made.");
		return;
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
	for (const record of records) {
		const downloads = stats[record.objectID]?.total.npmDownloadMonthly ?? 0;
		if (!Number.isSafeInteger(downloads) || downloads < 0)
			throw new Error(`Invalid monthly downloads for ${record.objectID}`);
		record.downloadMonth = downloads;
	}
	// Preserve records outside this source during the additive rollout.
	const client = algoliasearch("WNATE69PVR", key);
	const tasks = await client.saveObjects({
		indexName: "prod_NAME",
		objects: records,
	});
	for (const { taskID } of tasks) {
		await client.waitForTask({ indexName: "prod_NAME", taskID });
	}
	console.log("Updated Algolia index prod_NAME");
}

if (import.meta.main) await updateAlgoliaIndex();
