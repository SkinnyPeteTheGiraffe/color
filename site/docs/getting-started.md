# Getting Started

The guides below will help you get up and started using **n-color**. If something is unclear or should be expanded upon, [PR's](https://github.com/SkinnyPeteTheGiraffe/@noto/color/pulls) are always welcome.

## Guides
* [Installation](#installation)
* [Basic Usage](#usage)
* [Further Reading](#further-reading)


## Installation
Depending on your package manager (we should all know the drill):
```shell
# NPM
npm install @noto/color
# PNPM
pnpm install @noto/color
# Yarn
yarn add @noto/color
```

That's it. Below you can see how to import and use **n-color** in the [Usage](#usage) section.

## Basic Usage
To improve usability and simplify the usage, **n-color** exposes function providers for each color space instead
of opting for direct access to the class system.

### Importing
Each function provider is exported from the root package.

_It is recommended that nothing else outside the root package is imported as stability will not be guaranteed and
could break between sub-minor versions._
```ts
import { RGBA, HSL } from '@noto/color';
```

### Providers
To create a new color space instance, you can use one of the accessing methods instead of directly instantiating the 
class directly. Which has a benefit of providing ease-of-use functionality such as CSS color name conversion. Below are
examples of creating a space in each of the provided models.

For more information about the methods each space provides see the [Color Model](/models.md#base-color-space) section

##### RGBA
The [RGBA](https://en.wikipedia.org/wiki/RGB_color_spaces) (Red, Green, Blue, Alpha) color space provider.
```ts
import { RGBA } from '@noto/color';

const hex = RGBA.fromHex('#44bfa5');
const css = RGBA.fromCssColor('LightSeaGreen');
const rgb = RGBA.fromRGB(68, 191, 165);
const rgba = RGBA.fromRGBA(68, 191, 165, 0.5);
const space = RGBA.fromRGBAColorSpace({ red: 68, green: 191, blue: 165, alpha: 0.5});
```

##### HSL
The [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) (Hue, Saturation, Lightness) color space provider.
```ts
import { HSL } from '@noto/color';

const hex = HSL.fromHex('#44bfa5');
const css = HSL.fromCssColor('FireBrick');
const hsl = HSL.fromHSL(250, 25, 20);
const space = HSL.fromHSLColorSpace({ hue: 300, saturation: 20, lightness: 10 });
```

##### HSV
The [HSV](https://en.wikipedia.org/wiki/HSL_and_HSV) (Hue, Saturation, Value) color space provider.
```ts
import { HSV } from '@noto/color';

const hex = HSV.fromHex('#44bfa5');
const css = HSV.fromCssColor('LavenderBlush');
const hsv = HSV.fromHSV(250, 25, 20);
const space = HSV.fromHSVColorSpace({ hue: 300, saturation: 20, value: 10 });
```

##### HWB
The [HWB](https://en.wikipedia.org/wiki/HWB_color_model) (Hue, Whiteness, Blackness) color space provider.
```ts
import { HWB } from '@noto/color';

const hex = HWB.fromHex('#44bfa5');
const css = HWB.fromCssColor('LavenderBlush');
const hwb = HWB.fromHWB(250, 25, 20);
const space = HWB.fromHWBColorSpace({ hue: 300, whiteness: 20, blackness: 10 });
```

## Further Reading
While each space shares most functionality, they can also have unique attributes that are not shared. To learn more about
these unique attributes refer to the [Color Model](/models.md) section.
