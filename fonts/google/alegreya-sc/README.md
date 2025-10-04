# Fontsource Alegreya SC

[![npm (scoped)](https://img.shields.io/npm/v/@fontsource/alegreya-sc?color=brightgreen)](https://www.npmjs.com/package/@fontsource/alegreya-sc) [![Generic badge](https://img.shields.io/badge/fontsource-passing-brightgreen)](https://github.com/fontsource/fontsource) [![Monthly downloads](https://badgen.net/npm/dm/@fontsource/alegreya-sc)](https://github.com/fontsource/fontsource) [![Total downloads](https://badgen.net/npm/dt/@fontsource/alegreya-sc)](https://github.com/fontsource/fontsource) [![GitHub stars](https://img.shields.io/github/stars/fontsource/fontsource.svg?style=social&label=Star)](https://github.com/fontsource/fontsource/stargazers)

The CSS and web font files to easily self-host the “Alegreya SC” font. Please visit the main [Fontsource website](https://fontsource.org/fonts/alegreya-sc) to view more details on this package.

## Quick Installation

Fontsource offers multiple methods to import the CSS, including using a bundler like Vite or using SASS. You can find full documentation [here](https://fontsource.org/docs/getting-started/introduction).

```javascript
npm install @fontsource/alegreya-sc
```

Within your app entry file or site component, import it in.

```javascript
import "@fontsource/alegreya-sc"; // Defaults to weight 400
import "@fontsource/alegreya-sc/400.css"; // Specify weight
import "@fontsource/alegreya-sc/400-italic.css"; // Specify weight and style
```

Supported variables:
- Weights: `[400,500,700,800,900]`
- Styles: `[italic,normal]`
- Subsets: `[cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese]`

> Note: `italic` may not be supported by all fonts. To learn more about what weights and styles are supported, please visit the [Fontsource website](https://fontsource.org/fonts/alegreya-sc).

Finally, you can reference the font name in a CSS stylesheet, CSS Module, or CSS-in-JS.

```css
body {
  font-family: "Alegreya SC";
}
```

## Licensing
Always make sure to read the license for each font you use. Most of the fonts in the collection use the SIL Open Font License, v1.1. Some fonts use the Apache 2 license. The Ubuntu fonts use the Ubuntu Font License v1.0.

Copyright 2011 The Alegreya Project Authors (https://github.com/huertatipografica/Alegreya) AlegreyaSC-Italic.ttf: Copyright 2011 The Alegreya Project Authors (https://github.com/huertatipografica/Alegreya) AlegreyaSC-Medium.ttf: Copyright 2011 The Alegreya Project Authors (https://github.com/huertatipografica/Alegreya) AlegreyaSC-MediumItalic.ttf: Copyright 2011 The Alegreya Project Authors (https://github.com/huertatipografica/Alegreya) AlegreyaSC-Bold.ttf: Copyright 2011 The Alegreya Project Authors (https://github.com/huertatipografica/Alegreya) AlegreyaSC-BoldItalic.ttf: Copyright 2011 The Alegreya Project Authors (https://github.com/huertatipografica/Alegreya) AlegreyaSC-ExtraBold.ttf: Copyright 2011 The Alegreya Project Authors (https://github.com/huertatipografica/Alegreya) AlegreyaSC-ExtraBoldItalic.ttf: Copyright 2011 The Alegreya Project Authors (https://github.com/huertatipografica/Alegreya) AlegreyaSC-Black.ttf: Copyright 2011 The Alegreya Project Authors (https://github.com/huertatipografica/Alegreya) AlegreyaSC-BlackItalic.ttf: Copyright 2011 The Alegreya Project Authors (https://github.com/huertatipografica/Alegreya)
[OFL-1.1](https://openfontlicense.org)

## Other Notes
Font version (provided by source): `v26`.

If you have any suggestions or ideas to improve the performance of font loading or expand the existing library, feel free to star and contribute to this repository. You can share your suggestions or ideas by creating an [issue](https://github.com/fontsource/fontsource/issues).