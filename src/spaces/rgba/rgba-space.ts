import { BaseSpace, ModelType } from '../base';
import RGBAColorSpace from './types/rgba-color-space';
import HSLColorSpace from '../hsl/types/hsl-color-space';
import { normalizePercent } from '../../common/utils/number-tools';
import hslConverter from '../utils/converter/hsl-converter';
import hwbConverter from '../utils/converter/hwb-converter';
import rgbaConverter from '../utils/converter/rgba-converter';
import { adjustHueRelativeValue, rotateHue } from '../utils/hue-utils';
import {
    applyGreyscaleToRGBASpace,
    mixRGBASpaces,
    rgbaSpaceToHexString,
} from './rgba-utils';

/**
 * RGBA wrapper which provides mutations and accessor functions for
 * the RGBA color space.
 *
 * @public
 */
export default class RGBASpace implements BaseSpace<RGBAColorSpace> {
    public type: ModelType;

    protected readonly space: RGBAColorSpace;

    constructor(space: RGBAColorSpace) {
        this.type = 'rgb';
        this.space = space;
    }

    /**
     * Retrieves the value of the red channel for the current color space.
     *
     * @returns {number} the red channel value of this color space
     */
    public red(): number {
        return this.space.red;
    }

    /**
     * Retrieves the value of the green channel for the current color space.
     *
     * @returns {number} the green channel value of this color space
     */
    public green(): number {
        return this.space.green;
    }

    /**
     * Retrieves the value of the alpha channel for the current color space.
     *
     * @returns {number} the alpha channel value of this color space
     */
    public alpha(): number {
        return this.space.alpha;
    }

    /**
     * Retrieves the value of the blue channel for the current color space.
     *
     * @returns {number} the blue channel value of this color space
     */
    public blue(): number {
        return this.space.blue;
    }

    /**
     * Retrieves a color channel from the RGBA color space via key.
     * @example
     * Here's a simple example retrieving each channel
     * ```ts
     * rgb.toString() // rgb(0,128,255)
     * rgb.color('red') // 0
     * rgb.color('green') // 128
     * rgb.color('blue') // 255
     * ```
     * @param color the name of the channel from the current color space to retrieve
     * @returns the value of the channel matching the provided key
     */
    public color(color: keyof RGBAColorSpace): number {
        return this.space[color];
    }

    /**
     * Sets value of the color space channel matching the provided key.
     * @example
     * Here's a simple example setting a value for each channel:
     *```ts
     * rgb.setColor('red', 0)
     * rgb.setColor('green', 128)
     * rgb.setColor('blue', 255)
     * rgb.toString() // rgb(0,128,255)
     * ```
     * @param color the name of the channel from the current color space to set new value
     * @param value the value for the specified color channel
     */
    public setColor(color: keyof RGBAColorSpace, value: number): RGBASpace {
        if (color !== 'alpha') {
            this.space[color] = Math.floor(Math.min(Math.max(value, 0), 255));
        } else {
            this.space[color] = Math.min(Math.max(value, 0), 1);
        }
        return this;
    }

    /**
     * Clones the current color space.
     *
     * @return {@link RGBASpace} a new cloned instance of the original color space
     */
    public clone(): RGBASpace {
        return new RGBASpace({ ...this.space });
    }

    /**
     * Lightens the color space by a relative ratio.
     *
     * @remarks
     * To lighten the color space this function converts the space to HSL, in which the `lightness` value by a relative
     * ratio, after which is converted back to the original color space.
     * @remarks
     * The ratio is applied
     * by first multiplying the percent against the current value, and adding that
     * result to the lightness value clamping it between [0,1]
     *
     * @param {number} ratio a value between [0,1] or (1,100] as the ratio to adjust the lightness of the color space
     *
     *
     * @example
     * Here's a simple usage example lightening the color by 20% using the RGBA color space:
     * ```ts
     *
     * import { RGBA } from 'n-color'
     *
     * const rgba = RGBA.fromHex('#b9825b')
     * rgba.toString() // rgb(200,128,75)
     * rgba.lighten(0).toString() // rgb(200,128,75)
     * rgba.lighten(20).toString() // rgb(213,157,118)
     * ```
     */
    public lighten(ratio: number): RGBASpace {
        const lightened = adjustHueRelativeValue(
            this.toHSLColorSpace(),
            'lightness',
            ratio,
            true
        );
        const rgba = hslConverter.toRGBA(lightened);
        return this.applySpace(rgba);
    }

