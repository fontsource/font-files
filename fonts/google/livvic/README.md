# Fontsource Livvic

[![npm (scoped)](https://img.shields.io/npm/v/@fontsource/livvic?color=brightgreen)](https://www.npmjs.com/package/@fontsource/livvic) [![Generic badge](https://img.shields.io/badge/fontsource-passing-brightgreen)](https://github.com/fontsource/fontsource) [![Monthly downloads](https://badgen.net/npm/dm/@fontsource/livvic)](https://github.com/fontsource/fontsource) [![Total downloads](https://badgen.net/npm/dt/@fontsource/livvic)](https://github.com/fontsource/fontsource) [![GitHub stars](https://img.shields.io/github/stars/fontsource/fontsource.svg?style=social&label=Star)](https://github.com/fontsource/fontsource/stargazers)

The CSS and web font files to easily self-host the “Livvic” font. Please visit the main [Fontsource website](https://fontsource.org/fonts/livvic) to view more details on this package.

## Quick Installation

Fontsource offers multiple methods to import the CSS, including using a bundler like Vite or using SASS. You can find full documentation [here](https://fontsource.org/docs/getting-started/introduction).

```javascript
npm install @fontsource/livvic
```

Within your app entry file or site component, import it in.

```javascript
import "@fontsource/livvic"; // Defaults to weight 400
import "@fontsource/livvic/400.css"; // Specify weight
import "@fontsource/livvic/400-italic.css"; // Specify weight and style
```

Supported variables:
- Weights: `[100,200,300,400,500,600,700,900]`
- Styles: `[italic,normal]`
- Subsets: `[latin,latin-ext,vietnamese]`

> Note: `italic` may not be supported by all fonts. To learn more about what weights and styles are supported, please visit the [Fontsource website](https://fontsource.org/fonts/livvic).

Finally, you can reference the font name in a CSS stylesheet, CSS Module, or CSS-in-JS.

```css
body {
  font-family: "Livvic";
}
```

## Licensing
Always make sure to read the license for each font you use. Most of the fonts in the collection use the SIL Open Font License, v1.1. Some fonts use the Apache 2 license. The Ubuntu fonts use the Ubuntu Font License v1.0.

Copyright 2019 The Livvic Project Authors (https://github.com/Fonthausen/Livvic) Livvic-ThinItalic.ttf: Copyright 2019 The Livvic Project Authors (https://github.com/Fonthausen/Livvic) Livvic-ExtraLight.ttf: Copyright 2019 The Livvic Project Authors (https://github.com/Fonthausen/Livvic) Livvic-ExtraLightItalic.ttf: Copyright 2019 The Livvic Project Authors (https://github.com/Fonthausen/Livvic) Livvic-Light.ttf: Copyright 2019 The Livvic Project Authors (https://github.com/Fonthausen/Livvic) Livvic-LightItalic.ttf: Copyright 2019 The Livvic Project Authors (https://github.com/Fonthausen/Livvic) Livvic-Regular.ttf: Copyright 2019 The Livvic Project Authors (https://github.com/Fonthausen/Livvic) Livvic-Italic.ttf: Copyright 2019 The Livvic Project Authors (https://github.com/Fonthausen/Livvic) Livvic-Medium.ttf: Copyright 2019 The Livvic Project Authors (https://github.com/Fonthausen/Livvic) Livvic-MediumItalic.ttf: Copyright 2019 The Livvic Project Authors (https://github.com/Fonthausen/Livvic) Livvic-SemiBold.ttf: Copyright 2019 The Livvic Project Authors (https://github.com/Fonthausen/Livvic) Livvic-SemiBoldItalic.ttf: Copyright 2019 The Livvic Project Authors (https://github.com/Fonthausen/Livvic) Livvic-Bold.ttf: Copyright 2019 The Livvic Project Authors (https://github.com/Fonthausen/Livvic) Livvic-BoldItalic.ttf: Copyright 2019 The Livvic Project Authors (https://github.com/Fonthausen/Livvic) Livvic-Black.ttf: Copyright 2019 The Livvic Project Authors (https://github.com/Fonthausen/Livvic) Livvic-BlackItalic.ttf: Copyright 2019 The Livvic Project Authors (https://github.com/Fonthausen/Livvic)
[OFL-1.1](https://openfontlicense.org)

## Other Notes
Font version (provided by source): `v15`.

If you have any suggestions or ideas to improve the performance of font loading or expand the existing library, feel free to star and contribute to this repository. You can share your suggestions or ideas by creating an [issue](https://github.com/fontsource/fontsource/issues).