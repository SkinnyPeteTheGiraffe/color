import { HSLColorSpace } from '../hsl';
import { RGBAColorSpace } from '../rgba';
import { HWBColorSpace } from '../hwb/types/hwb.space';
import { HSVColorSpace } from '../hsv';

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
    saturation = Math.round((saturation + Number.EPSILON) * 100);
    lightness = Math.round((lightness + Number.EPSILON) * 100);
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
    hue %= 360;

    if (hue < 0) {
        hue += 360;
    }

    if (saturation > 1) saturation /= 100;
    if (lightness > 1) lightness /= 100;

    const calculateChannel = (n: number): number => {
        const k = (n + hue / 30) % 12;
        const a = saturation * Math.min(lightness, 1 - lightness);
        return lightness - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    };

    return {
        red: Math.min(Math.max(Math.floor(calculateChannel(0) * 256), 0), 255),
        green: Math.min(
            Math.max(Math.floor(calculateChannel(8) * 256), 0),
            255
        ),
        blue: Math.min(Math.max(Math.floor(calculateChannel(4) * 256), 0), 255),
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

export const convertHwbToRgb = ({
    hue,
    whiteness,
    blackness,
}: HWBColorSpace): RGBAColorSpace => {
    whiteness /= 100;
    blackness /= 100;
    if (whiteness + blackness >= 1) {
        const gray = whiteness / (whiteness + blackness);
        return {
            red: gray,
            green: gray,
            blue: gray,
            alpha: 1,
        };
    }
    const rgb = convertHslToRgb({ hue, saturation: 100, lightness: 50 });
    const calculateAppliedValue = (value: number) => {
        value /= 255;
        value *= 1 - whiteness - blackness;
        value += whiteness;
        return Math.min(Math.max(Math.floor(value * 256), 0), 255);
    };
    rgb.red = calculateAppliedValue(rgb.red);
    rgb.green = calculateAppliedValue(rgb.green);
    rgb.blue = calculateAppliedValue(rgb.blue);
    return rgb;
};

export const convertHslToHwb = (space: HSLColorSpace) => {
    return convertHsvToHwb(convertHslToHsv(space));
};

export const convertHwbToHsl = (space: HWBColorSpace) => {
    return convertHsvToHsl(convertHwbToHsv(space));
};

export const convertHslToHsv = ({
    hue,
    saturation,
    lightness,
}: HSLColorSpace): HSVColorSpace => {
    const root =
        (saturation * (lightness < 50 ? lightness : 100 - lightness)) / 100;
    const adjustedSaturation =
        root === 0 ? 0 : ((2 * root) / (lightness + root)) * 100;
    const value = lightness + root;

    return {
        hue,
        saturation: adjustedSaturation,
        value,
    };
};

export const convertHsvToHsl = ({
    hue,
    saturation,
    value,
}: HSVColorSpace): HSLColorSpace => {
    const hslL = ((200 - saturation) * value) / 100;

    return {
        hue,
        saturation:
            hslL === 0 || hslL === 200
                ? 0
                : ((saturation * value) /
                      100 /
                      (hslL <= 100 ? hslL : 200 - hslL)) *
                  100,
        lightness: (hslL * 5) / 10,
    };
};

export const convertHsvToHwb = ({
    hue,
    saturation,
    value,
}: HSVColorSpace): HWBColorSpace => {
    return {
        hue,
        whiteness: ((100 - saturation) * value) / 100,
        blackness: 100 - value,
    };
};

export const convertHwbToHsv = ({
    hue,
    whiteness,
    blackness,
}: HWBColorSpace): HSVColorSpace => {
    return {
        hue,
        saturation:
            blackness === 100 ? 0 : 100 - (whiteness / (100 - blackness)) * 100,
        value: 100 - blackness,
    };
};
