---
title: "n-color"
linkTitle: "n-color"
slug: "modules"
---

## Table of contents

### Variables

- [HSL](modules.md#hsl)
- [RGBA](modules.md#rgba)

### Classes

- [HSLSpace](classes/HSLSpace.md)
- [RGBASpace](classes/RGBASpace.md)

## Variables

### HSL

• **HSL**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fromHex` | (`hex`: `string`) => [`HSLSpace`](classes/HSLSpace.md) |
| `fromHSL` | (`hue`: `number`, `saturation`: `number`, `lightness`: `number`) => [`HSLSpace`](classes/HSLSpace.md) |
| `fromRGB` | (`red`: `number`, `green`: `number`, `blue`: `number`) => [`HSLSpace`](classes/HSLSpace.md) |
| `fromRGBA` | (`red`: `number`, `green`: `number`, `blue`: `number`, `alpha`: `number`) => [`HSLSpace`](classes/HSLSpace.md) |

#### Defined in

[spaces/hsl/hsl.resolver.ts:4](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.resolver.ts#L4)

___

### RGBA

• **RGBA**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fromHex` | (`hex`: `string`) => [`RGBASpace`](classes/RGBASpace.md) |
| `fromRGB` | (`red`: `number`, `green`: `number`, `blue`: `number`) => [`RGBASpace`](classes/RGBASpace.md) |
| `fromRGBA` | (`red`: `number`, `green`: `number`, `blue`: `number`, `alpha`: `number`) => [`RGBASpace`](classes/RGBASpace.md) |

#### Defined in

[spaces/rgba/rgba.resolver.ts:4](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/rgba/rgba.resolver.ts#L4)
