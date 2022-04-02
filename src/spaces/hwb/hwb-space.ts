import { BaseSpace, ModelType } from '../base';
import {
    adjustHueRelativeValue,
    hslConverter,
    hwbConverter,
    rgbaConverter,
    rotateHue,
    setHueColorSpaceValue,
} from '../utils';
import RGBAColorSpace from '../rgba/types/rgba-color-space';
import {
    applyGreyscaleToRGBASpace,
    mixRGBASpaces,
    rgbaSpaceToHexString,
} from '../rgba/rgba-utils';
import { HWBColorSpace } from './types';

/**
 * HWB wrapper which provides mutations and accessor functions for
 * the HWB color space.
 *
 * @public
 */
export default class HWBSpace implements BaseSpace<HWBColorSpace> {
    public type: ModelType;

    private readonly space: HWBColorSpace;

    constructor(space: HWBColorSpace) {
        this.type = 'hwb';
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
     * Retrieves the value of the whiteness channel for the current color space.
     *
     * @returns {number} the whiteness channel value of this color space
     */
    public whiteness(): number {
        return this.space.whiteness;
    }

    /**
     * Retrieves the value of the blackness channel for the current color space.
     *
     * @returns {number} the blackness channel value of this color space
     */
    public blackness(): number {
        return this.space.blackness;
    }

    /**
     * Blacken the HWB value by a provided ratio.
     *
     * @remarks This function converts color space to HWB to preform operation
     *
     * @param {number} ratio the ratio to blacken color
     */
    public blacken(ratio: number): HWBSpace {
        const blackened = adjustHueRelativeValue(
            this.space,
            'blackness',
            ratio,
            true
        );
        return this.applySpace(blackened);
    }

    /**
     * Clones the current color space.
     *
     * @return a new cloned instance of the original color space
     */
    public clone(): HWBSpace {
        return new HWBSpace({ ...this.space });
    }

    /**
     * Retrieves a color channel from the HWB color space via key.
     * @example
     * Here's a simple example retrieving each channel
     * ```ts
     * hwb.toString() // hwb(210,100%,50%)
     * hwb.color('hue') // 210
     * hwb.color('saturation') // 100
     * hwb.color('lightness') // 50
     * ```
     * @param color the name of the channel from the current color space to retrieve
     * @returns the value of the channel matching the provided key
     */
    public color(color: keyof HWBColorSpace): number {
        return this.space[color];
    }

    /**
     * Darkens the HWB color space by a relative ratio.
     *
     * @remarks The ratio is applied by first multiplying the percent against the current value, and subtracting that result to the lightness value clamping it between [0,1]
     *
     * @example
     * Here's a simple usage example darkening the color by 20% in the HWB color space:
     * ```ts
     * import { HWB } from 'n-color'
     *
     * const hwb = HWB.fromHex('#646464')
     *
     * color.toString() // hwb(0,0%,39%)
     * color.darken(0).toString() // hwb(0,0%,39%)
     * color.darken(0.2).toString() // hwb(0,0%,27%)
     * ```
     * @param {number} ratio percentage to darken the color by as a value between [0,1], or (1,100]
     */
    public darken(ratio: number): HWBSpace {
        const hsl = hwbConverter.toHSL(this.space);
        const darkened = adjustHueRelativeValue(hsl, 'lightness', ratio, false);
        const hwb = hslConverter.toHWB(darkened);
        return this.applySpace(hwb);
    }

    /**
     * Desaturates the HWB color by a relative ratio.
     *
     * @param {number} ratio the ratio to desaturate color
     */
    public desaturate(ratio: number): HWBSpace {
        const hsl = hwbConverter.toHSL(this.space);
        const desaturated = adjustHueRelativeValue(
            hsl,
            'saturation',
            ratio,
            false
        );
        const hwb = hslConverter.toHWB(desaturated);
        return this.applySpace(hwb);
    }

    /**
     * Converts HWB to grayscale.
     *
     * @remarks This function converts color space to RGBA to preform operation
     */
    public grayscale(): HWBSpace {
        const greyscale = applyGreyscaleToRGBASpace(this.toRGBAColorSpace());
        const hwb = rgbaConverter.toHWB(greyscale);
        return this.applySpace(hwb);
    }

    /**
     * Lightens the color space by a relative ratio.
     *
     * @remarks The ratio is applied by first multiplying the percent against the current value, and adding that result to the lightness value clamping it between [0,1]
     *
     * @example
     * Here's a simple usage example lightening the color by 20% using the HWB color space:
     * ```ts
     * import { HWB } from 'n-color'
     *
     * const hwb = HWB.fromHex('#c8804b')
     * hwb.toString() // hwb(25,53%,54%)
     * hwb.lighten(0).toString() // hwb(25,53%,54%)
     * hwb.lighten(20).toString() // hwb(25,53%,65%)
     * ```
     *
     * @param {number} ratio a value between [0,1] or (1,100] as the ratio to adjust the lightness of the color space
     */
    public lighten(ratio: number): HWBSpace {
        const hsl = hwbConverter.toHSL(this.space);
        const lightened = adjustHueRelativeValue(hsl, 'lightness', ratio, true);
        const hwb = hslConverter.toHWB(lightened);
        return this.applySpace(hwb);
    }

    /**
     * Mixes this color with the provided HWB color value by the specified weight.
     *
     * @remarks This function is directly ported from the SASS mix method: https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
     * @remarks This function converts the color space to {@link RGBASpace} to preform operations
     *
     * @param color the HWB color to mix into the current instance
     * @param weight the weight in which the color should be mixed
     */
    public mix(color: HWBColorSpace, weight = 0.5): HWBSpace {
        const rgba = this.toRGBAColorSpace();
        const mixed = mixRGBASpaces(rgba, hwbConverter.toRGBA(color), weight);
        const hwb = rgbaConverter.toHWB(mixed);
        return this.applySpace(hwb);
    }

    /**
     * Rotates the hue of the color space by a given number of degrees.
     *
     * @param {number} degrees the number of degrees to rotate the hue channel
     */
    public rotate(degrees: number): HWBSpace {
        this.space.hue = rotateHue(this.space.hue, degrees);
        return this;
    }

    /**
     * Saturates the HWB color by a relative ratio.
     *
     * @param {number} ratio the ratio to saturate color
     */
    public saturate(ratio: number): HWBSpace {
        const hsl = hwbConverter.toHSL(this.space);
        const adjusted = adjustHueRelativeValue(hsl, 'saturation', ratio, true);
        const hwb = hslConverter.toHWB(adjusted);
        return this.applySpace(hwb);
    }

    public setColor(color: keyof HWBColorSpace, value: number): HWBSpace {
        const adjusted = setHueColorSpaceValue(this.space, color, value);
        return this.applySpace(adjusted);
    }

    /**
     * Retrieves an array representing the HWB color space containing the primary colors.
     *
     * @remarks  Array index is ordered logically [HWB]
     *
     * @return {[number, number, number]} the HWB color space values as an array
     */
    public toArray(): [number, number, number] {
        return [this.space.hue, this.space.whiteness, this.space.blackness];
    }

    /**
     * Returns a hex string representing the RGB color space. This ignores any
     * alpha values.<br/><br/>
     * Example
     * ```ts
     * color.toString() // hwb(25,40%,54%)
     * color.toHexString() // #b9825b
     * color.toHexString(true) // b9825b
     * ```
     * @param {boolean} removeHashtag will return the hex value without a hashtag if true, otherwise will return with hashtag
     */
    public toHexString(removeHashtag?: boolean): string {
        return rgbaSpaceToHexString(this.toRGBAColorSpace(), removeHashtag);
    }

    /**
     * Retrieves an object representing the RGBA color space containing the primary colors and alpha
     * values.
     *
     * @return {HSLColorSpace} the HWB color space values
     */
    public toObject(): HWBColorSpace {
        return { ...this.space };
    }

    /**
     * Prints valid CSS string value.
     *
     * @example
     * Here's a simple usage example:
     * ```ts
     * color.toString() // hwb(25,40%,54%)
     * ```
     *
     * @return {string} valid CSS color value.
     */
    public toString(): string {
        return `hwb(${Math.round(this.space.hue)},${Math.round(
            this.space.whiteness
        )}%,${Math.round(this.space.blackness)}%)`;
    }

    /**
     * Whiten the HWB value by a provided ratio.
     *
     * @remarks This function converts color space to HWB to preform operation
     *
     * @param {number} ratio the ratio to whiten color
     */
    public whiten(ratio: number): HWBSpace {
        const whitened = adjustHueRelativeValue(
            this.space,
            'whiteness',
            ratio,
            true
        );
        return this.applySpace(whitened);
    }

    /**
     * Converts this HWB color space to RGBA with an alpha of 100%.
     *
     * @return {RGBAColorSpace} the converted RGBA color space instance
     */
    public toRGBAColorSpace(): RGBAColorSpace {
        return hwbConverter.toRGBA(this.space);
    }

    /* ---------- PRIVATE FUNCTIONS --------- */

    private applySpace(space: HWBColorSpace): HWBSpace {
        this.space.hue = Math.min(Math.max(Math.floor(space.hue), 0), 360);
        this.space.whiteness = Math.min(
            Math.max(Math.floor(space.whiteness), 0),
            100
        );
        this.space.blackness = Math.min(
            Math.max(Math.floor(space.blackness), 0),
            100
        );
        return this;
    }
}
