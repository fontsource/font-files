# Fontsource Hubot Sans

[![npm (scoped)](https://img.shields.io/npm/v/@fontsource-variable/hubot-sans?color=brightgreen)](https://www.npmjs.com/package/@fontsource-variable/hubot-sans) [![Generic badge](https://img.shields.io/badge/fontsource-passing-brightgreen)](https://github.com/fontsource/fontsource) [![Monthly downloads](https://badgen.net/npm/dm/@fontsource-variable/hubot-sans)](https://github.com/fontsource/fontsource) [![Total downloads](https://badgen.net/npm/dt/@fontsource-variable/hubot-sans)](https://github.com/fontsource/fontsource) [![GitHub stars](https://img.shields.io/github/stars/fontsource/fontsource.svg?style=social&label=Star)](https://github.com/fontsource/fontsource/stargazers)

The CSS and web font files to easily self-host the “Hubot Sans” variable font. Please visit the main [Fontsource website](https://fontsource.org/fonts/hubot-sans) to view more details on this package.

## Quick Installation

Fontsource offers multiple methods to import the CSS, including using a bundler like Vite or using SASS. You can find full documentation [here](https://fontsource.org/docs/getting-started/introduction).

```javascript
npm install @fontsource-variable/hubot-sans
```

Within your app entry file or site component, import it in.

```javascript
import "@fontsource-variable/hubot-sans"; // Defaults to wght axis
import "@fontsource-variable/hubot-sans/wght.css"; // Specify axis
import "@fontsource-variable/hubot-sans/wght-italic.css"; // Specify axis and style
```

Supported variables:
- Weights: `[200,300,400,500,600,700,800,900]`
- Styles: `[italic,normal]`
- Subsets: `[latin,latin-ext,vietnamese]`
- Axes: `[wdth,wght]`

> Note: `italic` may not be supported by all fonts. To learn more about what axes and styles are supported, please visit the [Fontsource website](https://fontsource.org/fonts/hubot-sans).

Finally, you can reference the font name in a CSS stylesheet, CSS Module, or CSS-in-JS.

```css
body {
  font-family: "Hubot Sans Variable";
}
```

## Licensing
Always make sure to read the license for each font you use. Most of the fonts in the collection use the SIL Open Font License, v1.1. Some fonts use the Apache 2 license. The Ubuntu fonts use the Ubuntu Font License v1.0.

Copyright 2021 The Hubot Sans Project Authors (https://github.com/github/hubot-sans), with Reserved Font Name "Hubot" HubotSans-Italic[wdth,wght].ttf: Copyright 2021 The Hubot Sans Project Authors (https://github.com/github/hubot-sans), with Reserved Font Name "Hubot"
[OFL-1.1](https://openfontlicense.org)

## Other Notes
Font version (provided by source): `v5`.

If you have any suggestions or ideas to improve the performance of font loading or expand the existing library, feel free to star and contribute to this repository. You can share your suggestions or ideas by creating an [issue](https://github.com/fontsource/fontsource/issues).