    /**
     * Darkens the RGB color space by a relative ratio.
     *
     * @remarks
     * To lighten the color, this
     * function converts the RGB color to HSL color space, adjusts the lightness
     * attribute, and converts back to the RGB color space.
     *
     * @remarks
     * The ratio is applied
     * by first multiplying the percent against the current value, and subtracting that
     * result to the lightness value clamping it between [0,1]
     *
     * @example
     * Here's a simple usage example darkening the color by 20%:
     * ```ts
     * color.toString() // rgb(100,100,100)
     * color.darken(0).toString() // rgb(100,100,100)
     * color.darken(0.2).toString() // rgb(69,69,69)
     * ```
     * @param {number} ratio percentage to darken the color by as a value between [0,1], or (1,100]
     */
    public darken(ratio: number): RGBASpace {
        const darkened = adjustHueRelativeValue(
            this.toHSLColorSpace(),
            'lightness',
            ratio,
            false
        );
        const rgba = hslConverter.toRGBA(darkened);
        return this.applySpace(rgba);
    }

    /**
     * Whiten the RBG value by a relative ratio. This function converts the RGB
     * color space to HWB, adds whiteness value, and converts back to RGB.
     *
     * @param {number} ratio value between 0 - 1 or 1 - 100 representing a relative percent in which to whiten the color
     */
    public whiten(ratio: number): RGBASpace {
        const hwb = rgbaConverter.toHWB(this.space);
        const value = hwb.whiteness * normalizePercent(ratio);
        hwb.whiteness += value;
        const rgb = hwbConverter.toRGBA(hwb);
        this.applySpace(rgb);
        return this;
    }

    /**
     * Blackens the RBG value by a relative ratio. This function converts the RGB
     * color space to HWB, adds blackness value, and converts back to RGB.
     *
     * @param {number} ratio value between 0 - 1 or 1 - 100 representing a relative percent in which to blacken the color
     */
    public blacken(ratio: number): RGBASpace {
        const hwb = rgbaConverter.toHWB(this.space);
        const value = hwb.blackness * normalizePercent(ratio);
        hwb.blackness += value;
        const rgb = hwbConverter.toRGBA(hwb);
        this.applySpace(rgb);
        return this;
    }

    /**
     * Converts RGB color channels to grayscale using a weighted YUV conversion.
     */
    public grayscale(): RGBASpace {
        const greyscale = applyGreyscaleToRGBASpace(this.space);
        return this.applySpace(greyscale);
    }

    /**
     * Saturates the RGB color by a relative ratio.
     *
     * @remarks This function converts the color space to HSL to preform operation
     *
     * @param {number} ratio the ratio to saturate color
     */
    public saturate(ratio: number): RGBASpace {
        const saturated = adjustHueRelativeValue(
            this.toHSLColorSpace(),
            'saturation',
            ratio,
            true
        );
        const rgba = hslConverter.toRGBA(saturated);
        return this.applySpace(rgba);
    }

    /**
     * Desaturates the RGB color by a relative ratio. The color is desaturated by
     * converting the value to HSL, adjusting the saturation, and converting
     * back to RGB.
     *
     * @param {number} ratio the relative ratio to saturate the color
     */
    public desaturate(ratio: number): RGBASpace {
        const desaturated = adjustHueRelativeValue(
            this.toHSLColorSpace(),
            'saturation',
            ratio,
            false
        );
        const rgba = hslConverter.toRGBA(desaturated);
        return this.applySpace(rgba);
    }

