import { BaseSpace, ModelType } from './types/base';
import Converter from './utils/converter/converter';
import hwbConverter from './utils/converter/hwb-converter';
import RGBAColorSpace from './rgba/types/rgba-color-space';
import HSVColorSpace from './hsv/types/hsv-color-space';
import HSLColorSpace from './hsl/types/hsl-color-space';
import HWBColorSpace from './hwb/types/hwb-color-space';
import rgbaConverter from './utils/converter/rgba-converter';
import hsvConverter from './utils/converter/hsv-converter';
import hslConverter from './utils/converter/hsl-converter';
import { adjustHueRelativeValue, rotateHue } from './utils/hue-utils';
import {
    applyGreyscaleToRGBASpace,
    mixRGBASpaces,
    rgbaSpaceToHexString,
} from './rgba/rgba-utils';

type SourceConversion<
    M extends ModelType,
    T extends KeyedModel<M>
> = keyof Pick<Converter<T>, M extends 'rgb' ? 'toRGBA' : 'toHWB'>;

type SourceConverter<M extends ModelType, T extends KeyedModel<M>> = Omit<
    Converter<T>,
    M extends 'rgb'
        ? 'toRGBA'
        : M extends 'hsl'
        ? 'toHSL'
        : M extends 'hsv'
        ? 'toHSV'
        : 'toHWB'
>;

type KeyedModel<M extends ModelType> = M extends 'rgb'
    ? RGBAColorSpace
    : M extends 'hsv'
    ? HSVColorSpace
    : M extends 'hsl'
    ? HSLColorSpace
    : M extends 'hwb'
    ? HWBColorSpace
    : null;

