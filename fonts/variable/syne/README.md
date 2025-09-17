# Fontsource Syne

[![npm (scoped)](https://img.shields.io/npm/v/@fontsource-variable/syne?color=brightgreen)](https://www.npmjs.com/package/@fontsource-variable/syne) [![Generic badge](https://img.shields.io/badge/fontsource-passing-brightgreen)](https://github.com/fontsource/fontsource) [![Monthly downloads](https://badgen.net/npm/dm/@fontsource-variable/syne)](https://github.com/fontsource/fontsource) [![Total downloads](https://badgen.net/npm/dt/@fontsource-variable/syne)](https://github.com/fontsource/fontsource) [![GitHub stars](https://img.shields.io/github/stars/fontsource/fontsource.svg?style=social&label=Star)](https://github.com/fontsource/fontsource/stargazers)

The CSS and web font files to easily self-host the “Syne” variable font. Please visit the main [Fontsource website](https://fontsource.org/fonts/syne) to view more details on this package.

## Quick Installation

Fontsource offers multiple methods to import the CSS, including using a bundler like Vite or using SASS. You can find full documentation [here](https://fontsource.org/docs/getting-started/introduction).

```javascript
npm install @fontsource-variable/syne
```

Within your app entry file or site component, import it in.

```javascript
import "@fontsource-variable/syne"; // Defaults to wght axis
import "@fontsource-variable/syne/wght.css"; // Specify axis
import "@fontsource-variable/syne/wght-italic.css"; // Specify axis and style
```

Supported variables:
- Weights: `[400,500,600,700,800]`
- Styles: `[normal]`
- Subsets: `[greek,latin,latin-ext]`
- Axes: `[wght]`

> Note: `italic` may not be supported by all fonts. To learn more about what axes and styles are supported, please visit the [Fontsource website](https://fontsource.org/fonts/syne).

Finally, you can reference the font name in a CSS stylesheet, CSS Module, or CSS-in-JS.

```css
body {
  font-family: "Syne Variable";
}
```

## Licensing
Always make sure to read the license for each font you use. Most of the fonts in the collection use the SIL Open Font License, v1.1. Some fonts use the Apache 2 license. The Ubuntu fonts use the Ubuntu Font License v1.0.

Google Inc.
[OFL-1.1](http://scripts.sil.org/OFL)

## Other Notes
Font version (provided by source): `v24`.

If you have any suggestions or ideas to improve the performance of font loading or expand the existing library, feel free to star and contribute to this repository. You can share your suggestions or ideas by creating an [issue](https://github.com/fontsource/fontsource/issues).