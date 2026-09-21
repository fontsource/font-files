# Language membership version

Every Algolia record carries `languageMembershipVersion`: SHA-256 of the JSON array of `[familyId, sortedLanguageIds]` pairs, ordered lexically by family ID, covering every registry family.

Publish the matching registry language index first, then refresh Algolia records. The website falls back to Algolia facets while fingerprints are missing or mismatched. No additional index settings are required.
