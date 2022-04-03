import { BaseSpace } from '../base';
import HSLColorSpace from './types/hsl-color-space';
import { normalizePercent } from '../../common/utils/number-tools';
import hslConverter from '../utils/converter/hsl-converter';
import hwbConverter from '../utils/converter/hwb-converter';
import rgbaConverter from '../utils/converter/rgba-converter';
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

/**
 * HSL wrapper which provides mutations and accessor functions for
 * the HSL color space.
 *
 * @public
 */
export default class HSLSpace implements BaseSpace<HSLColorSpace> {
    protected readonly space: HSLColorSpace;

    constructor(space: HSLColorSpace) {
        this.space = space;
    }

    /**
     * Retrieves the value of the hue channel for the current color space.
     *
     * @returns {number} the hue channel value of this color space
     */
    public hue(): number {
        return this.space.hue;
    }

    /**
     * Retrieves the value of the saturation channel for the current color space.
     *
     * @returns {number} the saturation channel value of this color space
     */
    public saturation(): number {
        return this.space.saturation;
    }

    /**
     * Retrieves the value of the lightness channel for the current color space.
     *
     * @returns {number} the lightness channel value of this color space
     */
    public lightness(): number {
        return this.space.lightness;
    }

    /**
     * Blacken the HSL value by a provided ratio.
     *
     * @remarks This function converts color space to HWB to preform operation
     *
     * @param {number} ratio the ratio to blacken color
     */
    public blacken(ratio: number): HSLSpace {
        const normalized = normalizePercent(ratio);
        const hwb = hslConverter.toHWB(this.space);
        hwb.blackness += hwb.blackness * normalized;
        const hsl = hwbConverter.toHSL(hwb);
        return this.applySpace(hsl);
    }

    /**
     * Clones the current color space.
     *
     * @return a new cloned instance of the original color space
     */
    public clone(): HSLSpace {
        return new HSLSpace({ ...this.space });
    }

    /**
     * Retrieves a color channel from the HSL color space via key.
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
    public color(color: keyof HSLColorSpace): number {
        return this.space[color];
    }

    /**
     * Darkens the HSL color space by a relative ratio.
     *
     * @remarks The ratio is applied by first multiplying the percent against the current value, and subtracting that result to the lightness value clamping it between [0,1]
     *
     * @example
     * Here's a simple usage example darkening the color by 20% in the HSL color space:
     * ```ts
     * import { HSL } from 'n-color'
     *
     * const hsl = HSL.fromHex('#646464')
     *
     * color.toString() // hsl(0,0%,39%)
     * color.darken(0).toString() // hsl(0,0%,39%)
     * color.darken(0.2).toString() // hsl(0,0%,27%)
     * ```
     * @param {number} ratio percentage to darken the color by as a value between [0,1], or (1,100]
     */
    public darken(ratio: number): HSLSpace {
        const darkened = adjustHueRelativeValue(
            this.space,
            'lightness',
            ratio,
            false
        );
        return this.applySpace(darkened);
    }

    /**
     * Desaturates the HSL color by a relative ratio.
     *
     * @param {number} ratio the ratio to desaturate color
     */
    public desaturate(ratio: number): HSLSpace {
        const desaturated = adjustHueRelativeValue(
            this.space,
            'saturation',
            ratio,
            false
        );
        return this.applySpace(desaturated);
    }

    /**
     * Converts HSL to grayscale.
     *
     * @remarks This function converts color space to RGBA to preform operation
     */
    public grayscale(): HSLSpace {
        const greyscale = applyGreyscaleToRGBASpace(
            hslConverter.toRGBA(this.space)
        );
        const hsl = rgbaConverter.toHSL(greyscale);
        return this.applySpace(hsl);
    }

