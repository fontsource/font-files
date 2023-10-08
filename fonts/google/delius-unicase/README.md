# Fontsource Delius Unicase

[![npm (scoped)](https://img.shields.io/npm/v/@fontsource/delius-unicase?color=brightgreen)](https://www.npmjs.com/package/@fontsource/delius-unicase) [![Generic badge](https://img.shields.io/badge/fontsource-passing-brightgreen)](https://github.com/fontsource/fontsource) [![Monthly downloads](https://badgen.net/npm/dm/@fontsource/delius-unicase)](https://github.com/fontsource/fontsource) [![Total downloads](https://badgen.net/npm/dt/@fontsource/delius-unicase)](https://github.com/fontsource/fontsource) [![GitHub stars](https://img.shields.io/github/stars/fontsource/fontsource.svg?style=social&label=Star)](https://github.com/fontsource/fontsource/stargazers)

The CSS and web font files to easily self-host the “Delius Unicase” font. Please visit the main [Fontsource website](https://fontsource.org/fonts/delius-unicase) to view more details on this package.

## Quick Installation

Fontsource offers multiple methods to import the CSS, including using a bundler like Vite or using SASS. You can find full documentation [here](https://fontsource.org/docs/getting-started/introduction).

```javascript
npm install @fontsource/delius-unicase
```

Within your app entry file or site component, import it in.

```javascript
import "@fontsource/delius-unicase"; // Defaults to weight 400
import "@fontsource/delius-unicase/400.css"; // Specify weight
import "@fontsource/delius-unicase/400-italic.css"; // Specify weight and style
```

Supported variables:
- Weights: `[400,700]`
- Styles: `[normal]`
- Subsets: `[latin]`

> Note: `italic` may not be supported by all fonts. To learn more about what weights and styles are supported, please visit the [Fontsource website](https://fontsource.org/fonts/delius-unicase).

Finally, you can reference the font name in a CSS stylesheet, CSS Module, or CSS-in-JS.

```css
body {
  font-family: "Delius Unicase";
}
```

## Licensing
Always make sure to read the license for each font you use. Most of the fonts in the collection use the SIL Open Font License, v1.1. Some fonts use the Apache 2 license. The Ubuntu fonts use the Ubuntu Font License v1.0.

Copyright (c) 2010, 2011, Natalia Raices<nraices@gmail.com>, with Reserved Font Name "Delius" "Delius Unicase" "Delius Swash Caps".
[OFL-1.1](http://scripts.sil.org/OFL)

## Other Notes
Font version (provided by source): `v26`.

If you have any suggestions or ideas to improve the performance of font loading or expand the existing library, feel free to star and contribute to this repository. You can share your suggestions or ideas by creating an [issue](https://github.com/fontsource/fontsource/issues).