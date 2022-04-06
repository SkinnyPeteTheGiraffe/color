import HWBColorSpace from './types/hwb-color-space';
import hwbConverter from '../utils/converter/hwb-converter';
import { setHueColorSpaceValue } from '../utils/hue-utils';
import AbstractSpace from '../abstract-space';

/**
 * HWB wrapper which provides mutations and accessor functions for
 * the HWB color space.
 *
 * @public
 */
export default class HWBSpace extends AbstractSpace<'hwb', HWBColorSpace> {
    constructor(model: HWBColorSpace) {
        super('hwb', model, hwbConverter);
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
     * Retrieves the value of the whiteness channel for the current color space.
     *
     * @returns {number} the whiteness channel value of this color space
     */
    public whiteness(): number {
        return this.model.whiteness;
    }

    /**
     * Retrieves the value of the blackness channel for the current color space.
     *
     * @returns {number} the blackness channel value of this color space
     */
    public blackness(): number {
        return this.model.blackness;
    }

    /**
     * Clones the current color space.
     *
     * @return a new cloned instance of the original color space
     */
    public clone(): HWBSpace {
        return new HWBSpace({ ...this.model });
    }

    public setColor(color: keyof HWBColorSpace, value: number): HWBSpace {
        const adjusted = setHueColorSpaceValue(this.model, color, value);
        return this.applyModel(adjusted);
    }

    /**
     * Retrieves an array representing the HWB color space containing the primary colors.
     *
     * @remarks  Array index is ordered logically [HWB]
     *
     * @return {[number, number, number]} the HWB color space values as an array
     */
    public toArray(): [number, number, number] {
        return [this.model.hue, this.model.whiteness, this.model.blackness];
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
        return `hwb(${Math.round(this.model.hue)},${Math.round(
            this.model.whiteness
        )}%,${Math.round(this.model.blackness)}%)`;
    }

    /* ---------- PRIVATE FUNCTIONS --------- */

    public applyModel(space: HWBColorSpace): HWBSpace {
        this.model.hue = Math.min(Math.max(Math.floor(space.hue), 0), 360);
        this.model.whiteness = Math.min(
            Math.max(Math.floor(space.whiteness), 0),
            100
        );
        this.model.blackness = Math.min(
            Math.max(Math.floor(space.blackness), 0),
            100
        );
        return this;
    }
}
