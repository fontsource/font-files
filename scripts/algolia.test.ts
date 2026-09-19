import { expect, test } from "bun:test";
import metadata from "../metadata/fontsource.json";
import { checkRecordSizes, projectRecord } from "./algolia";

const registry = {
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
});

test("refuses oversized or empty catalogs before writing", () => {
	const record = projectRecord("roboto", metadata.roboto, registry, 123, 7);
	expect(() => checkRecordSizes([], 10000)).toThrow("empty catalog");
	expect(() => checkRecordSizes([record], 1)).toThrow("configured cap");
	expect(() => checkRecordSizes([record], Number.NaN)).toThrow(
		"positive integer",
	);
	expect(() => checkRecordSizes([record], 10000)).not.toThrow();
});

test("rejects unknown taxonomy rather than publishing invalid labels", () => {
	expect(() =>
		projectRecord(
			"roboto",
			metadata.roboto,
			{ ...registry, taxonomy: { classifications: {}, tags: {} } },
			0,
			0,
		),
	).toThrow("Unknown registry taxonomy ID");
});