    /**
     * Reduce the RGBA color space alpha value by a relative ratio.
     *
     * @param {number} ratio the ratio in which to reduce the alpha channel value
     */
    public fade(ratio: number): RGBASpace {
        const normalized = normalizePercent(ratio);
        this.space.alpha -= this.alpha() * normalized;
        return this;
    }

    /**
     * Increase the RGBA color space alpha value by a relative ratio.
     *
     * @param {number} ratio the ratio in which to increase the alpha channel value
     */
    public fill(ratio: number): RGBASpace {
        const normalized = normalizePercent(ratio);
        this.space.alpha += this.alpha() * normalized;
        return this;
    }

    /**
     * Rotates the hue of the color space by a given number of degrees.
     *
     * @remarks Converts the color space to HSL, where the hue is represented as degrees; having a value between [0,360].
     *
     * @param {number} degrees the number of degrees to rotate the hue channel
     */
    public rotate(degrees: number): RGBASpace {
        const hsl = this.toHSLColorSpace();
        hsl.hue = rotateHue(hsl.hue, degrees);
        const rgba = hslConverter.toRGBA(hsl);
        this.applySpace(rgba);
        return this;
    }

    /**
     * Mixes this color with the provided RGBA color value by the specified weight.
     *
     * @remarks This function is directly ported from the SASS mix method: https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
     *
     * @param color the RGBA color to mix into the current instance
     * @param weight the weight in which the color should be mixed
     */
    public mix(color: RGBAColorSpace, weight = 0.5): RGBASpace {
        const mixed = mixRGBASpaces(this.space, color, weight);
        return this.applySpace(mixed);
    }

    /**
     * Adjusts the opacity of the {@link RGBASpace} instance. This value
     * is limited between 0 and 1, and also between 1 and 100. Values between 0
     * and 1 are compared first, after which values between 1 and 100 are compared,
     * This value is clamped.
     *
     * @param percent the percent of opacity to set (0-1 or 1-100)
     */
    public setOpacity(percent: number): RGBASpace {
        this.space.alpha = normalizePercent(percent);
        return this;
    }

    /**
     * Returns a hex string representing the RGB color space. This ignores any
     * alpha values.<br/><br/>
     * Example
     * ```ts
     * color.toString() // rgb(185,130,91)
     * color.toHexString() // #b9825b
     * color.toHexString(true) // b9825b
     * ```
     * @param {boolean} removeHashtag will return the hex value without a hashtag if true, otherwise will return with hashtag
     */
    public toHexString(removeHashtag?: boolean): string {
        return rgbaSpaceToHexString(this.space, removeHashtag);
    }

    /**
     * Retrieves an array representing the RGBA color space containing the primary colors and alpha
     * values. Array index is ordered logically [RGBA].
     *
     * @return {[number, number, number, number]} the RGBA color space values as an array
     */
    public toArray(): [number, number, number, number] {
        return [this.red(), this.green(), this.blue(), this.alpha()];
    }

    /**
     * Retrieves an object representing the RGBA color space containing the primary colors and alpha
     * values.
     *
     * @return {RGBAColorSpace} the RGBA color space values
     */
    public toObject(): RGBAColorSpace {
        return this.space;
    }

    public toString(alpha?: boolean): string {
        return alpha
            ? `rgba(${this.space.red},${this.space.green},${this.space.blue},${this.space.alpha})`
            : `rgb(${this.space.red},${this.space.green},${this.space.blue})`;
    }

    public toHSLColorSpace(): HSLColorSpace {
        return rgbaConverter.toHSL(this.space);
    }

    private applySpace(space: RGBAColorSpace): RGBASpace {
        this.space.red = space.red;
        this.space.green = space.green;
        this.space.blue = space.blue;
        this.space.alpha = space.alpha;
        return this;
    }
}
