import HSLColorSpace from '../hsl/types/hsl-color-space';
import RGBAColorSpace from '../rgba/types/rgba-color-space';
import HWBColorSpace from '../hwb/types/hwb-space';
import HSVColorSpace from '../hsv/types/hsv-space';
import { HueColorSpace } from '../base';

const rgbMax = (space: RGBAColorSpace): number =>
    Math.max(space.red, space.green, space.blue);

const rgbMin = (space: RGBAColorSpace): number =>
    Math.min(space.red, space.green, space.blue);

const rgbToHue = (space: RGBAColorSpace, defaultHue = 0) => {
    const value = rgbMax(space);
    const whiteness = rgbMin(space);
    const delta = value - whiteness;

    if (delta) {
        // calculate segment
        let segment: number;
        if (value === space.red) {
            segment = (space.green - space.blue) / delta;
        } else {
            segment =
                value === space.green
                    ? (space.blue - space.red) / delta
                    : (space.red - space.green) / delta;
        }

        // calculate shift
        let shift: number;
        if (value === space.red) {
            shift = segment < 0 ? 360 / 60 : 0 / 60;
        } else {
            shift = value === space.green ? 120 / 60 : 240 / 60;
        }

        return (segment + shift) * 60;
    }
    return defaultHue;
};

/**
 * Converts an RGB color value to HSL. Formula modeled from
 * https://en.wikipedia.org/wiki/HSL_and_HSV. This function assumes
 * RGB values are within the domain of [0,255], and the output HSL values
 * are as follows. H [0,360], S [0,1], L[0,1]
 *
 * @param {RGBAColorSpace} model the RGB color model to convert to HSL
 * @return {HslColorSpace} the converted HSL color model
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

    hue *= 60;

    // Make negative hues positive behind 360
    if (hue < 0) hue += 360;

    // Calculate saturation
    saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

    // Multiply l and s by 100
    saturation = (saturation + Number.EPSILON) * 100;
    lightness = (lightness + Number.EPSILON) * 100;
    return {
        hue: Math.round(hue),
        saturation: Math.round(saturation),
        lightness: Math.round(lightness),
    };
};

/**
 * Converts an RGB color value to HSL. Formula modeled from
 * https://en.wikipedia.org/wiki/HSL_and_HSV. This function assumes
 * RGB values are within the domain of [0,255], and the output HSL values
 * are as follows. H [0,360], S [0,1], L[0,1]
 *
 * @param {RGBAColorSpace} model the RGB color model to convert to HSL
 * @return {HSVColorSpace} the converted HSL color model
 */
export const convertRgbToHsv = ({
    red,
    green,
    blue,
}: RGBAColorSpace): HSVColorSpace => {
    // Convert values from 0-255 to 0-1
    const redRatio = red / 255;
    const greenRatio = green / 255;
    const blueRatio = blue / 255;
    // Find both min/max values then calc their range
    const min = Math.min(redRatio, greenRatio, blueRatio);
    const max = Math.max(redRatio, greenRatio, blueRatio);
    const delta = max - min;

    const calculateDifference = (value: number): number =>
        (max - value) / 6 / (delta + 1) / 2;

    let hue = 0;
    let saturation = 0;

    if (delta !== 0) {
        saturation = delta / max;
        const rr = calculateDifference(redRatio);
        const gg = calculateDifference(greenRatio);
        const bb = calculateDifference(blueRatio);

        if (redRatio === max) {
            hue = bb - gg;
        } else if (greenRatio === max) {
            hue = 1 / 3 + rr - bb;
        } else if (blueRatio === max) {
            hue = 2 / 3 + gg - rr;
        }
        if (hue < 0) {
            hue += 1;
        } else if (hue > 1) {
            hue -= 1;
        }
    }

    return {
        hue: Math.round(hue * 360),
        saturation: Math.round(saturation * 100),
        value: Math.round(max * 100),
    };
};

const hueToRGBValue = (p: number, q: number, t: number) => {
    let clampedT = t;
    if (t < 0) {
        clampedT += 360;
    }
    if (clampedT > 360) {
        clampedT -= 360;
    }

    if (clampedT < 60) {
        return p + (q - p) * 6 * (clampedT / 360);
    }
    if (clampedT < 180) {
        return q;
    }
    if (clampedT < 240) {
        return p + (q - p) * ((240 - clampedT) / 360) * 6;
    }

    return p;
};

