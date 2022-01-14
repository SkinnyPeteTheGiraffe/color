import { HSLColorSpace } from '../hsl';
import { RGBAColorSpace } from '../rgba';
import { HWBColorSpace } from '../hwb/types/hwb.space';

const hueToRgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
};

const rgbToHue = (space: RGBAColorSpace, defaultHue = 0) => {
    const value = rgbMax(space);
    const whiteness = rgbMin(space);
    const delta = value - whiteness;

    if (delta) {
        // calculate segment
        const segment =
            value === space.red
                ? (space.green - space.blue) / delta
                : value === space.green
                ? (space.blue - space.red) / delta
                : (space.red - space.green) / delta;

        // calculate shift
        const shift =
            value === space.red
                ? segment < 0
                    ? 360 / 60
                    : 0 / 60
                : value === space.green
                ? 120 / 60
                : 240 / 60;

        return (segment + shift) * 60;
    }
    return defaultHue;
};

const rgbMax = (space: RGBAColorSpace): number =>
    Math.max(space.red, space.green, space.blue);

const rgbMin = (space: RGBAColorSpace): number =>
    Math.min(space.red, space.green, space.blue);

/**
 * Converts an RGB color value to HSL. Formula modeled from
 * https://en.wikipedia.org/wiki/HSL_and_HSV. This function assumes
 * RGB values are within the domain of [0,255], and the output HSL values
 * are as follows. H [0,360], S [0,1], L[0,1]
 *
 * @param {RGBAColorSpace} model the RGB color model to convert to HSL
 * @return {HSLColorSpace} the converted HSL color model
 */
export const convertRgbToHsl = ({
    red,
    green,
    blue,
}: RGBAColorSpace): HSLColorSpace => {
    // Convert values from 0-255 to 0-1
    const redRatio = red / 255;
    const greenRatio = green / 255;
    const blueRatio = blue / 255;
    // Find both min/max values then calc their range
    const min = Math.min(redRatio, greenRatio, blueRatio);
    const max = Math.max(redRatio, greenRatio, blueRatio);
    const delta = max - min;
    const range = max + min;

    let hue: number;
    let saturation: number;
    let lightness = range / 2; // Lightness is mid-range

    // Calculate hue
    if (delta === 0) {
        // Achromatic
        hue = 0;
    } else if (max === redRatio) {
        // Red is max
        hue = ((greenRatio - blueRatio) / delta) % 6;
    } else if (max === greenRatio) {
        // Green is max
        hue = (blueRatio - redRatio) / delta + 2;
    } else {
        // Blue is max
        hue = (redRatio - greenRatio) / delta + 4;
    }

    hue = Math.round(hue * 60);

    // Make negative hues positive behind 360
    if (hue < 0) hue += 360;

    // Calculate saturation
    saturation = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

    // Multiply l and s by 100
    saturation = Math.round((saturation + Number.EPSILON) * 100) / 100;
    lightness = Math.round((lightness + Number.EPSILON) * 100) / 100;
    return {
        hue,
        saturation,
        lightness,
    };
};

/**
 * Converts an HSL color value to RGB. Formula modeled from
 * https://en.wikipedia.org/wiki/HSL_and_HSV. This function assumes
 * HSL values are as follows; H [0,360], S [0,1], L[0,1]. The out RGB color
 * values are within the domain of [0,255]
 *
 * @param {RGBAColorSpace} model the RGB color model to convert to HSL
 * @return {HSLColorSpace} the converted HSL color model
 */
export const convertHslToRgb = ({
    hue,
    saturation,
    lightness,
}: HSLColorSpace): RGBAColorSpace => {
    hue /= 360; // reduce from 0-360 to 0-1
    let red: number;
    let green: number;
    let blue: number;

    if (saturation === 0) {
        // achromatic
        red = lightness;
        green = lightness;
        blue = lightness;
    } else {
        const q =
            lightness < 0.5
                ? lightness * (1 + saturation)
                : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;
        red = hueToRgb(p, q, hue + 1 / 3);
        green = hueToRgb(p, q, hue);
        blue = hueToRgb(p, q, hue - 1 / 3);
    }

    return {
        red: Math.min(Math.floor(red * 256), 255),
        green: Math.min(Math.floor(green * 256), 255),
        blue: Math.min(Math.floor(blue * 256), 255),
        alpha: 1,
    };
};

export const convertRgbToHwb = (space: RGBAColorSpace): HWBColorSpace => {
    const red = (space.red / 255) * 100;
    const green = (space.green / 255) * 100;
    const blue = (space.blue / 255) * 100;
    const adjusted: RGBAColorSpace = { red, green, blue, alpha: space.alpha };
    const hue = Math.min(Math.max(Math.round(rgbToHue(adjusted)), 0), 255);
    const whiteness = Math.min(Math.max(Math.round(rgbMin(adjusted)), 0), 100);
    const blackness = Math.min(
        Math.max(Math.round(100 - rgbMax(adjusted)), 0),
        100
    );
    return {
        hue,
        whiteness,
        blackness,
    };
};
