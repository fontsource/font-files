# Registry search rollout

The writer retains `prod_NAME`, legacy IDs/fields, monthly popularity and random sort. It adds registry classifications, tags (including curated tags), exact language IDs and searchable labels. Legacy families absent from the registry remain searchable with empty new facets and a warning.

Each indexing workflow pins `registry/data` to the latest successful `registry-archive.yml` run on `fontsource/fontsource` main. The public repository needs no R2 credentials or additional token permissions. `.registry` is ignored. Failed metadata, size, stats or indexing checks fail the job.

## Configure and backfill before deploying the website

1. Inspect the current primary and replica settings and the account's record-size limit. Preserve existing rankings, replica associations, rules and synonyms.
2. Append `classifications`, `tags`, `languageIds` to `attributesForFaceting` as ordinary (not `searchable(...)`) facets. Retain `category`, `subsets`, `variable`, `objectID` and other existing facets. Apply these facet additions to every existing sort replica without overwriting its ranking.
3. Use ordered `searchableAttributes`: `family`, `displayName`, `designer`, `classificationLabels`, `tagLabels`, followed by any other existing searchable fields needed for compatibility. Apply the same search attributes to sort replicas. Language names/autonyms stay in the website dictionary, not every record.
4. Run the offline check below. If the plan permits larger records, set repository Actions variable `ALGOLIA_MAX_RECORD_BYTES` to that verified byte limit. The conservative default is 10000 bytes per record; the catalog average must also stay <= 10000 bytes. No languages are truncated to fit.
5. Run the standalone Algolia workflow and wait for success. Check categories, tags, multilingual AND filters, sorting and old subset URLs before enabling/deploying the website changes.

```sh
REGISTRY_DATA_DIR=/path/to/pinned/fontsource/registry/data bun run algolia --dry-run
bun test scripts/algolia.test.ts
```

Dry runs are fully offline, require no admin key and report counts, missing family IDs, average/largest record sizes and all oversized records. Popularity uses a conservative size placeholder.

Updates use `saveObjects` and await every returned indexing task. Settings, rules, synonyms and replica associations remain unchanged. Records absent from the current source are retained during this additive rollout; any stale-record cleanup requires a later controlled operation. No new index or index configuration is created by this script.

Reference: [replica completion](https://support.algolia.com/hc/en-us/articles/24776122061201-When-are-replicas-updated-during-indexing-jobs).
