# Fontsource Tinos

[![npm (scoped)](https://img.shields.io/npm/v/@fontsource/tinos?color=brightgreen)](https://www.npmjs.com/package/@fontsource/tinos) [![Generic badge](https://img.shields.io/badge/fontsource-passing-brightgreen)](https://github.com/fontsource/fontsource) [![Monthly downloads](https://badgen.net/npm/dm/@fontsource/tinos)](https://github.com/fontsource/fontsource) [![Total downloads](https://badgen.net/npm/dt/@fontsource/tinos)](https://github.com/fontsource/fontsource) [![GitHub stars](https://img.shields.io/github/stars/fontsource/fontsource.svg?style=social&label=Star)](https://github.com/fontsource/fontsource/stargazers)

The CSS and web font files to easily self-host the “Tinos” font. Please visit the main [Fontsource website](https://fontsource.org/fonts/tinos) to view more details on this package.

## Quick Installation

Fontsource has a variety of methods to import CSS, such as using a bundler like Webpack. Alternatively, it supports SASS. Full documentation can be found [here](https://fontsource.org/docs/introduction).

```javascript
npm install @fontsource/tinos
```

Within your app entry file or site component, import it in.

```javascript
import "@fontsource/tinos"; // Defaults to weight 400
import "@fontsource/tinos/400.css"; // Specify weight
import "@fontsource/tinos/400-italic.css"; // Specify weight and style

```

Supported variables:
- Weights: `[400,700]`
- Styles: `[italic,normal]`
- Subsets: `[cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,vietnamese]`

Finally, you can reference the font name in a CSS stylesheet, CSS Module, or CSS-in-JS.

```css
body {
  font-family: "Tinos;
}
```

## Licensing
It is important to always read the license for every font that you use.
Most of the fonts in the collection use the SIL Open Font License, v1.1. Some fonts use the Apache 2 license. The Ubuntu fonts use the Ubuntu Font License v1.0.

Digitized data copyright (c) 2010-2012 Google Corporation.
[Apache-2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

## Other Notes
Font version (provided by source): `v24`.
Feel free to star and contribute new ideas to this repository that aim to improve the performance of font loading, as well as expanding the existing library we already have. Any suggestions or ideas can be voiced via an [issue](https://github.com/fontsource/fontsource/issues).