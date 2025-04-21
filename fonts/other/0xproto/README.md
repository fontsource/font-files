# Fontsource 0xProto

[![npm (scoped)](https://img.shields.io/npm/v/@fontsource/0xproto?color=brightgreen)](https://www.npmjs.com/package/@fontsource/0xproto) [![Generic badge](https://img.shields.io/badge/fontsource-passing-brightgreen)](https://github.com/fontsource/fontsource) [![Monthly downloads](https://badgen.net/npm/dm/@fontsource/0xproto)](https://github.com/fontsource/fontsource) [![Total downloads](https://badgen.net/npm/dt/@fontsource/0xproto)](https://github.com/fontsource/fontsource) [![GitHub stars](https://img.shields.io/github/stars/fontsource/fontsource.svg?style=social&label=Star)](https://github.com/fontsource/fontsource/stargazers)

The CSS and web font files to easily self-host the “0xProto” font. Please visit the main [Fontsource website](https://fontsource.org/fonts/0xproto) to view more details on this package.

## Quick Installation

Fontsource offers multiple methods to import the CSS, including using a bundler like Vite or using SASS. You can find full documentation [here](https://fontsource.org/docs/getting-started/introduction).

```javascript
npm install @fontsource/0xproto
```

Within your app entry file or site component, import it in.

```javascript
import "@fontsource/0xproto"; // Defaults to weight 400
import "@fontsource/0xproto/400.css"; // Specify weight
import "@fontsource/0xproto/400-italic.css"; // Specify weight and style
```

Supported variables:

- Weights: `[400,700]`
- Styles: `[normal,italic]`
- Subsets: `[latin]`

> Note: the font does not have a 700-italic variant.

Finally, you can reference the font name in a CSS stylesheet, CSS Module, or CSS-in-JS.

```css
body {
	font-family: "0xProto";
}
```

## Licensing

Always make sure to read the license for each font you use. Most of the fonts in the collection use the SIL Open Font License, v1.1. Some fonts use the Apache 2 license. The Ubuntu fonts use the Ubuntu Font License v1.0.

0xType (https://0xtype.dev/)
[OFL-1.1](https://github.com/0xType/0xProto/blob/main/LICENSE)

## Other Notes

Font version (provided by source): `2.300`.

If you have any suggestions or ideas to improve the performance of font loading or expand the existing library, feel free to star and contribute to this repository. You can share your suggestions or ideas by creating an [issue](https://github.com/fontsource/fontsource/issues).
