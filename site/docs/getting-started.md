# Getting Started

The guides below will help you get up and started using **n-color**. If something is unclear or should be expanded upon, [PR's](https://github.com/SkinnyPeteTheGiraffe/n-color/pulls) are always welcome.

## Guides
* [Installation](#installation)
* [Usage](#usage)


## Installation
Depending on your package manager (we should all know the drill):
```shell
# NPM
npm install n-color
# PNPM
pnpm install n-color
# Yarn
yarn add n-color
```

That's it. Below you can see how to import and use **n-color** in the [Usage](#usage) section.

## Usage
To improve usability and simplify the usage, **n-color** exposes function providers for each color space instead
of opting for direct access to the class system.

### Importing
Each function provider is exported from the root package.

_It is recommended that nothing else outside the root package is imported as stability will not be guaranteed and
could break between sub-minor versions._
```typescript
import { RGBA, HSL } from 'n-color';
```

### Providers
As described above, **n-color** exposes provides instead of providing direct access to the class system. These are used
to create a color space instances which then can be converted and/or manipulated.

#### RGBA
The [RGBA](https://en.wikipedia.org/wiki/RGB_color_spaces) (Red, Green, Blue, Alpha) color space provider.
```typescript
import { RGBA } from 'n-color';

const hex = RGBA.fromHex('#44bfa5');
const rgb = RGBA.fromRGB(68, 191, 165);
const rgba = RGBA.fromRGBA(68, 191, 165, 0.5);
```

#### HSL
The [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) (Hue, Saturation, Lightness) color space provider.
```typescript
import { HSL } from 'n-color';

const hsl0 = HSL.fromHex('#44bfa5');
const hsl1 = HSL.fromHSL(167, 49, 51);
const hsl2 = HSL.fromRGB(68, 191, 165);
const hsl3 = HSL.fromRGBA(68, 191, 165, 0.5);
```
