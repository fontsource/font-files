# Fontsource Lexend Tera

[![npm (scoped)](https://img.shields.io/npm/v/@fontsource/lexend-tera?color=brightgreen)](https://www.npmjs.com/package/@fontsource/lexend-tera) [![Generic badge](https://img.shields.io/badge/fontsource-passing-brightgreen)](https://github.com/fontsource/fontsource) [![Monthly downloads](https://badgen.net/npm/dm/@fontsource/lexend-tera)](https://github.com/fontsource/fontsource) [![Total downloads](https://badgen.net/npm/dt/@fontsource/lexend-tera)](https://github.com/fontsource/fontsource) [![GitHub stars](https://img.shields.io/github/stars/fontsource/fontsource.svg?style=social&label=Star)](https://github.com/fontsource/fontsource/stargazers)

The CSS and web font files to easily self-host the “Lexend Tera” font. Please visit the main [Fontsource website](https://fontsource.org/fonts/lexend-tera) to view more details on this package.

## Quick Installation

Fontsource has a variety of methods to import CSS, such as using a bundler like Webpack. Alternatively, it supports SASS. Full documentation can be found [here](https://fontsource.org/docs/introduction).

```javascript
npm install @fontsource-variable/lexend-tera
```

Within your app entry file or site component, import it in.

```javascript
import "@fontsource-variable/lexend-tera"; // Defaults to wght axis
import "@fontsource-variable/lexend-tera/wght.css"; // Specify axis
import "@fontsource-variable/lexend-tera/wght-italic.css"; // Specify axis and style

```

Supported variables:
- Weights: `[100,200,300,400,500,600,700,800,900]`
- Styles: `[normal]`
- Subsets: `[latin,latin-ext,vietnamese]`
- Axes: `[wght]`

Finally, you can reference the font name in a CSS stylesheet, CSS Module, or CSS-in-JS.

```css
body {
  font-family: "Lexend Tera;
}
```

## Variable Fonts

This particular typeface supports [variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide).
Variable documentation can be found [here](https://fontsource.org/docs/variable-fonts).

## Licensing
It is important to always read the license for every font that you use.
Most of the fonts in the collection use the SIL Open Font License, v1.1. Some fonts use the Apache 2 license. The Ubuntu fonts use the Ubuntu Font License v1.0.

Copyright 2019 The Lexend Project Authors (https://github.com/googlefonts/lexend)
[OFL-1.1](http://scripts.sil.org/OFL)

## Other Notes
Font version (provided by source): `v27`.
Feel free to star and contribute new ideas to this repository that aim to improve the performance of font loading, as well as expanding the existing library we already have. Any suggestions or ideas can be voiced via an [issue](https://github.com/fontsource/fontsource/issues).