abstract class AbstractSpace<M extends ModelType, T extends KeyedModel<M>>
    implements BaseSpace<T>
{
    public type: M;
    protected model: T;
    protected converter: Converter<T>;

    protected constructor(type: M, model: T, converter: SourceConverter<M, T>) {
        this.type = type;
        this.model = model;
        this.converter = converter as Converter<T>;
    }

    /**
     * Blackens the color space value by a relative ratio. This function converts
     * the color space to HWB if needed, adds blackness value, and converts back
     * to the original color space if not originally HWB.
     *
     * @public
     * @param {number} ratio value between 0 - 1 or 1 - 100 representing a relative percent in which to blacken the color
     */
    public blacken(ratio: number): BaseSpace<T> {
        const hwb =
            this.type === 'hwb'
                ? (this.model as HWBColorSpace)
                : this.converter.toHWB(this.model);
        const blackened = adjustHueRelativeValue(hwb, 'blackness', ratio, true);
        return this.applyCorrectColorModel(blackened);
    }

    /**
     * Retrieves a color channel from the color model via key.
     * @example
     * Here's a simple example retrieving each channel of the RGBA space
     * ```ts
     * rgb.toString() // rgb(0,128,255)
     * rgb.color('red') // 0
     * rgb.color('green') // 128
     * rgb.color('blue') // 255
     * ```
     *
     * @public
     * @param color the name of the channel from the current color space to retrieve
     * @returns the value of the channel matching the provided key
     */
    public color(color: keyof T): number {
        return this.model[color] as unknown as number;
    }

    /**
     * Darkens the RGB color space by a relative ratio.
     *
     * @remarks To lighten the color, this function converts the color space to HSL color space (if not already HSL), adjusts the lightness attribute, and converts back to the HSL color space if needed.
     *
     * @remarks The ratio is applied by first multiplying the percent against the current value, and subtracting that result to the lightness value clamping it between [0,1]
     *
     * @example
     * Here's a simple usage example darkening the color by 20%:
     * ```ts
     * color.toString() // rgb(100,100,100)
     * color.darken(0).toString() // rgb(100,100,100)
     * color.darken(0.2).toString() // rgb(69,69,69)
     * ```
     *
     * @public
     * @param ratio percentage to darken the color by as a value between [0,1], or (1,100]
     */
    public darken(ratio: number): BaseSpace<T> {
        const hsl =
            this.type === 'hsl'
                ? (this.model as HSLColorSpace)
                : this.converter.toHSL(this.model);
        const darkened = adjustHueRelativeValue(hsl, 'lightness', ratio, false);
        return this.applyCorrectColorModel(darkened);
    }

    /**
     * Desaturates the color space by a relative ratio. The color is desaturated by
     * converting the value to HSL (if not already HSL), adjusting the saturation,
     * and converting back to the original color space if needed.
     *
     * @public
     * @param {number} ratio the relative ratio to desaturate the color
     */
    public desaturate(ratio: number): BaseSpace<T> {
        const hsl =
            this.type === 'hsl'
                ? (this.model as HSLColorSpace)
                : this.converter.toHSL(this.model);
        const desaturated = adjustHueRelativeValue(
            hsl,
            'saturation',
            ratio,
            false
        );
        return this.applyCorrectColorModel(desaturated);
    }

    /**
     * Converts the color space channels to grayscale using a Weighted Method
     * (aka Luminosity Method). It does so by first converting the color space to
     * RGBA (if not already RGBA), applies greyscale, then converts back to the
     * original color space if needed;
     *
     * @public
     */
    public grayscale(): BaseSpace<T> {
        const rgba =
            this.type === 'rgb'
                ? (this.model as RGBAColorSpace)
                : this.converter.toRGBA(this.model);
        const greyscale = applyGreyscaleToRGBASpace(rgba);
        return this.applyCorrectColorModel(greyscale);
    }

    /**
     * Lightens the color space by a relative ratio.
     *
     * @remarks To lighten the color space this function converts the space to HSL (if not already within the HSL space), in which the `lightness` value by a relative ratio, after which is converted back to the original color space.
     * @remarks The ratio is applied by first multiplying the percent against the current value, and adding that result to the lightness value clamping it between [0,1]
     *
     * @example
     * Here's a simple usage example lightening the color by 20% using the RGBA color space:
     * ```ts
     *
     * const rgba = RGBA.fromHex('#b9825b')
     * rgba.toString() // rgb(200,128,75)
     * rgba.lighten(0).toString() // rgb(200,128,75)
     * rgba.lighten(20).toString() // rgb(213,157,118)
     * ```
     *
     * @public
     * @param {number} ratio a value between [0,1] or (1,100] as the ratio to adjust the lightness of the color space
     */
    public lighten(ratio: number): BaseSpace<T> {
        const hsl =
            this.type === 'hsl'
                ? (this.model as HSLColorSpace)
                : this.converter.toHSL(this.model);
        const lightened = adjustHueRelativeValue(hsl, 'lightness', ratio, true);
        return this.applyCorrectColorModel(lightened);
    }

    /**
     * Mixes this color with the provided color model value by the specified weight.
     *
     * @remarks This function is directly ported from the SASS mix method: https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
     *
     * @public
     * @param color the color model to mix into the color space
     * @param weight the weight in which the color should be mixed
     */
    public mix(color: T, weight = 0.5): BaseSpace<T> {
        const base =
            this.type === 'rgb'
                ? (this.model as RGBAColorSpace)
                : this.converter.toRGBA(this.model);
        const additive =
            this.type === 'rgb'
                ? (color as RGBAColorSpace)
                : this.converter.toRGBA(color);
        const mixed = mixRGBASpaces(base, additive, weight);
        return this.applyCorrectColorModel(mixed);
    }

    /**
     * Rotates the hue of the color space by a given number of degrees.
     *
     * @remarks Converts the color space to HSL, where the hue is represented as degrees
     *
     * @public
     * @param {number} degrees the number of degrees to rotate the hue channel
     */
    public rotate(degrees: number): BaseSpace<T> {
        const hsl =
            this.type === 'hsl'
                ? (this.model as HSLColorSpace)
                : this.converter.toHSL(this.model);
        hsl.hue = rotateHue(hsl.hue, degrees);
        return this.applyCorrectColorModel(hsl);
    }

    /**
     * Saturates the color space by a relative ratio. The color is saturated by
     * converting the value to HSL (if not already HSL), adjusting the saturation,
     * and converting back to the original color space if needed.
     *
     * @public
     * @param {number} ratio the relative ratio to saturate the color
     */
    public saturate(ratio: number): BaseSpace<T> {
        const hsl =
            this.type === 'hsl'
                ? (this.model as HSLColorSpace)
                : this.converter.toHSL(this.model);
        const desaturated = adjustHueRelativeValue(
            hsl,
            'saturation',
            ratio,
            true
        );
        return this.applyCorrectColorModel(desaturated);
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
     *
     * @public
     * @param {boolean} removeHashtag will return the hex value without a hashtag if true, otherwise will return with hashtag
     */
    public toHexString(removeHashtag?: boolean): string {
        const rgba =
            this.type === 'rgb'
                ? (this.model as RGBAColorSpace)
                : this.converter.toRGBA(this.model);
        return rgbaSpaceToHexString(rgba, removeHashtag);
    }

    /**
     * Returns this color space model. This record contains named
     * channels and their corresponding values.
     *
     * @public
     * @return the color model record
     */
    public toObject(): T {
        return { ...this.model };
    }

    /**
     * Whiten the color space value by a relative ratio. This function converts the
     * color space to HWB (if not already HWB), adds whiteness value, and converts
     * back to the original color space if needed.
     *
     * @public
     * @param {number} ratio value between 0 - 1 or 1 - 100 representing a relative percent in which to whiten the color
     */
    public whiten(ratio: number): BaseSpace<T> {
        const hwb =
            this.type === 'hwb'
                ? (this.model as HWBColorSpace)
                : this.converter.toHWB(this.model);
        const whitened = adjustHueRelativeValue(hwb, 'whiteness', ratio, true);
        return this.applyCorrectColorModel(whitened);
    }

    private getSourceConversionMethod(): SourceConversion<M, T> | null {
        switch (this.type) {
            case 'rgb':
                return 'toRGBA' as SourceConversion<M, T>;
            case 'hsv':
                return 'toHSV' as SourceConversion<M, T>;
            case 'hsl':
                return 'toHSL' as SourceConversion<M, T>;
            case 'hwb':
                return 'toHWB' as SourceConversion<M, T>;
        }
        return null;
    }

    private applyCorrectColorModel(model: unknown): BaseSpace<T> {
        if (
            (model as RGBAColorSpace).red !== undefined ||
            (model as RGBAColorSpace).blue !== undefined ||
            (model as RGBAColorSpace).green !== undefined
        ) {
            // Is RGBA
            const rgba: RGBAColorSpace = model as RGBAColorSpace;
            if (this.type === 'rgb') {
                return this.applyModel(rgba as T);
            }
            const target = this.getSourceConversionMethod();
            if (target) {
                return this.applyModel(rgbaConverter[target](rgba) as T);
            }
        }
        if (
            ((model as HSLColorSpace).hue !== undefined ||
                (model as HSLColorSpace).saturation !== undefined) &&
            (model as HSLColorSpace).lightness !== undefined
        ) {
            // Is HSL
            const hsl: HSLColorSpace = model as HSLColorSpace;
            if (this.type === 'hsl') {
                return this.applyModel(hsl as T);
            }
            const target = this.getSourceConversionMethod();
            if (target) {
                return this.applyModel(hslConverter[target](hsl) as T);
            }
        }
        if (
            ((model as HSVColorSpace).hue !== undefined ||
                (model as HSVColorSpace).saturation !== undefined) &&
            (model as HSVColorSpace).value !== undefined
        ) {
            // Is HSV
            const hsv: HSVColorSpace = model as HSVColorSpace;
            if (this.type === 'hsv') {
                return this.applyModel(hsv as T);
            }
            const target = this.getSourceConversionMethod();
            if (target) {
                return this.applyModel(hsvConverter[target](hsv) as T);
            }
        }
        if (
            ((model as HWBColorSpace).hue !== undefined ||
                (model as HWBColorSpace).whiteness !== undefined) &&
            (model as HWBColorSpace).blackness !== undefined
        ) {
            // Is HWB
            const hwb: HWBColorSpace = model as HWBColorSpace;
            if (this.type === 'hwb') {
                return this.applyModel(hwb as T);
            }
            const target = this.getSourceConversionMethod();
            if (target) {
                return this.applyModel(hwbConverter[target](hwb) as T);
            }
        }
        return this;
    }

    /**
     * Clones the current color space.
     *
     * @public
     * @return a new cloned instance of the original color space
     */
    abstract clone(): BaseSpace<T>;

    abstract toArray(): Array<number>; // Because order matters

    abstract setColor(color: keyof T, value: number): BaseSpace<T>; // Max/Min differences

    abstract applyModel(model: T): BaseSpace<T>; // Max/Min differences
}

export default AbstractSpace;
