import { BaseSpace, ModelType } from '../base';
import { RGBAColorSpace } from './types';
import { normalizePercent } from '../../common';
import { convertHwbToRgb, convertRgbToHsl, convertRgbToHwb } from '../utils';
import { HSL } from '../hsl/hsl';

/**
 * RGBA wrapper which provides mutations and accessor functions for
 * the RGBA color space.
 *
 * @public
 */
export class RGBA implements BaseSpace<RGBAColorSpace> {
    public type: ModelType;
    private readonly space: RGBAColorSpace;

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
    public setColor(color: keyof RGBAColorSpace, value: number): RGBA {
        if (color !== 'alpha') {
            this.space[color] = Math.floor(Math.min(Math.max(value, 0), 255));
        } else {
            this.space[color] = Math.min(Math.max(value, 0), 1);
        }
        return this;
    }

    public clone(): RGBA {
        return new RGBA({ ...this.space });
    }

    /**
     * Lightens the RGB color by a relative ratio.
     *
     * @remarks
     * To lighten the color, this
     * function converts the RGB color to HSL color space, adjusts the lightness
     * attribute, and converts back to the RGB color space.
     * @remarks
     * The ratio is applied
     * by first multiplying the percent against the current value, and adding that
     * result to the lightness value clamping it between [0,1]
     *
     * @example
     * Here's a simple usage example lightening the color by 20%:
     * ```ts
     * color.toString() // rgb(200,128,75)
     * color.lighten(0).toString() // rgb(200,128,75)
     * color.lighten(20).toString() // rgb(213,157,118)
     * ```
     *
     * @param {number} ratio percentage to lighten the color by as a value between [0,1], or (1,100]
     *
     */
    public lighten(ratio: number): RGBA {
        const rotated = this.toHSL().lighten(ratio).toRGBA();
        this.applySpace(rotated.space);
        return this;
    }

    /**
     * Darkens the RGB color by a relative ratio. The ratio is relative of the
     * value of each primary color.
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
    public darken(ratio: number): RGBA {
        const rotated = this.toHSL().darken(ratio).toRGBA();
        this.applySpace(rotated.space);
        return this;
    }

    /**
     * Whiten the RBG value by a relative ratio. This function converts the RGB
     * color space to HWB, adds whiteness value, and converts back to RGB.
     *
     * @param {number} ratio value between 0 - 1 or 1 - 100 representing a relative percent in which to whiten the color
     */
    public whiten(ratio: number): RGBA {
        const hwb = convertRgbToHwb(this.space);
        const value = hwb.whiteness * normalizePercent(ratio);
        hwb.whiteness += value;
        const rgb = convertHwbToRgb(hwb);
        this.applySpace(rgb);
        return this;
    }

    /**
     * Blackens the RBG value by a relative ratio. This function converts the RGB
     * color space to HWB, adds blackness value, and converts back to RGB.
     *
     * @param {number} ratio value between 0 - 1 or 1 - 100 representing a relative percent in which to blacken the color
     */
    public blacken(ratio: number): RGBA {
        const hwb = convertRgbToHwb(this.space);
        const value = hwb.blackness * normalizePercent(ratio);
        hwb.blackness += value;
        const rgb = convertHwbToRgb(hwb);
        this.applySpace(rgb);
        return this;
    }

    /**
     * Converts RGB color channels to grayscale using a weighted YUV conversion.
     */
    public grayscale() {
        const y = Math.floor(
            this.red() * 0.299 + this.green() * 0.587 + this.blue() * 0.114
        );
        this.space.red = y;
        this.space.green = y;
        this.space.blue = y;
        return this;
    }

    /**
     * Saturates the RGB color by a relative ratio. The color is desaturated by
     * converting the value to HSL, adjusting the saturation, and converting
     * back to RGB.
     *
     * @param {number} ratio the relative ratio to saturate the color
     */
    public saturate(ratio: number): RGBA {
        const rotated = this.toHSL().saturate(ratio).toRGBA();
        this.applySpace(rotated.space);
        return this;
    }

    /**
     * Desaturates the RGB color by a relative ratio. The color is desaturated by
     * converting the value to HSL, adjusting the saturation, and converting
     * back to RGB.
     *
     * @param {number} ratio the relative ratio to saturate the color
     */
    public desaturate(ratio: number): RGBA {
        const rotated = this.toHSL().desaturate(ratio).toRGBA();
        this.applySpace(rotated.space);
        return this;
    }

    public fade(ratio: number): RGBA {
        ratio = normalizePercent(ratio);
        this.space.alpha -= this.alpha() * ratio;
        return this;
    }

    public fill(ratio: number): RGBA {
        ratio = normalizePercent(ratio);
        this.space.alpha += this.alpha() * ratio;
        return this;
    }

    public rotate(degrees: number): RGBA {
        const rotated = this.toHSL().rotate(degrees).toRGBA();
        this.applySpace(rotated.space);
        return this;
    }

    public mix(color: RGBAColorSpace, weight = 0.5): RGBA {
        weight = normalizePercent(weight);
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

    public toHSL() {
        return new HSL(convertRgbToHsl(this.space));
    }

    private applySpace(space: RGBAColorSpace) {
        this.space.red = space.red;
        this.space.green = space.green;
        this.space.blue = space.blue;
        this.space.alpha = space.alpha;
    }
}