/**
 * Converts an HSL color value to RGB. Formula modeled from
 * https://en.wikipedia.org/wiki/HSL_and_HSV. This function assumes
 * HSL values are as follows; H [0,360], S [0,1], L[0,1]. The out RGB color
 * values are within the domain of [0,255]
 *
 * @author https://css-tricks.com/converting-color-spaces-in-javascript/#aa-hsl-to-rgb
 *
 * @param {RGBAColorSpace} model the RGB color model to convert to HSL
 * @return {HSLColorSpace} the converted HSL color model
 */
export const convertHslToRgb = ({
    hue,
    saturation,
    lightness,
}: HSLColorSpace): RGBAColorSpace => {
    let adjustedHue = hue;
    let adjustedSaturation = saturation;
    let adjustedLightness = lightness;
    if (adjustedHue > 360) {
        adjustedHue %= 360;
    } else if (adjustedHue < 0) {
        adjustedHue += 360;
    }
    if (adjustedSaturation > 1) adjustedSaturation /= 100;
    if (adjustedLightness > 1) adjustedLightness /= 100;

    // Achromatic
    if (saturation === 0) {
        const rgb = Math.round(adjustedLightness * 255);
        return {
            red: rgb,
            green: rgb,
            blue: rgb,
            alpha: 1,
        };
    }

    const q =
        adjustedLightness < 0.5
            ? adjustedLightness * (1 + adjustedSaturation)
            : adjustedLightness +
              adjustedSaturation -
              adjustedLightness * adjustedSaturation;
    const p = 2 * adjustedLightness - q;

    const red = hueToRGBValue(p, q, adjustedHue + 120);
    const green = hueToRGBValue(p, q, adjustedHue);
    const blue = hueToRGBValue(p, q, adjustedHue - 120);

    return {
        red: Math.round(red * 255),
        green: Math.round(green * 255),
        blue: Math.round(blue * 255),
        alpha: 1,
    };
};

export const convertHsvToRgb = ({
    hue,
    saturation,
    value,
}: HSVColorSpace): RGBAColorSpace => {
    const i = Math.floor(hue * 6);
    const f = hue * 6 - i;
    const p = value * (1 - saturation);
    const q = value * (1 - f * saturation);
    const t = value * (1 - (1 - f) * saturation);
    let red: number;
    let green: number;
    let blue: number;
    switch (i % 6) {
        case 0:
            red = value;
            green = t;
            blue = p;
            break;
        case 1:
            red = q;
            green = value;
            blue = p;
            break;
        case 2:
            red = p;
            green = value;
            blue = t;
            break;
        case 3:
            red = p;
            green = q;
            blue = value;
            break;
        case 4:
            red = t;
            green = p;
            blue = value;
            break;
        case 5:
            red = value;
            green = p;
            blue = q;
            break;
        default:
            red = 0;
            green = 0;
            blue = 0;
            break;
    }
    return {
        red: Math.round(red * 255),
        green: Math.round(green * 255),
        blue: Math.round(blue * 255),
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
    const colorWhiteness = whiteness / 100;
    const clorBlackness = blackness / 100;
    if (colorWhiteness + clorBlackness >= 1) {
        const gray = colorWhiteness / (colorWhiteness + clorBlackness);
        return {
            red: gray,
            green: gray,
            blue: gray,
            alpha: 1,
        };
    }
    const rgb = convertHslToRgb({ hue, saturation: 100, lightness: 50 });
    const calculateAppliedValue = (value: number) => {
        let calculatedValue = value / 255;
        calculatedValue *= 1 - colorWhiteness - clorBlackness;
        calculatedValue += colorWhiteness;
        return Math.min(Math.max(Math.floor(calculatedValue * 256), 0), 255);
    };
    rgb.red = calculateAppliedValue(rgb.red);
    rgb.green = calculateAppliedValue(rgb.green);
    rgb.blue = calculateAppliedValue(rgb.blue);
    return rgb;
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
}: HSVColorSpace): HWBColorSpace => ({
    hue,
    whiteness: ((100 - saturation) * value) / 100,
    blackness: 100 - value,
});

export const convertHwbToHsv = ({
    hue,
    whiteness,
    blackness,
}: HWBColorSpace): HSVColorSpace => ({
    hue,
    saturation:
        blackness === 100 ? 0 : 100 - (whiteness / (100 - blackness)) * 100,
    value: 100 - blackness,
});

export const convertHslToHwb = (space: HSLColorSpace): HWBColorSpace =>
    convertHsvToHwb(convertHslToHsv(space));

export const convertHwbToHsl = (space: HWBColorSpace): HSLColorSpace =>
    convertHsvToHsl(convertHwbToHsv(space));

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
