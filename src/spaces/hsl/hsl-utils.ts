import HSLColorSpace from './types/hsl-color-space';
import { normalizePercent } from '../../common';

/**
 * Rotates the hue of the hue by a given number of degrees.
 *
 * @param {number} hue the hue value to rotate
 * @param {number} degrees the number of degrees to rotate the hue channel
 */
export const rotateHue = (hue: number, degrees: number): number => {
    let rotated = (hue + degrees) % 360;
    if (hue < 0) {
        rotated += 360;
    }
    return rotated;
};

export const adjustHSLRelativeValue = (
    space: HSLColorSpace,
    key: keyof Omit<HSLColorSpace, 'hue'>,
    ratio: number,
    increase: boolean
): HSLColorSpace => {
    const adjusted = { ...space };
    const normalized = normalizePercent(ratio, true);
    adjusted[key] += Math.round(
        adjusted[key] * normalized * (increase ? 1 : -1)
    );
    /* istanbul ignore next */ // Can't get this to trigger
    if (adjusted[key] < 0) adjusted[key] = 0;
    if (adjusted[key] > 100) adjusted[key] = 100;
    return adjusted;
};
