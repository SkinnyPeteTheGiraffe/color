import { HueColorSpace } from '../base';
import {
    clampNumericValue,
    normalizePercent,
    normalizeRotation,
} from '../../common/utils/number-tools';

/**
 * Rotates the hue of the hue by a given number of degrees.
 *
 * @param {number} hue the hue value to rotate
 * @param {number} degrees the number of degrees to rotate the hue channel
 */
export const rotateHue = (hue: number, degrees: number): number => {
    return normalizeRotation(hue + degrees);
};

export const setHueColorSpaceValue = <R extends HueColorSpace>(
    space: R,
    color: keyof R,
    value: number
): R => {
    const adjusted: R = { ...space };
    if (color === 'hue') {
        Object.assign(adjusted, {
            [color]: Math.floor(Math.min(Math.max(value, 0), 360)),
        });
    } else {
        Object.assign(adjusted, {
            [color]: Math.min(Math.max(value, 0), 100),
        });
    }
    return adjusted;
};

export const adjustHueRelativeValue = <R extends HueColorSpace>(
    space: R,
    key: keyof Omit<R, 'hue'>,
    ratio: number,
    increase: boolean
): R => {
    const adjusted: R = { ...space };
    const value = Number(adjusted[key]);
    const normalized = normalizePercent(ratio, true);
    Object.assign(adjusted, {
        [key]: clampNumericValue(
            value + Math.round(value * normalized * (increase ? 1 : -1)),
            0,
            100
        ),
    });
    return adjusted;
};
