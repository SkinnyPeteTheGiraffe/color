import { BaseSpace, ModelType } from '../base';
import {
    convertHslToHwb,
    convertHslToRgb,
    convertHwbToHsl,
    convertRgbToHsl,
} from '../utils';
import { HSLColorSpace } from './types';
import { normalizePercent } from '../../common';
import { RGBASpace } from '../rgba';

/**
 * HSL wrapper which provides mutations and accessor functions for
 * the HSL color space.
 *
 * @public
 */
export class HSLSpace implements BaseSpace<HSLColorSpace> {
    public type: ModelType;
    private readonly space: HSLColorSpace;

    constructor(space: HSLColorSpace) {
        this.type = 'hsl';
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
        ratio = normalizePercent(ratio);
        const hwb = convertHslToHwb(this.space);
        hwb.blackness += hwb.blackness * ratio;
        const hsl = convertHwbToHsl(hwb);
        this.applySpace(hsl);
        return this;
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
     * @remarks
     * The ratio is applied
     * by first multiplying the percent against the current value, and subtracting that
     * result to the lightness value clamping it between [0,1]
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
        return this.adjustRelativeValue('lightness', ratio, false);
    }

    /**
     * Desaturates the HSL color by a relative ratio.
     *
     * @param {number} ratio the ratio to desaturate color
     */
    public desaturate(ratio: number): HSLSpace {
        return this.adjustRelativeValue('saturation', ratio, false);
    }

    /**
     * Converts HSL to grayscale.
     *
     * @remarks This function converts color space to RGBA to preform operation
     */
    public grayscale(): HSLSpace {
        const rgba = this.toRGBA();
        rgba.grayscale();
        const hsl = convertRgbToHsl(rgba.toObject());
        this.applySpace(hsl);
        return this;
    }

    /**
     * Lightens the color space by a relative ratio.
     *
     * @remarks
     * The ratio is applied
     * by first multiplying the percent against the current value, and adding that
     * result to the lightness value clamping it between [0,1]
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
        return this.adjustRelativeValue('lightness', ratio, true);
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
    public mix(color: HSLColorSpace, weight?: number): HSLSpace {
        const hsl = this.toRGBA().mix(convertHslToRgb(color), weight).toHSL();
        this.applySpace(hsl.space);
        return this;
    }

    /**
     * Rotates the hue of the color space by a given number of degrees.
     *
     * @param {number} degrees the number of degrees to rotate the hue channel
     */
    public rotate(degrees: number): HSLSpace {
        this.space.hue = (this.space.hue + degrees) % 360;
        if (this.space.hue < 0) {
            this.space.hue += 360;
        }
        return this;
    }

    /**
     * Saturates the HSL color by a relative ratio.
     *
     * @param {number} ratio the ratio to saturate color
     */
    public saturate(ratio: number): HSLSpace {
        return this.adjustRelativeValue('saturation', ratio, true);
    }

    public setColor(color: keyof HSLColorSpace, value: number): HSLSpace {
        if (color === 'hue') {
            this.space[color] = Math.floor(Math.min(Math.max(value, 0), 360));
        } else {
            this.space[color] = Math.min(Math.max(value, 0), 100);
        }
        return this;
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
        return this.toRGBA().toHexString(removeHashtag);
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
        return `hsl(${Math.floor(this.space.hue)},${Math.floor(
            this.space.saturation
        )}%,${Math.floor(this.space.lightness)}%)`;
    }

    /**
     * Whiten the HSL value by a provided ratio.
     *
     * @remarks This function converts color space to HWB to preform operation
     *
     * @param {number} ratio the ratio to whiten color
     */
    public whiten(ratio: number): HSLSpace {
        ratio = normalizePercent(ratio);
        const hwb = convertHslToHwb(this.space);
        hwb.whiteness += hwb.whiteness * ratio;
        const hsl = convertHwbToHsl(hwb);
        this.applySpace(hsl);
        return this;
    }

    /**
     * Converts this HSL color space to RGBA with an alpha of 100%.
     *
     * @return {RGBASpace} the converted RGBA color space instance
     */
    public toRGBA() {
        return new RGBASpace(convertHslToRgb(this.space));
    }

    /* ---------- PRIVATE FUNCTIONS --------- */

    private applySpace(space: HSLColorSpace) {
        this.space.hue = Math.min(Math.max(Math.floor(space.hue), 0), 360);
        this.space.saturation = Math.min(
            Math.max(Math.floor(space.saturation), 0),
            100
        );
        this.space.lightness = Math.min(
            Math.max(Math.floor(space.lightness), 0),
            100
        );
    }

    private adjustRelativeValue(
        key: keyof Omit<HSLColorSpace, 'hue'>,
        ratio: number,
        increase: boolean
    ) {
        const normalized = normalizePercent(ratio, true);
        this.space[key] += Math.round(
            this.space[key] * normalized * (increase ? 1 : -1)
        );
        /* istanbul ignore next */ // Can't get this to trigger
        if (this.space[key] < 0) this.space[key] = 0;
        if (this.space[key] > 100) this.space[key] = 100;
        return this;
    }
}
