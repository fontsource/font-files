# Fontsource Schibsted Grotesk

[![npm (scoped)](https://img.shields.io/npm/v/@fontsource/schibsted-grotesk?color=brightgreen)](https://www.npmjs.com/package/@fontsource/schibsted-grotesk) [![Generic badge](https://img.shields.io/badge/fontsource-passing-brightgreen)](https://github.com/fontsource/fontsource) [![Monthly downloads](https://badgen.net/npm/dm/@fontsource/schibsted-grotesk)](https://github.com/fontsource/fontsource) [![Total downloads](https://badgen.net/npm/dt/@fontsource/schibsted-grotesk)](https://github.com/fontsource/fontsource) [![GitHub stars](https://img.shields.io/github/stars/fontsource/fontsource.svg?style=social&label=Star)](https://github.com/fontsource/fontsource/stargazers)

The CSS and web font files to easily self-host the “Schibsted Grotesk” font. Please visit the main [Fontsource website](https://fontsource.org/fonts/schibsted-grotesk) to view more details on this package.

## Quick Installation

Fontsource has a variety of methods to import CSS, such as using a bundler like Webpack. Alternatively, it supports SASS. Full documentation can be found [here](https://fontsource.org/docs/introduction).

```javascript
npm install @fontsource/schibsted-grotesk
```

Within your app entry file or site component, import it in.

```javascript
import "@fontsource/schibsted-grotesk"; // Defaults to weight 400
import "@fontsource/schibsted-grotesk/400.css"; // Specify weight
import "@fontsource/schibsted-grotesk/400-italic.css"; // Specify weight and style

```

Supported variables:
- Weights: `[400,500,600,700,800,900]`
- Styles: `[italic,normal]`
- Subsets: `[latin,latin-ext]`

Finally, you can reference the font name in a CSS stylesheet, CSS Module, or CSS-in-JS.

```css
body {
  font-family: "Schibsted Grotesk;
}
```

## Variable Fonts

This particular typeface supports [variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide).
Variable documentation can be found [here](https://fontsource.org/docs/variable-fonts).

## Licensing
It is important to always read the license for every font that you use.
Most of the fonts in the collection use the SIL Open Font License, v1.1. Some fonts use the Apache 2 license. The Ubuntu fonts use the Ubuntu Font License v1.0.

Copyright 2023 The Schibsted-Grotesk Project Authors (https://github.com/schibsted/schibsted-grotesk)
[OFL-1.1](http://scripts.sil.org/OFL)

## Other Notes
Font version (provided by source): `v2`.
Feel free to star and contribute new ideas to this repository that aim to improve the performance of font loading, as well as expanding the existing library we already have. Any suggestions or ideas can be voiced via an [issue](https://github.com/fontsource/fontsource/issues).