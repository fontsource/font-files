import { readdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseArgs } from "node:util";

type PublishedPackages = Record<string, { static?: string; variable?: string }>;

async function json(url: string) {
	const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
	if (!response.ok) throw new Error(`${response.status}: ${url}`);
	return response.json();
}

export async function reconcilePublished(
	names: string[],
	previous: PublishedPackages,
) {
	const published = structuredClone(previous);
	const failures: string[] = [];
	const pending = names.values();
	// Bound upstream requests without adding a queue dependency.
	await Promise.all(
		Array.from({ length: 8 }, async () => {
			for (const name of pending) {
				try {
					const [scope, id] = name.split("/");
					const kind = scope === "@fontsource-variable" ? "variable" : "static";
					const response = await fetch(
						`https://registry.npmjs.org/${name}/latest`,
						{
							signal: AbortSignal.timeout(30_000),
						},
					);
					// New local packages need not have been published yet.
					if (response.status === 404) continue;
					if (!response.ok) throw new Error(`npm returned ${response.status}`);
					const pkg = await response.json();
					if (pkg.name !== name || typeof pkg.version !== "string")
						throw new Error("Invalid npm package identity");
					const version = pkg.version;
					if (previous[id]?.[kind] === version) continue;
					if (Number(version.split(".")[0]) >= 6) {
						// The API owns validation of the versioned manifest and metadata contracts.
						const output = await json(
							`https://api.fontsource.org/v1/packages/${id}/${kind}/${version}`,
						);
						if (
							output.id !== id ||
							output.kind !== kind ||
							output.version !== version
						)
							throw new Error("Invalid package output identity");
					} else {
						const output = await json(
							`https://cdn.jsdelivr.net/npm/${name}@${version}/package.json`,
						);
						if (output.name !== name || output.version !== version)
							throw new Error("Invalid CDN package identity");
					}
					published[id] = { ...published[id], [kind]: version };
				} catch (error) {
					failures.push(
						`${name}: ${error instanceof Error ? error.message : error}`,
					);
				}
			}
		}),
	);
	return {
		published: Object.fromEntries(
			Object.entries(published)
				.sort(([a], [b]) => a.localeCompare(b))
				.map(([id, versions]) => [
					id,
					{
						...(versions.static && { static: versions.static }),
						...(versions.variable && { variable: versions.variable }),
					},
				]),
		),
		failures: failures.sort(),
	};
}

async function main() {
	const { values } = parseArgs({
		options: {
			out: { type: "string" },
		},
	});
	const config = JSON.parse(await readFile("font-publish.json", "utf8"));
	const names: string[] = [];
	for (const directory of config.packages as string[]) {
		for (const entry of await readdir(directory, { withFileTypes: true })) {
			if (!entry.isDirectory()) continue;
			const pkg = JSON.parse(
				await readFile(join(directory, entry.name, "package.json"), "utf8"),
			);
			if (
				!pkg.name.startsWith("@fontsource/") &&
				!pkg.name.startsWith("@fontsource-variable/")
			)
				throw new Error(`Unexpected package scope: ${pkg.name}`);
			names.push(pkg.name);
		}
	}
	let previous: PublishedPackages = {};
	try {
		previous = JSON.parse(await readFile("metadata/published.json", "utf8"));
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
	}
	const { published, failures } = await reconcilePublished(
		[...new Set(names)],
		previous,
	);
	for (const failure of failures)
		console.warn(`Retained previous publication: ${failure}`);
	// Bootstrap must be complete; subsequent runs can safely retain verified entries.
	if (failures.length && !Object.keys(previous).length)
		throw new Error(
			`Bootstrap incomplete: ${failures.length} package checks failed`,
		);
	if (!Object.keys(published).length)
		throw new Error("Refusing to write an empty publication index");
	const output = values.out ?? join(tmpdir(), "fontsource-published.json");
	await writeFile(output, `${JSON.stringify(published, null, 2)}\n`);
	console.log(
		`${Object.keys(published).length} families written to ${output}; ${failures.length} checks deferred`,
	);
}

if (import.meta.main) await main();
