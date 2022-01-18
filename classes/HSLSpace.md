---
title: "Class: HSLSpace"
linkTitle: "HSLSpace"
slug: "HSLSpace"
---

HSL wrapper which provides mutations and accessor functions for
the HSL color space.

## Implements

- `BaseSpace`<`HSLColorSpace`\>

## Table of contents

### Constructors

- [constructor](HSLSpace.md#constructor)

### Properties

- [type](HSLSpace.md#type)

### Methods

- [hue](HSLSpace.md#hue)
- [saturation](HSLSpace.md#saturation)
- [lightness](HSLSpace.md#lightness)
- [blacken](HSLSpace.md#blacken)
- [clone](HSLSpace.md#clone)
- [color](HSLSpace.md#color)
- [darken](HSLSpace.md#darken)
- [desaturate](HSLSpace.md#desaturate)
- [grayscale](HSLSpace.md#grayscale)
- [lighten](HSLSpace.md#lighten)
- [mix](HSLSpace.md#mix)
- [rotate](HSLSpace.md#rotate)
- [saturate](HSLSpace.md#saturate)
- [setColor](HSLSpace.md#setcolor)
- [toArray](HSLSpace.md#toarray)
- [toHexString](HSLSpace.md#tohexstring)
- [toObject](HSLSpace.md#toobject)
- [toString](HSLSpace.md#tostring)
- [whiten](HSLSpace.md#whiten)
- [toRGBA](HSLSpace.md#torgba)

## Constructors

### constructor

• **new HSLSpace**(`space`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `space` | `HSLColorSpace` |

#### Defined in

[spaces/hsl/hsl.space.ts:22](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L22)

## Properties

### type

• **type**: `ModelType`

#### Implementation of

BaseSpace.type

#### Defined in

[spaces/hsl/hsl.space.ts:19](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L19)

## Methods

### hue

▸ **hue**(): `number`

Retrieves the value of the hue channel for the current color space.

#### Returns

`number`

the hue channel value of this color space

#### Defined in

[spaces/hsl/hsl.space.ts:32](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L32)

___

### saturation

▸ **saturation**(): `number`

Retrieves the value of the saturation channel for the current color space.

#### Returns

`number`

the saturation channel value of this color space

#### Defined in

[spaces/hsl/hsl.space.ts:41](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L41)

___

### lightness

▸ **lightness**(): `number`

Retrieves the value of the lightness channel for the current color space.

#### Returns

`number`

the lightness channel value of this color space

#### Defined in

[spaces/hsl/hsl.space.ts:50](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L50)

___

### blacken

▸ **blacken**(`ratio`): [`HSLSpace`](HSLSpace.md)

Blacken the HSL value by a provided ratio.

**`remarks`** This function converts color space to HWB to preform operation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | the ratio to blacken color |

#### Returns

[`HSLSpace`](HSLSpace.md)

#### Implementation of

BaseSpace.blacken

#### Defined in

[spaces/hsl/hsl.space.ts:61](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L61)

___

### clone

▸ **clone**(): [`HSLSpace`](HSLSpace.md)

Clones the current color space.

#### Returns

[`HSLSpace`](HSLSpace.md)

a new cloned instance of the original color space

#### Implementation of

BaseSpace.clone

#### Defined in

[spaces/hsl/hsl.space.ts:75](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L75)

___

### color

▸ **color**(`color`): `number`

Retrieves a color channel from the HSL color space via key.

**`example`**
Here's a simple example retrieving each channel
```ts
hsl.toString() // hsl(210,100%,50%)
hsl.color('hue') // 210
hsl.color('saturation') // 100
hsl.color('lightness') // 50
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | keyof `HSLColorSpace` | the name of the channel from the current color space to retrieve |

#### Returns

`number`

the value of the channel matching the provided key

#### Implementation of

BaseSpace.color

#### Defined in

[spaces/hsl/hsl.space.ts:92](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L92)

___

### darken

▸ **darken**(`ratio`): [`HSLSpace`](HSLSpace.md)

Darkens the HSL color space by a relative ratio.

**`remarks`**
The ratio is applied
by first multiplying the percent against the current value, and subtracting that
result to the lightness value clamping it between [0,1]

**`example`**
Here's a simple usage example darkening the color by 20% in the HSL color space:
```ts
import { HSL } from 'n-color'

const hsl = HSL.fromHex('#646464')

color.toString() // hsl(0,0%,39%)
color.darken(0).toString() // hsl(0,0%,39%)
color.darken(0.2).toString() // hsl(0,0%,27%)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | percentage to darken the color by as a value between [0,1], or (1,100] |

#### Returns

[`HSLSpace`](HSLSpace.md)

#### Implementation of

BaseSpace.darken

#### Defined in

[spaces/hsl/hsl.space.ts:117](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L117)

___

### desaturate

▸ **desaturate**(`ratio`): [`HSLSpace`](HSLSpace.md)

Desaturates the HSL color by a relative ratio.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | the ratio to desaturate color |

#### Returns

[`HSLSpace`](HSLSpace.md)

#### Implementation of

BaseSpace.desaturate

#### Defined in

[spaces/hsl/hsl.space.ts:126](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L126)

___

### grayscale

▸ **grayscale**(): [`HSLSpace`](HSLSpace.md)

Converts HSL to grayscale.

**`remarks`** This function converts color space to RGBA to preform operation

#### Returns

[`HSLSpace`](HSLSpace.md)

#### Implementation of

BaseSpace.grayscale

#### Defined in

[spaces/hsl/hsl.space.ts:135](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L135)

___

### lighten

▸ **lighten**(`ratio`): [`HSLSpace`](HSLSpace.md)

Lightens the color space by a relative ratio.

**`remarks`**
The ratio is applied
by first multiplying the percent against the current value, and adding that
result to the lightness value clamping it between [0,1]

**`example`**
Here's a simple usage example lightening the color by 20% using the HSL color space:
```ts
import { HSL } from 'n-color'

const hsl = HSL.fromHex('#c8804b')
hsl.toString() // hsl(25,53%,54%)
hsl.lighten(0).toString() // hsl(25,53%,54%)
hsl.lighten(20).toString() // hsl(25,53%,65%)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | a value between [0,1] or (1,100] as the ratio to adjust the lightness of the color space |

#### Returns

[`HSLSpace`](HSLSpace.md)

#### Implementation of

BaseSpace.lighten

#### Defined in

[spaces/hsl/hsl.space.ts:164](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L164)

___

### mix

▸ **mix**(`color`, `weight?`): [`HSLSpace`](HSLSpace.md)

Mixes this color with the provided HSL color value by the specified weight.

**`remarks`** This function is directly ported from the SASS mix method: https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209

**`remarks`** This function converts the color space to [RGBASpace](RGBASpace.md) to preform operations

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | `HSLColorSpace` | the HSL color to mix into the current instance |
| `weight?` | `number` | the weight in which the color should be mixed |

#### Returns

[`HSLSpace`](HSLSpace.md)

#### Implementation of

BaseSpace.mix

#### Defined in

[spaces/hsl/hsl.space.ts:177](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L177)

___

### rotate

▸ **rotate**(`degrees`): [`HSLSpace`](HSLSpace.md)

Rotates the hue of the color space by a given number of degrees.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `degrees` | `number` | the number of degrees to rotate the hue channel |

#### Returns

[`HSLSpace`](HSLSpace.md)

#### Implementation of

BaseSpace.rotate

#### Defined in

[spaces/hsl/hsl.space.ts:188](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L188)

___

### saturate

▸ **saturate**(`ratio`): [`HSLSpace`](HSLSpace.md)

Saturates the HSL color by a relative ratio.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | the ratio to saturate color |

#### Returns

[`HSLSpace`](HSLSpace.md)

#### Implementation of

BaseSpace.saturate

#### Defined in

[spaces/hsl/hsl.space.ts:201](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L201)

___

### setColor

▸ **setColor**(`color`, `value`): [`HSLSpace`](HSLSpace.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `color` | keyof `HSLColorSpace` |
| `value` | `number` |

#### Returns

[`HSLSpace`](HSLSpace.md)

#### Implementation of

BaseSpace.setColor

#### Defined in

[spaces/hsl/hsl.space.ts:205](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L205)

___

### toArray

▸ **toArray**(): [`number`, `number`, `number`]

Retrieves an array representing the HSL color space containing the primary colors.

**`remarks`** Array index is ordered logically [HSL]

#### Returns

[`number`, `number`, `number`]

the HSL color space values as an array

#### Implementation of

BaseSpace.toArray

#### Defined in

[spaces/hsl/hsl.space.ts:221](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L221)

___

### toHexString

▸ **toHexString**(`removeHashtag?`): `string`

Returns a hex string representing the RGB color space. This ignores any
alpha values.<br/><br/>
Example
```ts
color.toString() // hsl(25,40%,54%)
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

[spaces/hsl/hsl.space.ts:236](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L236)

___

### toObject

▸ **toObject**(): `HSLColorSpace`

Retrieves an object representing the RGBA color space containing the primary colors and alpha
values.

#### Returns

`HSLColorSpace`

the HSL color space values

#### Implementation of

BaseSpace.toObject

#### Defined in

[spaces/hsl/hsl.space.ts:246](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L246)

___

### toString

▸ **toString**(): `string`

Prints valid CSS string value.

**`example`**
Here's a simple usage example:
```ts
color.toString() // hsl(25,40%,54%)
```

#### Returns

`string`

valid CSS color value.

#### Implementation of

BaseSpace.toString

#### Defined in

[spaces/hsl/hsl.space.ts:261](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L261)

___

### whiten

▸ **whiten**(`ratio`): [`HSLSpace`](HSLSpace.md)

Whiten the HSL value by a provided ratio.

**`remarks`** This function converts color space to HWB to preform operation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ratio` | `number` | the ratio to whiten color |

#### Returns

[`HSLSpace`](HSLSpace.md)

#### Implementation of

BaseSpace.whiten

#### Defined in

[spaces/hsl/hsl.space.ts:274](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L274)

___

### toRGBA

▸ **toRGBA**(): [`RGBASpace`](RGBASpace.md)

Converts this HSL color space to RGBA with an alpha of 100%.

#### Returns

[`RGBASpace`](RGBASpace.md)

the converted RGBA color space instance

#### Defined in

[spaces/hsl/hsl.space.ts:288](https://github.com/SkinnyPeteTheGiraffe/n-color/blob/096e8dc/src/spaces/hsl/hsl.space.ts#L288)
