# Fontsource Alike Angular

[![npm (scoped)](https://img.shields.io/npm/v/@fontsource/alike-angular?color=brightgreen)](https://www.npmjs.com/package/@fontsource/alike-angular) [![Generic badge](https://img.shields.io/badge/fontsource-passing-brightgreen)](https://github.com/fontsource/fontsource) [![Monthly downloads](https://badgen.net/npm/dm/@fontsource/alike-angular)](https://github.com/fontsource/fontsource) [![Total downloads](https://badgen.net/npm/dt/@fontsource/alike-angular)](https://github.com/fontsource/fontsource) [![GitHub stars](https://img.shields.io/github/stars/fontsource/fontsource.svg?style=social&label=Star)](https://github.com/fontsource/fontsource/stargazers)

The CSS and web font files to easily self-host the “Alike Angular” font. Please visit the main [Fontsource website](https://fontsource.org/fonts/alike-angular) to view more details on this package.

## Quick Installation

Fontsource has a variety of methods to import CSS, such as using a bundler like Webpack. Alternatively, it supports SASS. Full documentation can be found [here](https://beta.fontsource.org/docs/getting-started/introduction).

```javascript
npm install @fontsource/alike-angular
```

Within your app entry file or site component, import it in.

```javascript
import "@fontsource/alike-angular"; // Defaults to weight 400
import "@fontsource/alike-angular/400.css"; // Specify weight
import "@fontsource/alike-angular/400-italic.css"; // Specify weight and style

```

Supported variables:
- Weights: `[400]`
- Styles: `[normal]`
- Subsets: `[latin]`

Finally, you can reference the font name in a CSS stylesheet, CSS Module, or CSS-in-JS.

```css
body {
  font-family: "Alike Angular;
}
```

## Licensing
It is important to always read the license for every font that you use.
Most of the fonts in the collection use the SIL Open Font License, v1.1. Some fonts use the Apache 2 license. The Ubuntu fonts use the Ubuntu Font License v1.0.

Copyright (c) 2011, Cyreal (www.cyreal.org) with Reserved Font Name "Alike" and "Alike Angular".
[OFL-1.1](http://scripts.sil.org/OFL)

## Other Notes
Font version (provided by source): `v20`.
Feel free to star and contribute new ideas to this repository that aim to improve the performance of font loading, as well as expanding the existing library we already have. Any suggestions or ideas can be voiced via an [issue](https://github.com/fontsource/fontsource/issues).