    /**
     * Lightens the color space by a relative ratio.
     *
     * @remarks The ratio is applied by first multiplying the percent against the current value, and adding that result to the lightness value clamping it between [0,1]
     *
     * @example
     * Here's a simple usage example lightening the color by 20% using the HSL color space:
     * ```ts
     * import { HSL } from 'n-color'
     *
     * const hsl = HSL.fromHex('#c8804b')
     * hsl.toString() // hsl(25,53%,54%)
     * hsl.lighten(0).toString() // hsl(25,53%,54%)
     * hsl.lighten(20).toString() // hsl(25,53%,65%)
     * ```
     *
     * @param {number} ratio a value between [0,1] or (1,100] as the ratio to adjust the lightness of the color space
     */
    public lighten(ratio: number): HSLSpace {
        const lightened = adjustHueRelativeValue(
            this.space,
            'lightness',
            ratio,
            true
        );
        return this.applySpace(lightened);
    }

    /**
     * Mixes this color with the provided HSL color value by the specified weight.
     *
     * @remarks This function is directly ported from the SASS mix method: https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
     * @remarks This function converts the color space to {@link RGBASpace} to preform operations
     *
     * @param color the HSL color to mix into the current instance
     * @param weight the weight in which the color should be mixed
     */
    public mix(color: HSLColorSpace, weight = 0.5): HSLSpace {
        const rgba = hslConverter.toRGBA(this.space);
        const mixed = mixRGBASpaces(rgba, hslConverter.toRGBA(color), weight);
        const hsl = rgbaConverter.toHSL(mixed);
        return this.applySpace(hsl);
    }

    /**
     * Rotates the hue of the color space by a given number of degrees.
     *
     * @param {number} degrees the number of degrees to rotate the hue channel
     */
    public rotate(degrees: number): HSLSpace {
        this.space.hue = rotateHue(this.space.hue, degrees);
        return this;
    }

    /**
     * Saturates the HSL color by a relative ratio.
     *
     * @param {number} ratio the ratio to saturate color
     */
    public saturate(ratio: number): HSLSpace {
        const adjusted = adjustHueRelativeValue(
            this.space,
            'saturation',
            ratio,
            true
        );
        return this.applySpace(adjusted);
    }

    public setColor(color: keyof HSLColorSpace, value: number): HSLSpace {
        const adjusted = setHueColorSpaceValue(this.space, color, value);
        return this.applySpace(adjusted);
    }

    /**
     * Retrieves an array representing the HSL color space containing the primary colors.
     *
     * @remarks  Array index is ordered logically [HSL]
     *
     * @return {[number, number, number]} the HSL color space values as an array
     */
    public toArray(): [number, number, number] {
        return [this.space.hue, this.space.saturation, this.space.lightness];
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
            hslConverter.toRGBA(this.space),
            removeHashtag
        );
    }

    /**
     * Retrieves an object representing the RGBA color space containing the primary colors and alpha
     * values.
     *
     * @return {HSLColorSpace} the HSL color space values
     */
    public toObject(): HSLColorSpace {
        return { ...this.space };
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
        return `hsl(${parseFloat(this.space.hue.toFixed(1))},${parseFloat(
            this.space.saturation.toFixed(1)
        )}%,${parseFloat(this.space.lightness.toFixed(1))}%)`;
    }

    /**
     * Whiten the HSL value by a provided ratio.
     *
     * @remarks This function converts color space to HWB to preform operation
     *
     * @param {number} ratio the ratio to whiten color
     */
    public whiten(ratio: number): HSLSpace {
        const normalized = normalizePercent(ratio);
        const hwb = hslConverter.toHWB(this.space);
        hwb.whiteness += hwb.whiteness * normalized;
        const hsl = hwbConverter.toHSL(hwb);
        this.applySpace(hsl);
        return this;
    }

    /* ---------- PRIVATE FUNCTIONS --------- */

    private applySpace(space: HSLColorSpace): HSLSpace {
        this.space.hue = Math.min(Math.max(Math.floor(space.hue), 0), 360);
        this.space.saturation = Math.min(
            Math.max(Math.floor(space.saturation), 0),
            100
        );
        this.space.lightness = Math.min(
            Math.max(Math.floor(space.lightness), 0),
            100
        );
        return this;
    }
}
