# n-color
[![Build Status](https://github.com/SkinnyPeteTheGiraffe/n-color/actions/workflows/ci.yml/badge.svg)](https://github.com/SkinnyPeteTheGiraffe/n-color/actions/workflows/ci.yml?query=branch%3Amain+)
[![Coverage Status](https://coveralls.io/repos/github/SkinnyPeteTheGiraffe/n-color/badge.svg?branch=main)](https://coveralls.io/github/SkinnyPeteTheGiraffe/n-color?branch=main)
[![MIT License](http://img.shields.io/badge/license-MIT-green.svg)](LICENSE.md)

<p align="center">
  <a href="https://skinnypetethegiraffe.github.io/n-color/" target="blank"><img src="site/docs/_media/n-color-logo.svg" width="120" alt="Nest Logo" /></a>
  <br/>
</p>
<p align="center">
<a href="https://skinnypetethegiraffe.github.io/n-color/" target="blank">Documentation</a>
&nbsp;&nbsp;—&nbsp;&nbsp;
<a href="https://skinnypetethegiraffe.github.io/n-color/api/" target="blank">API</a>
</p>

Modern, lightweight, dependency free, color manipulation and conversion library.

```typescript
RGBA.fromHex('#fecd22')
    .darken(0.69) // Accepts [0,1] and (1,100] as a percentage - 0-100%
    .rotate(69) // Leverages multiple color spaces
    .lighten(44.15) // Supports decimal ratios
    .setColor('blue', 250) // Manual overrides
    .grayscale() // Random stuff like this
    .toHexString() // #696969 - Can return valid CSS values
```

## Installation
```shell
# NPM
npm install n-color
# PNPM
pnpm install n-color
# Yarn
yarn add n-color
```

## Usage
A simple example of importing providers, creating an instances, applying a mutations, and outputting valid CSS values.
```typescript
import { RGBA, HSL } from 'n-color';

const hex = RGBA.fromHex('#c8804b').lighten(42);            // Create RGB from hex, and lighten the color by 42%
const rgb = RGBA.fromRGB(200, 128, 75).grayscale()          // Create RGB instance from channels values and grayscales the color
const rgba = RGBA.fromRGBA(200, 128, 75, 0.5).fill(0.5);    // Create RGBA instance from channels values and fill 50%
const hsl = HSL.fromHSL(144, 50, 75).saturate(44);          // Creates a HSL instance from channel values and saturates it by 44%

console.log(hex.toString())     // rgb(228,191,165)
console.log(rgb.toString())     // rgb(143,143,143)
console.log(rgba.toString())    // rgba(200,128,75,0.75)
console.log(hsl.toString())     // hsl(144,72%,75%)
console.log(hsl.toHexString())  // #91edb6
```
