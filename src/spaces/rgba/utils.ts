import { RGBAColorSpace } from './types';

const isShortHand = (hex: string): boolean => hex.length >= 3 && hex.length < 6;

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
        const [r, g, b] = cleaned.match(/[\da-f]{2}/gi);
        return {
            red: parseInt(r, 16),
            green: parseInt(g, 16),
            blue: parseInt(b, 16),
            alpha: 1,
        };
    }

    return {
        red: 0,
        blue: 0,
        green: 0,
        alpha: 1,
    };
};
