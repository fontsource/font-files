# Fontsource BIZ UDGothic

[![npm (scoped)](https://img.shields.io/npm/v/@fontsource/biz-udgothic?color=brightgreen)](https://www.npmjs.com/package/@fontsource/biz-udgothic) [![Generic badge](https://img.shields.io/badge/fontsource-passing-brightgreen)](https://github.com/fontsource/fontsource) [![Monthly downloads](https://badgen.net/npm/dm/@fontsource/biz-udgothic)](https://github.com/fontsource/fontsource) [![Total downloads](https://badgen.net/npm/dt/@fontsource/biz-udgothic)](https://github.com/fontsource/fontsource) [![GitHub stars](https://img.shields.io/github/stars/fontsource/fontsource.svg?style=social&label=Star)](https://github.com/fontsource/fontsource/stargazers)

The CSS and web font files to easily self-host the “BIZ UDGothic” font. Please visit the main [Fontsource website](https://fontsource.org/fonts/biz-udgothic) to view more details on this package.

## Quick Installation

Fontsource has a variety of methods to import CSS, such as using a bundler like Webpack. Alternatively, it supports SASS. Full documentation can be found [here](https://beta.fontsource.org/docs/getting-started/introduction).

```javascript
npm install @fontsource/biz-udgothic
```

Within your app entry file or site component, import it in.

```javascript
import "@fontsource/biz-udgothic"; // Defaults to weight 400
import "@fontsource/biz-udgothic/400.css"; // Specify weight
import "@fontsource/biz-udgothic/400-italic.css"; // Specify weight and style

```

Supported variables:
- Weights: `[400,700]`
- Styles: `[normal]`
- Subsets: `[cyrillic,greek-ext,japanese,latin,latin-ext]`

Finally, you can reference the font name in a CSS stylesheet, CSS Module, or CSS-in-JS.

```css
body {
  font-family: "BIZ UDGothic;
}
```

## Licensing
It is important to always read the license for every font that you use.
Most of the fonts in the collection use the SIL Open Font License, v1.1. Some fonts use the Apache 2 license. The Ubuntu fonts use the Ubuntu Font License v1.0.

Copyright 2022 The BIZ UDGothic Project Authors (https://github.com/googlefonts/morisawa-biz-ud-gothic)
[OFL-1.1](http://scripts.sil.org/OFL)

## Other Notes
Font version (provided by source): `v8`.
Feel free to star and contribute new ideas to this repository that aim to improve the performance of font loading, as well as expanding the existing library we already have. Any suggestions or ideas can be voiced via an [issue](https://github.com/fontsource/fontsource/issues).