# @skinnypete/color
[![NPM](https://nodei.co/npm/@skinnypete/color.png)](https://npmjs.org/package/@skinnypete/color)

[![Build Status](https://github.com/SkinnyPeteTheGiraffe/color/actions/workflows/ci.yml/badge.svg)](https://github.com/SkinnyPeteTheGiraffe/color/actions/workflows/ci.yml?query=branch%3Amain+)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/1ea5d484507b4ed8812d44c30cf72c43)](https://www.codacy.com/gh/SkinnyPeteTheGiraffe/color/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SkinnyPeteTheGiraffe/color&amp;utm_campaign=Badge_Grade)
[![MIT License](http://img.shields.io/badge/license-MIT-green.svg)](LICENSE.md)
![Best Badge](https://img.shields.io/badge/another%20js%20library-yes-green)
![Purple](https://img.shields.io/badge/purple-purple)

#### _"What even is this? Why are you asking me what I think?"&nbsp;&nbsp;—&nbsp;&nbsp;<small>Very Important, Real Person</small>_

<div>
    <div style="text-align: center;">
        <a href="https://skinnypetethegiraffe.github.io/color/" target="blank">Documentation</a>
        &nbsp;&nbsp;—&nbsp;&nbsp;
        <a href="https://skinnypetethegiraffe.github.io/color/api/" target="blank">API</a>
        <div style="text-align: center;">
            Simple yet powerful, lightweight, true color conversion and manipulation library.
        </div>
    </div>
</div>

## Description
A true color manipulation and conversion library. Unlike some other libraries, this provides access directly to each color
model, instead of relying on a single model to generate outputs. That means this library works within each color model
to preform operations (some use conversion to make the process easier). This can ensure more accurate colors for sensitive
projects, preform targeted manipulations on a single space, gives you more control in which model your color stays
in, and much more.

## Reasoning
Having used the [Qix-/color](https://github.com/Qix-/color) for as long as I can remember when it comes to dealing with color libraries, and while
it's a great library, I wanted to approach it from idea of treating each color model as a separate instance.<br/><br/>Most available color
libraries rely on a single color model and output values for various color models.

## Features
<hr />

  * Supports multiple color models (Ex. [RGBA](https://en.wikipedia.org/wiki/RGBA_color_model), [HWB](https://en.wikipedia.org/wiki/HWB_color_model), [HSL & HSV](https://en.wikipedia.org/wiki/HSL_and_HSV))
  * Accepts CSS [color-names](https://www.w3schools.com/colors/colors_names.asp)
  * Full of features and easy-to-use ([Builder Pattern](https://en.wikipedia.org/wiki/Builder_pattern#:~:text=The%20builder%20pattern%20is%20a,Gang%20of%20Four%20design%20patterns.) design)
  * Written in Typescript
  * Plenty of QOL enchantments
  * Works directly within the color space instead of relying on single color model to generate output values
  * Dependency free
  * **Will not do your taxes, sorry...**

### Supported Color Spaces
* RGBA
* HSV
* HWB
* HSL
* CMYK (Coming Soon)
## Example

```ts
import { RGBA } from '@skinnypete/color';

const cssColor = RGBA.fromCssColor('RebeccaPurple');    // Accepts CSS Color Names
const shortHandHex = RGBA.fromHex('000');               // Can use shorthand hex values with and without hashtags
const hex = RGBA.fromHex('#663399');                    // Of course you can use hex (for any color space)
const rgb = RGBA.fromRGBA(102, 51, 153);                // Ability to pass in values (useful for external color space modfications)
const rgba = RGBA.fromRGBA(102, 51, 153, 0.44);         // Use alpha when applicable
const hslFromRGBA = RGBA.fromCssColor('RebeccaPurple')  // Easily switch between color models
    .toSpace('hsl');                                            

console.log(cssColor.toHexString());                     // #663399
console.log(shortHandHex.toArray());                     // [0,0,0,1]
console.log(rgb.toObject());                             // {"red":102,"green":51,"blue":153,"alpha":1}
console.log(rgb.toString());                             // rgb(102,51,153)
console.log(rgba.toString(true));                        // rgba(102,51,153,0.44)
console.log(hex.mix(shortHandHex.toObject(), 0.24)       // #4e2774
    .toString()); 
console.log(rgba.toHexString(true))                      // 663399
console.log(hslFromRGBA.toString());                     // hsl(270,50%,40%)
```

## Installation
```shell
# NPM
npm install @skinnypete/color
# PNPM
pnpm install @skinnypete/color
# Yarn
yarn add @skinnypete/color
```
