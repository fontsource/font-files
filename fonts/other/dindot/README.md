# Fontsource DINDOT

[![npm (scoped)](https://img.shields.io/npm/v/@fontsource/dindot?color=brightgreen)](https://www.npmjs.com/package/@fontsource/dindot) [![Generic badge](https://img.shields.io/badge/fontsource-passing-brightgreen)](https://github.com/fontsource/fontsource) [![Monthly downloads](https://badgen.net/npm/dm/@fontsource/dindot)](https://github.com/fontsource/fontsource) [![Total downloads](https://badgen.net/npm/dt/@fontsource/dindot)](https://github.com/fontsource/fontsource)

The CSS and web font files to easily self-host the “DINDOT” font. Please visit the main [Fontsource website](https://fontsource.org/fonts/dindot) to view more details on this package.

## Quick Installation

Fontsource offers multiple methods to import the CSS, including using a bundler like Vite or using SASS. You can find full documentation [here](https://fontsource.org/docs/getting-started/introduction).

```javascript
npm install @fontsource/dindot
```

Within your app entry file or site component, import it in.

```javascript
import "@fontsource/dindot"; // Defaults to weight 400
import "@fontsource/dindot/400.css"; // Specify weight
import "@fontsource/dindot/400-italic.css"; // Specify weight and style
```

Supported variables:
- Weights: `[400,500,600,700]`
- Styles: `[normal,italic]`
- Subsets: `[latin]`

> Note: `italic` may not be supported by all fonts. To learn more about what weights and styles are supported, please visit the [Fontsource website](https://fontsource.org/fonts/dindot).

Finally, you can reference the font name in a CSS stylesheet, CSS Module, or CSS-in-JS.

```css
body {
  font-family: "DINDOT";
}
```

## Licensing
Always make sure to read the license for each font you use. Most of the fonts in the collection use the SIL Open Font License, v1.1. Some fonts use the Apache 2 license. The Ubuntu fonts use the Ubuntu Font License v1.0.

GetDot; The DINish Project Authors; original D-DIN by Charles Nix / Monotype for Datto
[OFL-1.1](https://github.com/Snowboard-Software/dindot/blob/main/OFL.txt)

## Other Notes
Font version (provided by source): `0.22.0`.

If you have any suggestions or ideas to improve the performance of font loading or expand the existing library, feel free to star and contribute to this repository. You can share your suggestions or ideas by creating an [issue](https://github.com/fontsource/fontsource/issues).
## DINDOT project

[Interactive specimen and project homepage](https://www.getdot.ai/dindot/).

Derived from DINish, with modifications by GetDot. See `AUTHORS.txt` and `LICENSE` for the upstream credits and license notices. The default `latin` bundle contains the full release character set (949 encoded characters per face), including Latin, Greek and Cyrillic coverage. WOFF2 files are unchanged from DINDOT 0.22.0; WOFF files are lossless repackaging of the corresponding released TTF files.
