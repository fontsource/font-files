# Published packages

`metadata/published.json` records verified npm versions independently for each
scope. Registry membership describes source availability; it does not prove a
package has been published.

```text
local package names -> npm latest -> exact CDN/API verification -> published.json
```

Local package directories supply candidate names, not proof of publication. V5
checks the exact CDN package identity. V6 asks the package-output API to validate
the exact manifest and packaged metadata. Only successful checks advance the
index. Failures retain the previous version and are reconsidered on the next run.

## Running reconciliation

- `bun run published` writes a candidate to the system temporary directory.
- `bun run published --out metadata/published.json` updates the committed index.

Neither command publishes fonts. The committed index must already exist and be
nonempty; restore it from Git if it is missing. New packages returning npm 404
are omitted, while previously verified entries remain available.

Publishing workflows reconcile after npm publication, including partial failures,
and commit only the index. No-deploy builds do not reconcile publication state.
The build workflows share one non-cancelling concurrency group so their Git
updates cannot overlap.

## Rollout

1. Merge the initial index before deploying API consumers that require it.
2. Deploy `/v1/packages/:id/:kind/:version` before publishing V6 fonts. Verification
   reads exact package output independently of the index it will update.
3. Refresh search from the verified index before deploying the website consumers.

This change does not upgrade the font builder or publish V6 fonts.

## Search projection

`bun run algolia --dry-run` prints the complete proposed search records without
uploading them. Review membership and facets before the first live refresh.

Search combines available static and variable outputs into one family record.
V6 facets come from manifests; V5 facets retain the legacy metadata projection.
These are search filters, not a list of valid style/weight/file combinations.
The live command replaces the complete Algolia record set while preserving its
settings, rules, and synonyms, so stale records do not remain searchable.
