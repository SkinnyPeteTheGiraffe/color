# n-color
[![Build Status](https://github.com/SkinnyPeteTheGiraffe/n-color/actions/workflows/ci.yml/badge.svg)](https://github.com/SkinnyPeteTheGiraffe/n-color/actions/workflows/ci.yml?query=branch%3Amain+)
[![Coverage Status](https://coveralls.io/repos/github/SkinnyPeteTheGiraffe/n-color/badge.svg?branch=main)](https://coveralls.io/github/SkinnyPeteTheGiraffe/n-color?branch=main)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/1ea5d484507b4ed8812d44c30cf72c43)](https://www.codacy.com/gh/SkinnyPeteTheGiraffe/n-color/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SkinnyPeteTheGiraffe/n-color&amp;utm_campaign=Badge_Grade)
[![MIT License](http://img.shields.io/badge/license-MIT-green.svg)](LICENSE.md)
![Best Badge](https://img.shields.io/badge/another%20js%20library-yes-green)
![Purple](https://img.shields.io/badge/purple-purple)

#### _"This is the best library for colors!" - <small>Very Important, Real Person</small>_

<div>
<p style="text-align: center;">
  <a href="https://skinnypetethegiraffe.github.io/n-color/" target="blank"><img src="site/docs/_media/n-color-logo.svg" width="120" alt="Nest Logo" /></a>
  <br/>
</p>
<div style="text-align: center;">
    <a href="https://skinnypetethegiraffe.github.io/n-color/" target="blank">Documentation</a>
    &nbsp;&nbsp;—&nbsp;&nbsp;
    <a href="https://skinnypetethegiraffe.github.io/n-color/api/" target="blank">API</a>
    <div style="text-align: center;">
        Powerful lightweight color conversion and manipulation library.
    </div>
</div>

## Features
<hr />

  * Supports multiple color models (Ex. [RGBA](https://en.wikipedia.org/wiki/RGBA_color_model), [HWB](https://en.wikipedia.org/wiki/HWB_color_model), [HSL & HSV](https://en.wikipedia.org/wiki/HSL_and_HSV))
  * Accepts CSS [color-names](https://www.w3schools.com/colors/colors_names.asp)
  * Full of features and easy-to-use ([Builder Pattern](https://en.wikipedia.org/wiki/Builder_pattern#:~:text=The%20builder%20pattern%20is%20a,Gang%20of%20Four%20design%20patterns.) design)
  * Written in Typescript
  * Plenty of QOL enchantments
  * Works directly with the color space instead of relying on single color space to generate output values
  * Dependency free
  * **Will not do your taxes, sorry...**

## Example
```typescript
RGBA.fromHex('#fecd22')
    .darken(0.69) // Accepts [0,1] and (1,100] as a percentage - 0-100%
    .rotate(69) // Leverages multiple color spaces
    .lighten(44.15) // Supports decimal ratios
    .setColor('blue', 250) // Manually set values
    .grayscale() // Miscellaneous stuff like this
    .toHexString() // #696969 - Can return valid CSS values
```

## Installation <small>(Coming Soon™)</small>
```shell
# NPM
npm install n-color
# PNPM
pnpm install n-color
# Yarn
yarn add n-color
```
