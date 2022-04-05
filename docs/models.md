# Color Models

This section will describe each available color model the library has to offer. Like stated before this library preforms
operations directly within the targeted color space, and does not just wrap a single space to generate output values. This
not only gives you more control of your color, but allows for more complex external applications, and ensures accuracy.

Just as easily as it is to manipulate colors, you can convert colors into other spaces. This section will help you find
the available spaces, provided functions of each space, and some examples to help you get started.

## Available Models
* RGBA
* HSL
* HSV
* HWB

## Terminology
* **Color Space** - A function provider for a specified color model within the library.
* **RGBA** - Red, Green, Blue, Alpha
* **HSL** - Hue, Saturation, Lightness
* **HSV** - Hue, Saturation, Value
* **HWB** - Hue, Whiteness, Blackness

## Model Type
This type defines all available color spaces within the library
```ts
'rgb' | 'hsv' | 'hsl' | 'hwb'
```

## Switching Between Spaces
While this is a simple example, this demonstrates the ease in which you can move between models.

_Note, using `toSpace()` attempting to convert to a model matching the source of the call will result in null (IE RGBA -> RGBA = null)_
```ts
import { RGBA, RGBASpace, HSLSpace, HWBSpace, HSVSpace } from '@skinnypete/color'

const rgba: RGBASpace = RGBA.fromCssColor('RebeccaPurple'); // From any color space instance you are able to convert via toSpace(key)
const hsl: HSLSpace = rgba.toSpace('hsl'); // Simply provide the space you would like to convert the current instance of
const hwb: HWBSpace = rgba.toSpace('hwb'); // Conditional typing allows for strict types
const hsv: HSVSpace = hwb.toSpace('hsv'); // Yo dawg I heard you like conversions, so I converted the conversion
```

## Base Color Space
Below are the shared methods between all available color spaces. 

### lighten(ratio: number)
* Params:
    * ratio: `Number` - Relative value between [0,1] or (1,100] representing 0-100%
* Returns: `BaseSpace<T>`

This function as the name implies, lightens the current color space. This is achieved within the library by converting the
color model to [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) (if not already HSL), adjusting the lightness value, and converting back to the original color space
if needed.
```ts
    const hwb = HWB.fromHWB(144, 50, 75).lighten(22); // hwb(144,50%,75%) lightened by 22%
    console.log(hwb.toString()); // hwb(144,62%,69%)
```


### darken(ratio: number)
* Params:
  * ratio: `Number` - Relative value between [0,1] or (1,100] representing 0-100%
* Returns: `BaseSpace<T>`

This function as the name implies, darkens the current color space. This is achieved within the library by converting the
color model to [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) (if not already HSL), adjusting the lightness value, and converting back to the original color space
if needed.
```ts
    const hwb = HWB.fromHWB(144, 50, 75).lighten(0.22); // hwb(144,50%,75%) darkened by 22%
    console.log(hwb.toString()); // hwb(144,40%,80%)
```

### whiten(ratio: number)
* Params:
    * ratio: `Number` - Relative value between [0,1] or (1,100] representing 0-100%
* Returns: `BaseSpace<T>`

