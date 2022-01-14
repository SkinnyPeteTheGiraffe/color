import { BaseSpace, ModelType } from '../base';
import { RGBAColorSpace } from './types';
import { normalizePercent } from '../../common';
import { convertHslToRgb, convertRgbToHsl } from '../utils';
import { HSLColorSpace } from '../hsl';

/**
 * RGBA wrapper which provides mutations and accessor functions for
 * the RGBA color space.
 *
 * @implements BaseSpace<RGBAColorSpace>
 */
export class RGBA implements BaseSpace<RGBAColorSpace> {
    public type: ModelType;
    private readonly space: RGBAColorSpace;

    constructor(space: RGBAColorSpace) {
        this.type = 'rgb';
        this.space = space;
    }

    /**
     * Retrieves the red value of the RGB color.
     *
     * @return {number} the red value of the RGB color
     */
    public red(): number {
        return this.space.red;
    }

    /**
     * Retrieves the green value of the RGB color.
     *
     * @return {number} the green value of the RGB color
     */
    public green(): number {
        return this.space.green;
    }

    /**
     * Retrieves the alpha value of the RGBA color.
     *
     * @return {number} the alpha value of the RGBA color
     */
    public alpha(): number {
        return this.space.alpha;
    }

    /**
     * Retrieves the blue value of the RGB color.
     *
     * @return {number} the blue value of the RGB color
     */
    public blue(): number {
        return this.space.blue;
    }

    public color(color: keyof RGBAColorSpace): number {
        return this.space[color];
    }

    public setColor(color: keyof RGBAColorSpace, value: number): RGBA {
        this.space[color] = Math.floor(Math.min(Math.max(value, 0), 255));
        return this;
    }

    public clone(): RGBA {
        return new RGBA({ ...this.space });
    }

    /**
     * Lightens the RGB color by a relative ratio. To lighten the color, this
     * function converts the RGB color to HSL color space, adjusts the lightness
     * attribute, and converts back to the RGB color space. The ratio is applied
     * by first multiplying the percent against the current value, and adding that
     * result to the lightness value clamping it between [0,1]
     *
     * @param {number} ratio value between 0 - 1 or 1 - 100 representing a relative percent in which to lighten the color
     */
    public lighten(ratio: number): RGBA {
        return this.adjustRelativeValue('lightness', ratio, true);
    }

    /**
     * Darkens the RGB color by a relative ratio. The ratio is relative of the
     * value of each primary color.
     *
     * Example:
     * ```ts
     * color.toString() // rgb(100,100,100)
     * color.darken(0).toString() // rgb(100,100,100)
     * color.darken(0.2).toString() // rgb(69,69,69)
     * ```
     * @param {number} ratio value between 0 - 1 or 1 - 100 representing a relative percent in which to lighten the color
     */
    public darken(ratio: number): RGBA {
        return this.adjustRelativeValue('lightness', ratio, false);
    }

    /**
     * Saturates the RGB color by a relative ratio.<br/><br/>
     * _Note: This function converts to HSL while preforming operation. The result returns RGB but slight color discrepancies can occur during the conversion process._
     * @param {number} ratio the relative ratio to saturate the color
     */
    public saturate(ratio: number): RGBA {
        return this.adjustRelativeValue('saturation', ratio, true);
    }

    public desaturate(ratio: number): RGBA {
        return this.adjustRelativeValue('saturation', ratio, false);
    }

    public fade(ratio: number): RGBA {
        this.space.alpha -= this.alpha() * ratio;
        return this;
    }

    public fill(ratio: number): RGBA {
        this.space.alpha += this.alpha() * ratio;
        return this;
    }

    public rotate(degrees: number): RGBA {
        const hsl = convertRgbToHsl(this.space);
        hsl.hue = (hsl.hue + degrees) % 360;
        if (hsl.hue < 0) {
            hsl.hue += 360;
        }
        const rotated = convertHslToRgb(hsl);
        this.applySpace(rotated);
        return this;
    }

    public mix(color: RGBAColorSpace, weight = 0.5): RGBA {
        const p = weight === undefined ? 0.5 : weight;

        const w = 2 * p - 1;
        const a = color.alpha - this.alpha();

        const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
        const w2 = 1 - w1;
        this.applySpace({
            red: Math.min(
                Math.max(Math.round(w1 * color.red + w2 * this.red()), 0),
                255
            ),
            green: Math.min(
                Math.max(Math.round(w1 * color.green + w2 * this.green()), 0),
                255
            ),
            blue: Math.min(
                Math.max(Math.round(w1 * color.blue + w2 * this.blue()), 0),
                255
            ),
            alpha: Math.min(
                Math.max(color.alpha * p + this.alpha() * (1 - p), 0),
                1
            ),
        });
        return this;
    }

    /**
     * Adjusts the opacity of the {@link RGBA} instance. This value
     * is limited between 0 and 1, and also between 1 and 100. Values between 0
     * and 1 are compared first, after which values between 1 and 100 are compared,
     * This value is clamped.
     *
     * @param percent the percent of opacity to set (0-1 or 1-100)
     */
    public setOpacity(percent: number): RGBA {
        this.space.alpha = normalizePercent(percent);
        return this;
    }

    /**
     * Returns a hex string representing the RGB color model. This ignores any
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
        return `${!removeHashtag ? '#' : ''}${this.space.red.toString(
            16
        )}${this.space.green.toString(16)}${this.space.blue.toString(16)}`;
    }

    /**
     * Retrieves an array representing the RGBA color space containing the primary colors and alpha
     * values. Array index is ordered logically, [RGBA].
     *
     * @return {RGBAColorSpace} the RGBA color model values
     */
    public toArray(): Array<number> {
        return [this.red(), this.green(), this.blue(), this.alpha()];
    }

    /**
     * Retrieves an object representing the RGBA color space containing the primary colors and alpha
     * values.
     *
     * @return {RGBAColorSpace} the RGBA color model values
     */
    public toObject(): RGBAColorSpace {
        return this.space;
    }

    public toString(alpha?: boolean) {
        return alpha
            ? `rgba(${this.space.red},${this.space.green},${this.space.blue},${this.space.alpha})`
            : `rgb(${this.space.red},${this.space.green},${this.space.blue})`;
    }

    private adjustRelativeValue(
        key: keyof HSLColorSpace,
        ratio: number,
        increase: boolean
    ) {
        const normalized = normalizePercent(ratio, true);
        const hsl = convertRgbToHsl(this.space);
        hsl[key] += hsl[key] * normalized * (increase ? 1 : -1);
        const max = key === 'hue' ? 360 : 1;
        if (hsl[key] < 0) hsl[key] = 0;
        if (hsl[key] > max) hsl[key] = max;
        const lightened = convertHslToRgb(hsl);
        this.applySpace(lightened);
        return this;
    }

    private applySpace(space: RGBAColorSpace) {
        this.space.red = space.red;
        this.space.green = space.green;
        this.space.blue = space.blue;
        this.space.alpha = space.alpha;
    }
}
