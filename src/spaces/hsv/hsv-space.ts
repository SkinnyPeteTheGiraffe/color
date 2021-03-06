import { normalizePercent } from '../../common/utils/number-tools';
import HSVColorSpace from './types/hsv-color-space';
import hslConverter from '../utils/converter/hsl-converter';
import hwbConverter from '../utils/converter/hwb-converter';
import rgbaConverter from '../utils/converter/rgba-converter';
import hsvConverter from '../utils/converter/hsv-converter';
import {
    adjustHueRelativeValue,
    rotateHue,
    setHueColorSpaceValue,
} from '../utils/hue-utils';
import {
    applyGreyscaleToRGBASpace,
    mixRGBASpaces,
    rgbaSpaceToHexString,
} from '../rgba/rgba-utils';
import AbstractSpace from '../abstract-space';

/**
 * HSV wrapper which provides mutations and accessor functions for
 * the HSV color space.
 *
 * @public
 */
export default class HSVSpace extends AbstractSpace<'hsv', HSVColorSpace> {
    constructor(model: HSVColorSpace) {
        super('hsv', model, hsvConverter);
    }

    /**
     * Retrieves the value of the hue channel for the current color space.
     *
     * @returns {number} the hue channel value of this color space
     */
    public hue(): number {
        return this.model.hue;
    }

    /**
     * Retrieves the value of the saturation channel for the current color space.
     *
     * @returns {number} the saturation channel value of this color space
     */
    public saturation(): number {
        return this.model.saturation;
    }

    /**
     * Retrieves the value of the lightness channel for the current color space.
     *
     * @returns {number} the lightness channel value of this color space
     */
    public value(): number {
        return this.model.value;
    }

    /**
     * Blacken the HSV value by a provided ratio.
     *
     * @remarks This function converts color space to HWB to preform operation
     *
     * @param {number} ratio the ratio to blacken color
     */
    public blacken(ratio: number): HSVSpace {
        const normalized = normalizePercent(ratio);
        const hwb = hsvConverter.toHWB(this.model);
        hwb.blackness += hwb.blackness * normalized;
        const hsv = hwbConverter.toHSV(hwb);
        return this.applyModel(hsv);
    }

    /**
     * Clones the current color space.
     *
     * @return a new cloned instance of the original color space
     */
    public clone(): HSVSpace {
        return new HSVSpace({ ...this.model });
    }

    /**
     * Retrieves a color channel from the HSV color space via key.
     * @example
     * Here's a simple example retrieving each channel
     * ```ts
     * hsl.toString() // hsl(210,100%,50%)
     * hsl.color('hue') // 210
     * hsl.color('saturation') // 100
     * hsl.color('lightness') // 50
     * ```
     * @param color the name of the channel from the current color space to retrieve
     * @returns the value of the channel matching the provided key
     */
    public color(color: keyof HSVColorSpace): number {
        return this.model[color];
    }

    /**
     * Darkens the HSV color space by a relative ratio.
     *
     * @remarks The ratio is applied by first multiplying the percent against the current value, and subtracting that result to the lightness value clamping it between [0,1]
     *
     * @example
     * Here's a simple usage example darkening the color by 20% in the HSV color space:
     * ```ts
     * import { HSV } from 'n-color'
     *
     * const hsl = HSV.fromHex('#646464')
     *
     * color.toString() // hsl(0,0%,39%)
     * color.darken(0).toString() // hsl(0,0%,39%)
     * color.darken(0.2).toString() // hsl(0,0%,27%)
     * ```
     * @param {number} ratio percentage to darken the color by as a value between [0,1], or (1,100]
     */
    public darken(ratio: number): HSVSpace {
        const hsl = hsvConverter.toHSL(this.model);
        const darkened = adjustHueRelativeValue(hsl, 'lightness', ratio, false);
        const hsv = hslConverter.toHSV(darkened);
        return this.applyModel(hsv);
    }

    /**
     * Desaturates the HSV color by a relative ratio.
     *
     * @param {number} ratio the ratio to desaturate color
     */
    public desaturate(ratio: number): HSVSpace {
        const desaturated = adjustHueRelativeValue(
            this.model,
            'saturation',
            ratio,
            false
        );
        return this.applyModel(desaturated);
    }

    /**
     * Converts HSV to grayscale.
     *
     * @remarks This function converts color space to RGBA to preform operation
     */
    public grayscale(): HSVSpace {
        const greyscale = applyGreyscaleToRGBASpace(
            hsvConverter.toRGBA(this.model)
        );
        const hsv = rgbaConverter.toHSV(greyscale);
        return this.applyModel(hsv);
    }