This function as the name implies, whitens the current color space. This is achieved within the library by converting the
color model to [HWB](https://en.wikipedia.org/wiki/HWB_color_model) (if not already HWB), adjusting the whiteness value, and converting back to the original color space
if needed.
```ts
    const hsl = HSL.fromHSL(144, 50, 75).whiten(42); // hsl(144,50%,75%) whitened by 42%
    console.log(hsl.toString()); // hsl(144,0%,88%)
```

### blacken(ratio: number)
* Params:
    * ratio: `Number` - Relative value between [0,1] or (1,100] representing 0-100%
* Returns: `BaseSpace<T>`

This function as the name implies, blackens the current color space. This is achieved within the library by converting the
color model to [HWB](https://en.wikipedia.org/wiki/HWB_color_model) (if not already HWB), adjusting the blackness value, and converting back to the original color space
if needed.
```ts
    const hsl = HSL.fromHSL(144, 50, 75).blacken(42); // hsl(144,50%,75%) blackened by 42%
    console.log(hsl.toString()); // hsl(144,38%,73%)
```

### saturate(ratio: number)
* Params:
  * ratio: `Number` - Relative value between [0,1] or (1,100] representing 0-100%
* Returns: `BaseSpace<T>`

This function as the name implies, saturates the current color space. This is achieved within the library by converting the
color model to [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) (if not already HSL), adjusting the saturation value,
and converting back to the original color space if needed.
```ts
const rgba = RGBA.fromRGBA(200, 128, 75).saturate(0.75); // rgb(200,128,75) saturated by 75%
console.log(rgba.toString()); // rgb(247,120,29)
```

### desaturate(ratio: number)
* Params:
  * ratio: `Number` - Relative value between [0,1] or (1,100] representing 0-100%
* Returns: `BaseSpace<T>`

This function as the name implies, desaturates the current color space. This is achieved within the library by converting the
color model to [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) (if not already HSL), adjusting the saturation value,
and converting back to the original color space if needed.
```ts
const rgba = RGBA.fromRGBA(200, 128, 75).saturate(25); // rgb(200,128,75) desaturated by 25%
console.log(rgba.toString()); // rgb(185,130,91)
```

### rotate(degrees: number)
* Params:
  * degrees: `Number`
* Returns: `BaseSpace<T>`

This converts the color space to [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) if needed, and rotates the
hue by the specified amount of degrees, normalizes the hue value by clamping it between 0 and 359 degrees, and converts back to the original space if 
needed.
```ts
const rgba = RGBA.fromRGBA(200, 128, 75).rotate(90); // rgb(200,128,75) rotated 90 degrees
console.log(rgba.toString()); // rgb(86,200,76)
```

### mix(color: T, weight?: number)
* Params:
  * color: `T` - The color model data matching the current space. 
  * weight: `Number | undefined` - Absolute value between [0,1] or (1,100] representing 0-100%
    * Default: `0.5`
* Returns: `BaseSpace<T>`

This converts both the color space and mix color to [RGBA](https://en.wikipedia.org/wiki/RGBA_color_model) if
needed, applies the mix color to the base color at the specified weight, and converts back to the original color space
if needed.
```ts
const rgba = RGBA.fromRGBA(200, 128, 75).mix({ red: 255, green: 255, blue: 0, alpha: 1 }, 0.69); // rgb(200,128,75) mixed with rgb(255,255,0) at 69% strength
console.log(rgba.toString()); // rgb(238,216,23)
```

### clone()
* Returns: `BaseSpace<T>`

Returns a cloned copy of the current color space
```ts
const rgba = RGBA.fromRGBA(200, 128, 75);
const cloned = rgba.clone();
console.log(rgba.rotate(90).toString()); // rgb(86,200,76)
console.log(cloned.toString()); // rgb(200,128,75)
```

### grayscale()
* Returns: `BaseSpace<T>`

Applies a grayscale to the current color space using the weighted method (aka luminosity method), resulting in an 
achromatic color. The weighted method _"weighs red, green, and blue according to their wavelengths"_ - [dynamsoft](https://www.dynamsoft.com/blog/insights/image-processing/image-processing-101-color-space-conversion/).
```ts
const rgba = RGBA.fromRGBA(200, 128, 75).grayscale(); // rgb(200,128,75) with applied grayscale
console.log(rgba.toString()); // rgb(143,143,143)
```

### color(color: keyof T)
* Params:
  * color: `keyof T` - A key of a channel within the color space
* Returns: `Number`

Returns the numeric value of a channel specified by key.
```ts
const rgba = RGBA.fromRGBA(200, 128, 75, 0.44);

console.log(rgba.color('red'));      // 200
console.log(rgba.color('green'));    // 128
console.log(rgba.color('blue'));     // 75
console.log(rgba.color('alpha'));    // 0.44
```

### setColor(color: keyof T, value: number)
* Params:
  * color: `keyof T` - A key of a channel within the color space
  * value: `Number`
* Returns: `BaseSpace<T>`

Manually set the value of a channel specified by key.
```ts
const rgba = RGBA.fromRGBA(200, 128, 75);

console.log(rgba.color('red'));             // 200
console.log(rgba.setColor('red', 100));
console.log(rgba.color('red'));             // 100
```

### toSpace(key: ModelType)
* Params:
  * color: [ModelType](#model-type) - The color space conversion target
* Returns: `BaseSpace<T>` - The converted space which is matched the provided key

Converts the existing color space to the specified type. For more examples [see above](#switching-between-spaces). Be 
aware that some conversions can result in loss of accuracy, though is negligible in most non-color sensitive applications.

_When using this method, you must choose a model that does not match the model of the calling space. For example, you
cannot call `toSpace('rgb')` from the `RGBA` space, doing so will result in a `null` return value._

```ts
const rgba: RGBASpace = RGBA.fromCssColor('RebeccaPurple');
const hsl: HSLSpace = rgba.toSpace('hsl');
console.log(hsl.toString()) // hsl(270,50%,40%)
```

### toArray()
* Returns: `Array<Number>`

Returns an array representing the color model.
```ts
const rgba = RGBA.fromRGBA(200, 128, 75);
console.log(rgba.toArray()); // [200,128,75]
```

### toObject()
* Returns: `T` - Color model data object

Returns an object representing the color model.
```ts
const rgba = RGBA.fromRGBA(200, 128, 75);
console.log(rgba.toObject()); // { red: 200, green: 128, blue: 75, alpha: 1 }
```

### toHexString(removeHashtag?: boolean)
* Params:
  * removeHashtag: `Boolean | undefined` - If true, returns value without # prefix
    * Default: `false`
* Returns: `String`

Return the hex color value of the current space. If a true `removeHashtag` value is provided the resulting string
will NOT be prefixed with a #, by default `removeHashtag` is `false`.
```ts
const rgba = RGBA.fromRGBA(200, 128, 75);
console.log(rgba.toHexString());        // #c8804b
console.log(rgba.toHexString(true));    // c8804b
```


### toString()
* Returns: `String`

Each space overrides the native `toString` method returning the valid CSS color value.
```ts
const rgba = RGBA.fromRGBA(200, 128, 75);
console.log(rgba.toString()); // rgb(200,128,75)
```

## RGBA Space
The RGBA Space provides functions for the [RGBA](https://en.wikipedia.org/wiki/RGBA_color_model) color model. The RGBA
extends from [Base Space](#base-color-space) and provides all of its methods, for more information about those methods,
see above.

_The information below is directly related to the RGBA color space. For information about other methods please see the
appropriate section._

### red()
* Returns: `Number`

Return the RGBA color space `red` channel value
```ts
const rgba = RGBA.fromRGBA(200, 128, 75);
console.log(rgba.red()); // 200
```

### green()
* Returns: `Number`

Return the RGBA color space `green` channel value
```ts
const rgba = RGBA.fromRGBA(200, 128, 75);
console.log(rgba.green()); // 128
```

### blue()
* Returns: `Number`

Return the RGBA color space `blue` channel value
```ts
const rgba = RGBA.fromRGBA(200, 128, 75);
console.log(rgba.blue()); // 75
```

### alpha()
* Returns: `Number`

Return the RGBA color space `alpha` channel value
```ts
const rgba = RGBA.fromRGBA(200, 128, 75, 0.69);
console.log(rgba.alpha()); // 0.69
```

### toString(alpha?: boolean)
* Params:
  * alpha: `Boolean | undefined` - If `true` will return an `rgba` value, otherwise will return `rgb` value
    * Default: `false`
* Returns: `String`

The RGBA `toString` method also provides an additional parameter to toggle between `rgb` and `rgba` values.
```ts
const rgba = RGBA.fromRGBA(200, 128, 75, 0.44);
console.log(rgba.toString()); // rgb(200,128,75)
console.log(rgba.toString(true)); // rgba(200,128,75,0.44)
```

## HSL Space
The HSL Space provides functions for the [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) color model. The HSL
extends from [Base Space](#base-color-space) and provides all of its methods, for more information about those methods,
see above.

_The information below is directly related to the HSL color space. For information about other methods please see the
appropriate section._

### hue()
* Returns: `Number`

Return the HSL color space `hue` channel value
```ts
const hsl = HSL.fromHSL(200, 50, 25);
console.log(rgba.hue()); // 200
```

### saturation()
* Returns: `Number`

Return the HSL color space `saturation` channel value
```ts
const hsl = HSL.fromHSL(200, 50, 25);
console.log(rgba.hue()); // 50
```

### lightness()
* Returns: `Number`

Return the HSL color space `lightness` channel value
```ts
const hsl = HSL.fromHSL(200, 50, 25);
console.log(rgba.lightness()); // 25
```

## HSV Space
The HSV Space provides functions for the [HSV](https://en.wikipedia.org/wiki/HSL_and_HSV) color model. The HSV
extends from [Base Space](#base-color-space) and provides all of its methods, for more information about those methods,
see above.

_The information below is directly related to the HSV color space. For information about other methods please see the
appropriate section._

### hue()
* Returns: `Number`

Return the HSV color space `hue` channel value
```ts
const hsv = HSV.fromHSV(200, 50, 25);
console.log(hsv.hue()); // 200
```

### saturation()
* Returns: `Number`

Return the HSV color space `saturation` channel value
```ts
const hsv = HSV.fromHSV(200, 50, 25);
console.log(hsv.saturation()); // 50
```

### value()
* Returns: `Number`

Return the HSV color space `value` channel value
```ts
const hsv = HSL.fromHSV(200, 50, 25);
console.log(hsv.value()); // 25
```
## HWB Space
The HWB Space provides functions for the [HWB](https://en.wikipedia.org/wiki/HWB_color_model) color model. The HWB
extends from [Base Space](#base-color-space) and provides all of its methods, for more information about those methods,
see above.

_The information below is directly related to the HWB color space. For information about other methods please see the
appropriate section._

### hue()
* Returns: `Number`

Return the HWB color space `hue` channel value
```ts
const hsv = HWB.fromHWB(200, 50, 25);
console.log(hsv.hue()); // 200
```

### whiteness()
* Returns: `Number`

Return the HWB color space `whiteness` channel value
```ts
const hsv = HWB.fromHWB(200, 50, 25);
console.log(hsv.saturation()); // 50
```

### blackness()
* Returns: `Number`

Return the HWB color space `blackness` channel value
```ts
const hsv = HSL.fromHWB(200, 50, 25);
console.log(hsv.value()); // 25
```
