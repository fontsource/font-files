import { expect, test } from "bun:test";
import metadata from "../metadata/fontsource.json";
import { languageIndexVersion, projectRecord } from "./algolia";

const registry = {
	languageIndexVersion:
		"a014ea07a0e77dcf1e38f4ce8063f7ab9ac42b92fb517794e6b520073161f23f",
	families: new Map([
		[
			"roboto",
			{
				family: "Roboto",
				designer: "Designer",
				classifications: ["sans-serif"],
				tags: ["sans/geometric"],
				languages: ["ja_Jpan", "ja_Hira", "zh_Hant"],
			},
		],
	]),
	taxonomy: {
		classifications: { "sans-serif": { label: "Sans Serif" } },
		tags: {
			"sans/geometric": { label: "Geometric" },
			"purpose/easy-reading": { label: "Easy Reading" },
		},
	},
	curatedTags: {
		"sans/geometric": ["roboto"],
		"purpose/easy-reading": ["roboto"],
	},
};

test("adds registry facets and curated tags without changing legacy fields", () => {
	const record = projectRecord("roboto", metadata.roboto, registry, 123, 7);
	expect(record).toMatchObject({
		objectID: "roboto",
		family: metadata.roboto.family,
		subsets: metadata.roboto.subsets,
		weights: metadata.roboto.weights,
		styles: metadata.roboto.styles,
		defSubset: metadata.roboto.defSubset,
		category: metadata.roboto.category,
		variable: Boolean(metadata.roboto.variable),
		downloadMonth: 123,
		randomIndex: 7,
		languageIndexVersion: registry.languageIndexVersion,
	});
	expect(record.tags).toEqual(["purpose/easy-reading", "sans/geometric"]);
	expect(record.tagLabels).toEqual(["Easy Reading", "Geometric"]);
	expect(record.classificationLabels).toEqual(["Sans Serif"]);
	expect(record.languageIds).toEqual(["ja_Jpan", "ja_Hira", "zh_Hant"]);
});

test("retains legacy families missing from registry with empty facets", () => {
	const record = projectRecord(
		"google-sans",
		metadata["google-sans"],
		registry,
		1,
		2,
	);
	expect(record.objectID).toBe("google-sans");
	expect(record.classifications).toEqual([]);
	expect(record.tags).toEqual([]);
	expect(record.languageIds).toEqual([]);
	expect(record.languageIndexVersion).toBe(registry.languageIndexVersion);
});

test("language index fingerprints ignore family and language ordering", () => {
	const families = new Map([
		["b", { languages: ["zh_Hant", "ja_Hira"] }],
		["a", { languages: [] }],
	]);
	const reordered = new Map([
		["a", { languages: [] }],
		["b", { languages: ["ja_Hira", "zh_Hant"] }],
	]);
	expect(languageIndexVersion(families)).toBe(languageIndexVersion(reordered));
	expect(languageIndexVersion(families)).toBe(
		"4d3f366c8d932a100f360a06b5467984c449a115b5c967ced2adec85f9080ef5",
	);
	expect(families.get("b")?.languages).toEqual(["zh_Hant", "ja_Hira"]);
});

test("language index fingerprints change when any registry membership changes", () => {
	const families = new Map([["a", { languages: ["ja_Hira"] }]]);
	const version = languageIndexVersion(families);
	families.set("a", { languages: ["zh_Hant"] });
	expect(languageIndexVersion(families)).not.toBe(version);
	families.set("a", { languages: ["ja_Hira"] });
	families.set("unpackaged-family", { languages: [] });
	expect(languageIndexVersion(families)).not.toBe(version);
});
