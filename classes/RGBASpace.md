---
title: "Class: RGBASpace"
linkTitle: "RGBASpace"
slug: "RGBASpace"
---

RGBA wrapper which provides mutations and accessor functions for
the RGBA color space.

## Implements

- `BaseSpace`<`RGBAColorSpace`\>

## Table of contents

### Constructors

- [constructor](RGBASpace.md#constructor)

### Properties

- [type](RGBASpace.md#type)

### Methods

- [red](RGBASpace.md#red)
- [green](RGBASpace.md#green)
- [alpha](RGBASpace.md#alpha)
- [blue](RGBASpace.md#blue)
- [color](RGBASpace.md#color)
- [setColor](RGBASpace.md#setcolor)
- [clone](RGBASpace.md#clone)
- [lighten](RGBASpace.md#lighten)
- [darken](RGBASpace.md#darken)
- [whiten](RGBASpace.md#whiten)
- [blacken](RGBASpace.md#blacken)
- [grayscale](RGBASpace.md#grayscale)
- [saturate](RGBASpace.md#saturate)
- [desaturate](RGBASpace.md#desaturate)
- [fade](RGBASpace.md#fade)
- [fill](RGBASpace.md#fill)
- [rotate](RGBASpace.md#rotate)
- [mix](RGBASpace.md#mix)
- [setOpacity](RGBASpace.md#setopacity)
- [toHexString](RGBASpace.md#tohexstring)
- [toArray](RGBASpace.md#toarray)
- [toObject](RGBASpace.md#toobject)
- [toString](RGBASpace.md#tostring)
- [toHSL](RGBASpace.md#tohsl)

## Constructors

### constructor

• **new RGBASpace**(`space`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `space` | `RGBAColorSpace` |

#### Defined in

[spaces/rgba/rgba.space.ts:17](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L17)

## Properties

### type

• **type**: `ModelType`

#### Implementation of

BaseSpace.type

#### Defined in

[spaces/rgba/rgba.space.ts:14](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L14)

## Methods

### red

▸ **red**(): `number`

Retrieves the value of the red channel for the current color space.

#### Returns

`number`

the red channel value of this color space

#### Defined in

[spaces/rgba/rgba.space.ts:27](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L27)

___

### green

▸ **green**(): `number`

Retrieves the value of the green channel for the current color space.

#### Returns

`number`

the green channel value of this color space

#### Defined in

[spaces/rgba/rgba.space.ts:36](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L36)

___

### alpha

▸ **alpha**(): `number`

Retrieves the value of the alpha channel for the current color space.

#### Returns

`number`

the alpha channel value of this color space

#### Defined in

[spaces/rgba/rgba.space.ts:45](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L45)

___

### blue

▸ **blue**(): `number`

Retrieves the value of the blue channel for the current color space.

#### Returns

`number`

the blue channel value of this color space

#### Defined in

[spaces/rgba/rgba.space.ts:54](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L54)

___

### color

▸ **color**(`color`): `number`

Retrieves a color channel from the RGBA color space via key.

**`example`**
Here's a simple example retrieving each channel
```ts
rgb.toString() // rgb(0,128,255)
rgb.color('red') // 0
rgb.color('green') // 128
rgb.color('blue') // 255
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | keyof `RGBAColorSpace` | the name of the channel from the current color space to retrieve |

#### Returns

`number`

the value of the channel matching the provided key

#### Implementation of

BaseSpace.color

#### Defined in

[spaces/rgba/rgba.space.ts:71](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L71)

___

### setColor

▸ **setColor**(`color`, `value`): [`RGBASpace`](RGBASpace.md)

Sets value of the color space channel matching the provided key.

**`example`**
Here's a simple example setting a value for each channel:
```ts
rgb.setColor('red', 0)
rgb.setColor('green', 128)
rgb.setColor('blue', 255)
rgb.toString() // rgb(0,128,255)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | keyof `RGBAColorSpace` | the name of the channel from the current color space to set new value |
| `value` | `number` | the value for the specified color channel |

#### Returns

[`RGBASpace`](RGBASpace.md)

#### Implementation of

BaseSpace.setColor

#### Defined in

[spaces/rgba/rgba.space.ts:88](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L88)

___

### clone

▸ **clone**(): [`RGBASpace`](RGBASpace.md)

Clones the current color space.

#### Returns

[`RGBASpace`](RGBASpace.md)

[RGBASpace](RGBASpace.md) a new cloned instance of the original color space

#### Implementation of

BaseSpace.clone

#### Defined in

[spaces/rgba/rgba.space.ts:102](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L102)

___

### lighten

▸ **lighten**(`ratio`): [`RGBASpace`](RGBASpace.md)

Lightens the color space by a relative ratio.

**`remarks`**
To lighten the color space this function converts the space to HSL, in which the `lightness` value by a relative
ratio, after which is converted back to the original color space.

**`remarks`**
The ratio is applied
by first multiplying the percent against the current value, and adding that
result to the lightness value clamping it between [0,1]

**`example`**
Here's a simple usage example lightening the color by 20% using the RGBA color space:
```ts

import { RGBA } from 'n-color'

const rgba = RGBA.fromHex('#b9825b')
rgba.toString() // rgb(200,128,75)
rgba.lighten(0).toString() // rgb(200,128,75)
rgba.lighten(20).toString() // rgb(213,157,118)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | a value between [0,1] or (1,100] as the ratio to adjust the lightness of the color space |

#### Returns

[`RGBASpace`](RGBASpace.md)

#### Implementation of

BaseSpace.lighten

#### Defined in

[spaces/rgba/rgba.space.ts:132](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L132)

___

### darken

▸ **darken**(`ratio`): [`RGBASpace`](RGBASpace.md)

Darkens the RGB color space by a relative ratio.

**`remarks`**
To lighten the color, this
function converts the RGB color to HSL color space, adjusts the lightness
attribute, and converts back to the RGB color space.

**`remarks`**
The ratio is applied
by first multiplying the percent against the current value, and subtracting that
result to the lightness value clamping it between [0,1]

**`example`**
Here's a simple usage example darkening the color by 20%:
```ts
color.toString() // rgb(100,100,100)
color.darken(0).toString() // rgb(100,100,100)
color.darken(0.2).toString() // rgb(69,69,69)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | percentage to darken the color by as a value between [0,1], or (1,100] |

#### Returns

[`RGBASpace`](RGBASpace.md)

#### Implementation of

BaseSpace.darken

#### Defined in

[spaces/rgba/rgba.space.ts:160](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L160)

___

### whiten

▸ **whiten**(`ratio`): [`RGBASpace`](RGBASpace.md)

Whiten the RBG value by a relative ratio. This function converts the RGB
color space to HWB, adds whiteness value, and converts back to RGB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | value between 0 - 1 or 1 - 100 representing a relative percent in which to whiten the color |

#### Returns

[`RGBASpace`](RGBASpace.md)

#### Implementation of

BaseSpace.whiten

#### Defined in

[spaces/rgba/rgba.space.ts:172](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L172)

___

### blacken

▸ **blacken**(`ratio`): [`RGBASpace`](RGBASpace.md)

Blackens the RBG value by a relative ratio. This function converts the RGB
color space to HWB, adds blackness value, and converts back to RGB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | value between 0 - 1 or 1 - 100 representing a relative percent in which to blacken the color |

#### Returns

[`RGBASpace`](RGBASpace.md)

#### Implementation of

BaseSpace.blacken

#### Defined in

[spaces/rgba/rgba.space.ts:187](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L187)

___

### grayscale

▸ **grayscale**(): [`RGBASpace`](RGBASpace.md)

Converts RGB color channels to grayscale using a weighted YUV conversion.

#### Returns

[`RGBASpace`](RGBASpace.md)

#### Implementation of

BaseSpace.grayscale

#### Defined in

[spaces/rgba/rgba.space.ts:199](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L199)

___

### saturate

▸ **saturate**(`ratio`): [`RGBASpace`](RGBASpace.md)

Saturates the RGB color by a relative ratio.

**`remarks`** This function converts the color space to HSL to preform operation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | the ratio to saturate color |

#### Returns

[`RGBASpace`](RGBASpace.md)

#### Implementation of

BaseSpace.saturate

#### Defined in

[spaces/rgba/rgba.space.ts:216](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L216)

___

### desaturate

▸ **desaturate**(`ratio`): [`RGBASpace`](RGBASpace.md)

Desaturates the RGB color by a relative ratio. The color is desaturated by
converting the value to HSL, adjusting the saturation, and converting
back to RGB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | the relative ratio to saturate the color |

#### Returns

[`RGBASpace`](RGBASpace.md)

#### Implementation of

BaseSpace.desaturate

#### Defined in

[spaces/rgba/rgba.space.ts:229](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L229)

___

### fade

▸ **fade**(`ratio`): [`RGBASpace`](RGBASpace.md)

Reduce the RGBA color space alpha value by a relative ratio.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | the ratio in which to reduce the alpha channel value |

#### Returns

[`RGBASpace`](RGBASpace.md)

#### Defined in

[spaces/rgba/rgba.space.ts:240](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L240)

___

### fill

▸ **fill**(`ratio`): [`RGBASpace`](RGBASpace.md)

Increase the RGBA color space alpha value by a relative ratio.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | the ratio in which to increase the alpha channel value |

#### Returns

[`RGBASpace`](RGBASpace.md)

#### Defined in

[spaces/rgba/rgba.space.ts:251](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L251)

___

### rotate

▸ **rotate**(`degrees`): [`RGBASpace`](RGBASpace.md)

Rotates the hue of the color space by a given number of degrees.

**`remarks`** Converts the color space to HSL, where the hue is represented as degrees; having a value between [0,360].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `degrees` | `number` | the number of degrees to rotate the hue channel |

#### Returns

[`RGBASpace`](RGBASpace.md)

#### Implementation of

BaseSpace.rotate

#### Defined in

[spaces/rgba/rgba.space.ts:264](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L264)

___

### mix

▸ **mix**(`color`, `weight?`): [`RGBASpace`](RGBASpace.md)

Mixes this color with the provided RGBA color value by the specified weight.

**`remarks`** This function is directly ported from the SASS mix method: https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `color` | `RGBAColorSpace` | `undefined` | the RGBA color to mix into the current instance |
| `weight` | `number` | `0.5` | the weight in which the color should be mixed |

#### Returns

[`RGBASpace`](RGBASpace.md)

#### Implementation of

BaseSpace.mix

#### Defined in

[spaces/rgba/rgba.space.ts:278](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L278)

___

### setOpacity

▸ **setOpacity**(`percent`): [`RGBASpace`](RGBASpace.md)

Adjusts the opacity of the [RGBASpace](RGBASpace.md) instance. This value
is limited between 0 and 1, and also between 1 and 100. Values between 0
and 1 are compared first, after which values between 1 and 100 are compared,
This value is clamped.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `percent` | `number` | the percent of opacity to set (0-1 or 1-100) |

#### Returns

[`RGBASpace`](RGBASpace.md)

#### Defined in

[spaces/rgba/rgba.space.ts:316](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L316)

___

### toHexString

▸ **toHexString**(`removeHashtag?`): `string`

Returns a hex string representing the RGB color space. This ignores any
alpha values.<br/><br/>
Example
```ts
color.toString() // rgb(185,130,91)
color.toHexString() // #b9825b
color.toHexString(true) // b9825b
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `removeHashtag?` | `boolean` | will return the hex value without a hashtag if true, otherwise will return with hashtag |

#### Returns

`string`

#### Implementation of

BaseSpace.toHexString

#### Defined in

[spaces/rgba/rgba.space.ts:332](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L332)

___

### toArray

▸ **toArray**(): [`number`, `number`, `number`, `number`]

Retrieves an array representing the RGBA color space containing the primary colors and alpha
values. Array index is ordered logically [RGBA].

#### Returns

[`number`, `number`, `number`, `number`]

the RGBA color space values as an array

#### Implementation of

BaseSpace.toArray

#### Defined in

[spaces/rgba/rgba.space.ts:344](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L344)

___

### toObject

▸ **toObject**(): `RGBAColorSpace`

Retrieves an object representing the RGBA color space containing the primary colors and alpha
values.

#### Returns

`RGBAColorSpace`

the RGBA color space values

#### Implementation of

BaseSpace.toObject

#### Defined in

[spaces/rgba/rgba.space.ts:354](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L354)

___

### toString

▸ **toString**(`alpha?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `alpha?` | `boolean` |

#### Returns

`string`

#### Implementation of

BaseSpace.toString

#### Defined in

[spaces/rgba/rgba.space.ts:358](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L358)

___

### toHSL

▸ **toHSL**(): [`HSLSpace`](HSLSpace.md)

#### Returns

[`HSLSpace`](HSLSpace.md)

#### Defined in

[spaces/rgba/rgba.space.ts:364](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/4b1d5d9/src/spaces/rgba/rgba.space.ts#L364)
