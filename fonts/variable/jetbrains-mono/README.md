# Fontsource JetBrains Mono

[![npm (scoped)](https://img.shields.io/npm/v/@fontsource/jetbrains-mono?color=brightgreen)](https://www.npmjs.com/package/@fontsource/jetbrains-mono) [![Generic badge](https://img.shields.io/badge/fontsource-passing-brightgreen)](https://github.com/fontsource/fontsource) [![Monthly downloads](https://badgen.net/npm/dm/@fontsource/jetbrains-mono)](https://github.com/fontsource/fontsource) [![Total downloads](https://badgen.net/npm/dt/@fontsource/jetbrains-mono)](https://github.com/fontsource/fontsource) [![GitHub stars](https://img.shields.io/github/stars/fontsource/fontsource.svg?style=social&label=Star)](https://github.com/fontsource/fontsource/stargazers)

The CSS and web font files to easily self-host the “JetBrains Mono” font. Please visit the main [Fontsource website](https://fontsource.org/fonts/jetbrains-mono) to view more details on this package.

## Quick Installation

Fontsource has a variety of methods to import CSS, such as using a bundler like Webpack. Alternatively, it supports SASS. Full documentation can be found [here](https://fontsource.org/docs/introduction).

```javascript
npm install @fontsource-variable/jetbrains-mono
```

Within your app entry file or site component, import it in.

```javascript
import "@fontsource-variable/jetbrains-mono"; // Defaults to wght axis
import "@fontsource-variable/jetbrains-mono/wght.css"; // Specify axis
import "@fontsource-variable/jetbrains-mono/wght-italic.css"; // Specify axis and style

```

Supported variables:
- Weights: `[100,200,300,400,500,600,700,800]`
- Styles: `[italic,normal]`
- Subsets: `[cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese]`
- Axes: `[wght]`

Finally, you can reference the font name in a CSS stylesheet, CSS Module, or CSS-in-JS.

```css
body {
  font-family: "JetBrains Mono;
}
```

## Variable Fonts

This particular typeface supports [variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide).
Variable documentation can be found [here](https://fontsource.org/docs/variable-fonts).

## Licensing
It is important to always read the license for every font that you use.
Most of the fonts in the collection use the SIL Open Font License, v1.1. Some fonts use the Apache 2 license. The Ubuntu fonts use the Ubuntu Font License v1.0.

Copyright 2020 The JetBrains Mono Project Authors (https://github.com/JetBrains/JetBrainsMono)
[OFL-1.1](http://scripts.sil.org/OFL)

## Other Notes
Font version (provided by source): `v17`.
Feel free to star and contribute new ideas to this repository that aim to improve the performance of font loading, as well as expanding the existing library we already have. Any suggestions or ideas can be voiced via an [issue](https://github.com/fontsource/fontsource/issues).