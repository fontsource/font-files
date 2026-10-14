import { afterEach, expect, spyOn, test } from "bun:test";
import { reconcilePublished } from "./published";

let request: ReturnType<typeof spyOn>;
afterEach(() => request?.mockRestore());

test("promotes independently verified packages and retains failures", async () => {
	request = spyOn(globalThis, "fetch").mockImplementation(async (input) => {
		const url = String(input);
		if (url.includes("/unpublished/"))
			return new Response(null, { status: 404 });
		if (url.includes("/broken/") || url.includes("/missing-manifest/")) {
			if (url.endsWith("/latest"))
				return Response.json({
					name: `@fontsource/${url.includes("/broken/") ? "broken" : "missing-manifest"}`,
					version: "6.0.0",
				});
			return new Response(null, { status: 502 });
		}
		if (url.includes("/v1/packages/"))
			return Response.json({
				id: "font",
				kind: "variable",
				version: "6.0.0",
				manifest: {},
				metadata: {},
			});
		return Response.json({
			name: url.includes("@fontsource-variable")
				? "@fontsource-variable/font"
				: "@fontsource/font",
			version: url.includes("@fontsource-variable") ? "6.0.0" : "5.2.0",
		});
	});
	const result = await reconcilePublished(
		[
			"@fontsource/font",
			"@fontsource-variable/font",
			"@fontsource/broken",
			"@fontsource/missing-manifest",
			"@fontsource/unpublished",
		],
		{ broken: { static: "5.1.0" }, removed: { variable: "5.0.0" } },
	);
	expect(result).toMatchInlineSnapshot(`
{
  "failures": [
    "@fontsource/broken: 502: https://api.fontsource.org/v1/packages/broken/static/6.0.0",
    "@fontsource/missing-manifest: 502: https://api.fontsource.org/v1/packages/missing-manifest/static/6.0.0",
  ],
  "published": {
    "broken": {
      "static": "5.1.0",
    },
    "font": {
      "static": "5.2.0",
      "variable": "6.0.0",
    },
    "removed": {
      "variable": "5.0.0",
    },
  },
}
`);
});
