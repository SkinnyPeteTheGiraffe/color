import HSLColorSpace from './types/hsl-color-space';
import hslConverter from '../utils/converter/hsl-converter';
import { setHueColorSpaceValue } from '../utils/hue-utils';
import AbstractSpace from '../abstract-space';

/**
 * HSL wrapper which provides mutations and accessor functions for
 * the HSL color space.
 *
 * @public
 */
export default class HSLSpace extends AbstractSpace<'hsl', HSLColorSpace> {
    constructor(model: HSLColorSpace) {
        super('hsl', model, hslConverter);
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
    public lightness(): number {
        return this.model.lightness;
    }

    public setColor(color: keyof HSLColorSpace, value: number): HSLSpace {
        const adjusted = setHueColorSpaceValue(this.model, color, value);
        return this.applyModel(adjusted);
    }

    /**
     * @inheritDoc
     */
    public clone(): HSLSpace {
        return new HSLSpace({ ...this.model });
    }

    /**
     * Retrieves an array representing the HSL color space containing the primary colors.
     *
     * @remarks  Array index is ordered logically [HSL]
     *
     * @return {[number, number, number]} the HSL color space values as an array
     */
    public toArray(): [number, number, number] {
        return [this.model.hue, this.model.saturation, this.model.lightness];
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
        return `hsl(${parseFloat(this.model.hue.toFixed(1))},${parseFloat(
            this.model.saturation.toFixed(1)
        )}%,${parseFloat(this.model.lightness.toFixed(1))}%)`;
    }

    public applyModel(space: HSLColorSpace): HSLSpace {
        this.model.hue = Math.min(Math.max(Math.floor(space.hue), 0), 360);
        this.model.saturation = Math.min(
            Math.max(Math.floor(space.saturation), 0),
            100
        );
        this.model.lightness = Math.min(
            Math.max(Math.floor(space.lightness), 0),
            100
        );
        return this;
    }
}
