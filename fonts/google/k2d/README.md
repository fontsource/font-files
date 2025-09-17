# Fontsource K2D

[![npm (scoped)](https://img.shields.io/npm/v/@fontsource/k2d?color=brightgreen)](https://www.npmjs.com/package/@fontsource/k2d) [![Generic badge](https://img.shields.io/badge/fontsource-passing-brightgreen)](https://github.com/fontsource/fontsource) [![Monthly downloads](https://badgen.net/npm/dm/@fontsource/k2d)](https://github.com/fontsource/fontsource) [![Total downloads](https://badgen.net/npm/dt/@fontsource/k2d)](https://github.com/fontsource/fontsource) [![GitHub stars](https://img.shields.io/github/stars/fontsource/fontsource.svg?style=social&label=Star)](https://github.com/fontsource/fontsource/stargazers)

The CSS and web font files to easily self-host the “K2D” font. Please visit the main [Fontsource website](https://fontsource.org/fonts/k2d) to view more details on this package.

## Quick Installation

Fontsource offers multiple methods to import the CSS, including using a bundler like Vite or using SASS. You can find full documentation [here](https://fontsource.org/docs/getting-started/introduction).

```javascript
npm install @fontsource/k2d
```

Within your app entry file or site component, import it in.

```javascript
import "@fontsource/k2d"; // Defaults to weight 400
import "@fontsource/k2d/400.css"; // Specify weight
import "@fontsource/k2d/400-italic.css"; // Specify weight and style
```

Supported variables:
- Weights: `[100,200,300,400,500,600,700,800]`
- Styles: `[italic,normal]`
- Subsets: `[latin,latin-ext,thai,vietnamese]`

> Note: `italic` may not be supported by all fonts. To learn more about what weights and styles are supported, please visit the [Fontsource website](https://fontsource.org/fonts/k2d).

Finally, you can reference the font name in a CSS stylesheet, CSS Module, or CSS-in-JS.

```css
body {
  font-family: "K2D";
}
```

## Licensing
Always make sure to read the license for each font you use. Most of the fonts in the collection use the SIL Open Font License, v1.1. Some fonts use the Apache 2 license. The Ubuntu fonts use the Ubuntu Font License v1.0.

Copyright 2018 The K2D Project Authors (https://github.com/cadsondemak/K2D) K2D-ThinItalic.ttf: Copyright 2018 The K2D Project Authors (https://github.com/cadsondemak/K2D) K2D-ExtraLight.ttf: Copyright 2018 The K2D Project Authors (https://github.com/cadsondemak/K2D) K2D-ExtraLightItalic.ttf: Copyright 2018 The K2D Project Authors (https://github.com/cadsondemak/K2D) K2D-Light.ttf: Copyright 2018 The K2D Project Authors (https://github.com/cadsondemak/K2D) K2D-LightItalic.ttf: Copyright 2018 The K2D Project Authors (https://github.com/cadsondemak/K2D) K2D-Regular.ttf: Copyright 2018 The K2D Project Authors (https://github.com/cadsondemak/K2D) K2D-Italic.ttf: Copyright 2018 The K2D Project Authors (https://github.com/cadsondemak/K2D) K2D-Medium.ttf: Copyright 2018 The K2D Project Authors (https://github.com/cadsondemak/K2D) K2D-MediumItalic.ttf: Copyright 2018 The K2D Project Authors (https://github.com/cadsondemak/K2D) K2D-SemiBold.ttf: Copyright 2018 The K2D Project Authors (https://github.com/cadsondemak/K2D) K2D-SemiBoldItalic.ttf: Copyright 2018 The K2D Project Authors (https://github.com/cadsondemak/K2D) K2D-Bold.ttf: Copyright 2018 The K2D Project Authors (https://github.com/cadsondemak/K2D) K2D-BoldItalic.ttf: Copyright 2018 The K2D Project Authors (https://github.com/cadsondemak/K2D) K2D-ExtraBold.ttf: Copyright 2018 The K2D Project Authors (https://github.com/cadsondemak/K2D) K2D-ExtraBoldItalic.ttf: Copyright 2018 The K2D Project Authors (https://github.com/cadsondemak/K2D)
[OFL-1.1](https://openfontlicense.org)

## Other Notes
Font version (provided by source): `v13`.

If you have any suggestions or ideas to improve the performance of font loading or expand the existing library, feel free to star and contribute to this repository. You can share your suggestions or ideas by creating an [issue](https://github.com/fontsource/fontsource/issues).