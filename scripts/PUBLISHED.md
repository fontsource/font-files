# Published packages

`bun run published` verifies npm latest versions and writes a candidate to the system temporary directory. `--out metadata/published.json` updates the committed index; this command never publishes fonts. Existing verified entries survive failed checks and are reconsidered on the next run. The committed index must exist and be nonempty before reconciliation; restore it from Git if it is missing. Unpublished packages returning npm 404 are omitted.

The publishing workflows reconcile after npm publication, including partial failures, and commit only the index. No-deploy builds do not reconcile publication state. All build workflows share a non-cancelling concurrency group to prevent index updates from overwriting one another.

V5 checks exact CDN package identity. V6 uses the independent `/v1/packages/:id/:kind/:version` API to validate packaged metadata and output manifests. Deploy that API before publishing V6 packages. Merge the initial verified index before enabling API consumers that require it; no CLI upgrade or V6 font publication is part of this change.
