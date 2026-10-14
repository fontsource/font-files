import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { algoliasearch } from "algoliasearch";
import metadataImport from "../metadata/fontsource.json";

type LegacyMetadata = (typeof metadataImport)[keyof typeof metadataImport];
type Metadata = Pick<
	LegacyMetadata,
	| "family"
	| "subsets"
	| "weights"
	| "styles"
	| "category"
	| "defSubset"
	| "lastModified"
> & { variable: boolean | LegacyMetadata["variable"] };
type PublishedVersions = { static?: string; variable?: string };
interface PackageOutput {
	manifest: {
		family: string;
		sourceModified: string;
		faces: { subset: string; weight: number | string; style: string }[];
	};
	metadata: {
		symbols?: { inputModes: string[] };
		distribution: {
			characters: { type: "all" } | { type: "subsets"; defaultSubset: string };
		};
	};
}
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

// Search facets summarize available styles and weights, not a Cartesian list of files.
export async function projectPublishedRecord(
	id: string,
	versions: PublishedVersions,
	registry: Registry,
	downloadMonth: number,
	randomIndex: number,
) {
	const legacy = (metadataImport as Record<string, LegacyMetadata>)[id];
	if (
		Object.values(versions).every(
			(version) => Number(version.split(".")[0]) < 6,
		)
	) {
		if (!legacy) throw new Error(`Missing legacy metadata for ${id}`);
		return projectRecord(
			id,
			{ ...legacy, variable: Boolean(versions.variable) },
			registry,
			downloadMonth,
			randomIndex,
		);
	}
	const packages = await Promise.all(
		(["static", "variable"] as const)
			.filter((kind) => versions[kind])
			.map(async (kind) => {
				const version = versions[kind]!;
				if (Number(version.split(".")[0]) < 6) {
					if (!legacy) throw new Error(`Missing legacy metadata for ${id}`);
					return legacy;
				}
				const response = await fetch(
					`https://api.fontsource.org/v1/packages/${id}/${kind}/${version}`,
					{ signal: AbortSignal.timeout(30_000) },
				);
				if (!response.ok)
					throw new Error(
						`Package output ${id}/${kind}@${version}: ${response.status}`,
					);
				const { manifest, metadata } = (await response.json()) as PackageOutput;
				const characters = metadata.distribution.characters;
				const weights = manifest.faces.flatMap(({ weight }) => {
					if (typeof weight === "number") return [weight];
					const [min, max = min] = weight.split(" ").map(Number);
					return [
						min,
						max,
						...Array.from({ length: 9 }, (_, i) => (i + 1) * 100).filter(
							(value) => value >= min && value <= max,
						),
					];
				});
				return {
					family: manifest.family,
					subsets: manifest.faces.map((face) => face.subset),
					weights,
					styles: manifest.faces.map((face) =>
						face.style === "normal" ? "normal" : "italic",
					),
					defSubset:
						characters.type === "all" ? "full" : characters.defaultSubset,
					lastModified: manifest.sourceModified,
					category:
						registry.families
							.get(id)
							?.classifications.map((value) =>
								value === "slab-serif" ? "serif" : value,
							)
							.find((value) =>
								[
									"serif",
									"sans-serif",
									"display",
									"handwriting",
									"monospace",
								].includes(value),
							) ??
						(metadata.symbols?.inputModes.includes("name-ligature")
							? "icons"
							: "other"),
				};
			}),
	);
	if (!packages.length) throw new Error(`No published package for ${id}`);
	const metadata = {
		...packages[0],
		family: registry.families.get(id)?.family ?? packages[0].family,
		subsets: [...new Set(packages.flatMap((pkg) => pkg.subsets))].sort(),
		weights: [...new Set(packages.flatMap((pkg) => pkg.weights))].sort(
			(a, b) => a - b,
		),
		styles: [...new Set(packages.flatMap((pkg) => pkg.styles))].sort(),
		variable: Boolean(versions.variable),
		lastModified: packages
			.map((pkg) => pkg.lastModified)
			.sort()
			.at(-1)!,
	};
	return projectRecord(id, metadata, registry, downloadMonth, randomIndex);
}

async function updateAlgoliaIndex() {
	const registry = await readRegistry();
	const published: Record<string, PublishedVersions> = JSON.parse(
		await readFile("metadata/published.json", "utf8"),
	);
	const ids = Object.keys(published);
	if (!ids.length)
		throw new Error("Refusing to index an empty publication index");
	const dryRun = process.argv.includes("--dry-run");
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
	if (!dryRun && !key) throw new Error("ALGOLIA_ADMIN_KEY is required");
	const response = await fetch("https://api.fontsource.org/v1/stats");
	if (!response.ok)
		throw new Error(`Failed to fetch stats: ${response.status}`);
	const stats = (await response.json()) as Record<
		string,
		{ total: { npmDownloadMonthly: number } }
	>;
	const records: ReturnType<typeof projectRecord>[] = new Array(ids.length);
	const pending = ids.entries();
	await Promise.all(
		Array.from({ length: 8 }, async () => {
			for (const [index, id] of pending) {
				const downloads = stats[id]?.total.npmDownloadMonthly ?? 0;
				if (!Number.isSafeInteger(downloads) || downloads < 0)
					throw new Error(`Invalid monthly downloads for ${id}`);
				records[index] = await projectPublishedRecord(
					id,
					published[id],
					registry,
					downloads,
					dryRun ? index : randomIndexes[index],
				);
			}
		}),
	);
	if (dryRun) {
		console.log(JSON.stringify(records, null, 2));
		return;
	}
	// Replace the complete projection so stale unpublished records cannot remain searchable.
	const client = algoliasearch("WNATE69PVR", key!);
	await client.replaceAllObjects({
		indexName: "prod_NAME",
		objects: records,
	});
	console.log("Updated Algolia index prod_NAME");
}

if (import.meta.main) await updateAlgoliaIndex();
