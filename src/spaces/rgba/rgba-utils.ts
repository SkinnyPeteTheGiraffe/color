import RGBAColorSpace from './types/rgba-color-space';
import { normalizePercent } from '../../common';

/**
 * Determines if the provided string is between 3 and 5, which would indicate a shorthand
 * hex color value.
 *
 * @remarks This does not validate the string is a valid hex-decimal value, this may be added in the future if the need arises.
 *
 * @param hex the string to determine value
 */
export const isShortHand = (hex: string): boolean =>
    hex.length >= 3 && hex.length < 6;

/**
 * Converts a hexadecimal color value to an RGB data structure. Supports hex
 * values with or without hashtags, and full length (6 characters) or shorthand
 * (3 characters) values. If an invalid hex input value is provided the color
 * returned will be rgb(0, 0, 0)
 *
 * @param hex the hexadecimal value to convert to RGB
 * @return {@link RGBColorModel} rgb color model structure created from the hex input
 */
export const convertHexToRgb = (hex: string): RGBAColorSpace => {
    const cleaned = hex.replace(/#/g, '').toLowerCase();
    if (
        cleaned.length >= 3 &&
        cleaned.length <= 6 &&
        cleaned.match(/([\da-f]{3}){1,2}/i)
    ) {
        if (isShortHand(cleaned)) {
            const [r, g, b] = cleaned.substring(0, 3).split('');
            return {
                red: parseInt(`${r}${r}`, 16),
                green: parseInt(`${g}${g}`, 16),
                blue: parseInt(`${b}${b}`, 16),
                alpha: 1,
            };
        }
        const matched = cleaned.match(/[\da-f]{2}/gi);
        if (matched) {
            const [r, g, b] = matched;
            return {
                red: parseInt(r, 16),
                green: parseInt(g, 16),
                blue: parseInt(b, 16),
                alpha: 1,
            };
        }
    }

    return {
        red: 0,
        blue: 0,
        green: 0,
        alpha: 1,
    };
};

export const mixRGBASpaces = (
    base: RGBAColorSpace,
    additive: RGBAColorSpace,
    weight: number
) => {
    const normalized = normalizePercent(weight);
    const p = normalized === undefined ? 0.5 : normalized;

    const w = 2 * p - 1;
    const a = additive.alpha - base.alpha;

    const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
    const w2 = 1 - w1;
    return {
        red: Math.min(
            Math.max(Math.round(w1 * additive.red + w2 * base.red), 0),
            255
        ),
        green: Math.min(
            Math.max(Math.round(w1 * additive.green + w2 * base.green), 0),
            255
        ),
        blue: Math.min(
            Math.max(Math.round(w1 * additive.blue + w2 * base.blue), 0),
            255
        ),
        alpha: Math.min(
            Math.max(additive.alpha * p + base.alpha * (1 - p), 0),
            1
        ),
    };
};

export const rgbaSpaceToHexString = (
    space: RGBAColorSpace,
    removeHashtag?: boolean
): string =>
    `${!removeHashtag ? '#' : ''}${space.red.toString(
        16
    )}${space.green.toString(16)}${space.blue.toString(16)}`;

export const applyGreyscaleToRGBASpace = (space: RGBAColorSpace) => {
    const y = Math.floor(
        space.red * 0.299 + space.green * 0.587 + space.blue * 0.114
    );
    return {
        ...space,
        red: y,
        green: y,
        blue: y,
    };
};