    /**
     * Lightens the color space by a relative ratio.
     *
     * @remarks The ratio is applied by first multiplying the percent against the current value, and adding that result to the lightness value clamping it between [0,1]
     *
     * @example
     * Here's a simple usage example lightening the color by 20% using the HSV color space:
     * ```ts
     * import { HSV } from 'n-color'
     *
     * const hsl = HSV.fromHex('#c8804b')
     * hsl.toString() // hsl(25,53%,54%)
     * hsl.lighten(0).toString() // hsl(25,53%,54%)
     * hsl.lighten(20).toString() // hsl(25,53%,65%)
     * ```
     *
     * @param {number} ratio a value between [0,1] or (1,100] as the ratio to adjust the lightness of the color space
     */
    public lighten(ratio: number): HSVSpace {
        const hsl = hsvConverter.toHSL(this.model);
        const lightened = adjustHueRelativeValue(hsl, 'lightness', ratio, true);
        const hsv = hslConverter.toHSV(lightened);
        return this.applyModel(hsv);
    }

    /**
     * Mixes this color with the provided HSV color value by the specified weight.
     *
     * @remarks This function is directly ported from the SASS mix method: https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
     * @remarks This function converts the color space to {@link RGBASpace} to preform operations
     *
     * @param color the HSV color to mix into the current instance
     * @param weight the weight in which the color should be mixed
     */
    public mix(color: HSVColorSpace, weight = 0.5): HSVSpace {
        const rgba = hsvConverter.toRGBA(this.model);
        const mixed = mixRGBASpaces(rgba, hsvConverter.toRGBA(color), weight);
        const hsv = rgbaConverter.toHSV(mixed);
        return this.applyModel(hsv);
    }

    /**
     * Rotates the hue of the color space by a given number of degrees.
     *
     * @param {number} degrees the number of degrees to rotate the hue channel
     */
    public rotate(degrees: number): HSVSpace {
        this.model.hue = rotateHue(this.model.hue, degrees);
        return this;
    }

    /**
     * Saturates the HSV color by a relative ratio.
     *
     * @param {number} ratio the ratio to saturate color
     */
    public saturate(ratio: number): HSVSpace {
        const hsl = hsvConverter.toHSL(this.model);
        const adjusted = adjustHueRelativeValue(hsl, 'saturation', ratio, true);
        const hsv = hslConverter.toHSV(adjusted);
        return this.applyModel(hsv);
    }

    public setColor(color: keyof HSVColorSpace, value: number): HSVSpace {
        const adjusted = setHueColorSpaceValue(this.model, color, value);
        return this.applyModel(adjusted);
    }

    /**
     * Retrieves an array representing the HSV color space containing the primary colors.
     *
     * @remarks  Array index is ordered logically [HSV]
     *
     * @return {[number, number, number]} the HSV color space values as an array
     */
    public toArray(): [number, number, number] {
        return [this.model.hue, this.model.saturation, this.model.value];
    }

    /**
     * Returns a hex string representing the RGB color space. This ignores any
     * alpha values.<br/><br/>
     * Example
     * ```ts
     * color.toString() // hsl(25,40%,54%)
     * color.toHexString() // #b9825b
     * color.toHexString(true) // b9825b
     * ```
     * @param {boolean} removeHashtag will return the hex value without a hashtag if true, otherwise will return with hashtag
     */
    public toHexString(removeHashtag?: boolean): string {
        return rgbaSpaceToHexString(
            hsvConverter.toRGBA(this.model),
            removeHashtag
        );
    }

    /**
     * Retrieves an object representing the RGBA color space containing the primary colors and alpha
     * values.
     *
     * @return {HSVColorSpace} the HSV color space values
     */
    public toObject(): HSVColorSpace {
        return { ...this.model };
    }

    /**
     * Prints valid CSS string value.
     *
     * @example
     * Here's a simple usage example:
     * ```ts
     * color.toString() // hsl(25,40%,54%)
     * ```
     *
     * @return {string} valid CSS color value.
     */
    public toString(): string {
        return `hsv(${parseFloat(this.model.hue.toFixed(1))},${parseFloat(
            this.model.saturation.toFixed(1)
        )}%,${parseFloat(this.model.value.toFixed(1))}%)`;
    }

    /**
     * Whiten the HSV value by a provided ratio.
     *
     * @remarks This function converts color space to HWB to preform operation
     *
     * @param {number} ratio the ratio to whiten color
     */
    public whiten(ratio: number): HSVSpace {
        const normalized = normalizePercent(ratio);
        const hwb = hsvConverter.toHWB(this.model);
        hwb.whiteness += hwb.whiteness * normalized;
        const hsv = hwbConverter.toHSV(hwb);
        this.applyModel(hsv);
        return this;
    }
    /* ---------- PRIVATE FUNCTIONS --------- */

    public applyModel(space: HSVColorSpace): HSVSpace {
        this.model.hue = Math.min(Math.max(Math.floor(space.hue), 0), 360);
        this.model.saturation = Math.min(
            Math.max(Math.floor(space.saturation), 0),
            100
        );
        this.model.value = Math.min(Math.max(Math.floor(space.value), 0), 100);
        return this;
    }
}
