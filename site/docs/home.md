# n-color

A modern, lightweight, color manipulation and conversion library.

```typescript
import { RGBA } from '@notorious/color';

const rgba = RGBA.fromHex('#c8804b').lighten(0.42);
const hsl = rgba.toHSL();

console.log(rgba.toString())
console.log(rgba.toString(true))
console.log(hsl.toString())
```

```console
rgb(228,191,165)
rgba(228,191,165,1)
hsl(25,54%,77%)
```

## Features
* Supports multiple color spaces. See supported list [below](#supported-color-spaces).
* Can generate valid CSS color values
* Supports CSS [color-names](https://www.w3schools.com/colors/colors_names.asp)
* Written in Typescript (this one could be subjective)
* Easy to use, and well documented
* Lightweight and dependency free, so no need to worry about unnecessary bloat when installing **n-color** into your project
* Stable and consistent results, enforcing strict unit testing to ensure outputs are always the same before any changes are accepted into the library

## Getting Started
* [Install Guide](/getting-started#install-guide)
* [Usage](/getting-started#usage)
* [API Documentation](/api)

## Supported Color Spaces
* [RGBA](/docs/spaces/rgba)
* [HSL](/docs/spaces/hsl)
* HWB (Coming Soon)
* HSV (Coming Soon)
* CMYK (Coming Soon)
