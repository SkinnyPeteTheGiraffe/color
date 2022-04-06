import RGBAColorSpace from './types/rgba-color-space';
import { normalizePercent } from '../../common/utils/number-tools';
import rgbaConverter from '../utils/converter/rgba-converter';
import AbstractSpace from '../abstract-space';
import { BaseSpace } from '../types/base';

/**
 * RGBA wrapper which provides mutations and accessor functions for
 * the RGBA color space.
 *
 * @public
 */
export default class RGBASpace extends AbstractSpace<'rgb', RGBAColorSpace> {
    public type: 'rgb';

    constructor(model: RGBAColorSpace) {
        super('rgb', model, rgbaConverter);
        this.type = 'rgb';
    }

    /**
     * Retrieves the value of the red channel for the current color space.
     *
     * @returns {number} the red channel value of this color space
     */
    public red(): number {
        return this.model.red;
    }

    /**
     * Retrieves the value of the green channel for the current color space.
     *
     * @returns {number} the green channel value of this color space
     */
    public green(): number {
        return this.model.green;
    }

    /**
     * Retrieves the value of the alpha channel for the current color space.
     *
     * @returns {number} the alpha channel value of this color space
     */
    public alpha(): number {
        return this.model.alpha;
    }

    /**
     * Retrieves the value of the blue channel for the current color space.
     *
     * @returns {number} the blue channel value of this color space
     */
    public blue(): number {
        return this.model.blue;
    }

    /**
     * @inheritDoc
     */
    public clone(): BaseSpace<RGBAColorSpace> {
        return new RGBASpace({ ...this.model });
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
            this.model[color] = Math.floor(Math.min(Math.max(value, 0), 255));
        } else {
            this.model[color] = Math.min(Math.max(value, 0), 1);
        }
        return this;
    }

    /**
     * Reduce the RGBA color space alpha value by a relative ratio.
     *
     * @param {number} ratio the ratio in which to reduce the alpha channel value
     */
    public fade(ratio: number): RGBASpace {
        const normalized = normalizePercent(ratio);
        this.model.alpha -= this.alpha() * normalized;
        return this;
    }

    /**
     * Increase the RGBA color space alpha value by a relative ratio.
     *
     * @param {number} ratio the ratio in which to increase the alpha channel value
     */
    public fill(ratio: number): RGBASpace {
        const normalized = normalizePercent(ratio);
        this.model.alpha += this.alpha() * normalized;
        return this;
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
        this.model.alpha = normalizePercent(percent);
        return this;
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

    public toString(alpha?: boolean): string {
        return alpha
            ? `rgba(${this.model.red},${this.model.green},${this.model.blue},${this.model.alpha})`
            : `rgb(${this.model.red},${this.model.green},${this.model.blue})`;
    }

    /**
     * @internal
     * @param model
     */
    public applyModel(model: RGBAColorSpace): RGBASpace {
        this.model = { ...model };
        return this;
    }
}
