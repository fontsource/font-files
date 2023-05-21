# Fontsource Neuton

[![npm (scoped)](https://img.shields.io/npm/v/@fontsource/neuton?color=brightgreen)](https://www.npmjs.com/package/@fontsource/neuton) [![Generic badge](https://img.shields.io/badge/fontsource-passing-brightgreen)](https://github.com/fontsource/fontsource) [![Monthly downloads](https://badgen.net/npm/dm/@fontsource/neuton)](https://github.com/fontsource/fontsource) [![Total downloads](https://badgen.net/npm/dt/@fontsource/neuton)](https://github.com/fontsource/fontsource) [![GitHub stars](https://img.shields.io/github/stars/fontsource/fontsource.svg?style=social&label=Star)](https://github.com/fontsource/fontsource/stargazers)

The CSS and web font files to easily self-host the “Neuton” font. Please visit the main [Fontsource website](https://fontsource.org/fonts/neuton) to view more details on this package.

## Quick Installation

Fontsource has a variety of methods to import CSS, such as using a bundler like Webpack. Alternatively, it supports SASS. Full documentation can be found [here](https://beta.fontsource.org/docs/getting-started/introduction).

```javascript
npm install @fontsource/neuton
```

Within your app entry file or site component, import it in.

```javascript
import "@fontsource/neuton"; // Defaults to weight 400
import "@fontsource/neuton/400.css"; // Specify weight
import "@fontsource/neuton/400-italic.css"; // Specify weight and style

```

Supported variables:
- Weights: `[200,300,400,700,800]`
- Styles: `[italic,normal]`
- Subsets: `[latin,latin-ext]`

Finally, you can reference the font name in a CSS stylesheet, CSS Module, or CSS-in-JS.

```css
body {
  font-family: "Neuton;
}
```

## Licensing
It is important to always read the license for every font that you use.
Most of the fonts in the collection use the SIL Open Font License, v1.1. Some fonts use the Apache 2 license. The Ubuntu fonts use the Ubuntu Font License v1.0.

Copyright 2010 The Neuton Project Authors (http://www.21326.info/), with Reserved Font Name "Neuton".
[OFL-1.1](http://scripts.sil.org/OFL)

## Other Notes
Font version (provided by source): `v18`.
Feel free to star and contribute new ideas to this repository that aim to improve the performance of font loading, as well as expanding the existing library we already have. Any suggestions or ideas can be voiced via an [issue](https://github.com/fontsource/fontsource/issues).