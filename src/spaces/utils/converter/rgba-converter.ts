import RGBAColorSpace from '../../rgba/types/rgba-color-space';
import HWBColorSpace from '../../hwb/types/hwb-color-space';
import HSLColorSpace from '../../hsl/types/hsl-color-space';
import HSVColorSpace from '../../hsv/types/hsv-color-space';
import Converter from './converter';
import {
    clampNumericValue,
    normalizeRotation,
} from '../../../common/utils/number-tools';

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
 * Converts an RGB color value to HWB. Formula modeled from
 * https://en.wikipedia.org/wiki/HWB_color_model. This function assumes
 * RGB values are within the domain of [0,255], and the output HWB values
 * are as follows. H [0,360], W [0,1], B[0,1]
 *
 * @param {RGBAColorSpace} space the RGB color model to convert to HWB
 * @return {HWBColorSpace} the converted HWB color model
 */
export const toHWB = (space: RGBAColorSpace): HWBColorSpace => {
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

/**
 * Converts an RGB color value to HSL. Formula modeled from
 * https://en.wikipedia.org/wiki/HSL_and_HSV. This function assumes
 * RGB values are within the domain of [0,255], and the output HSL values
 * are as follows. H [0,360], S [0,1], L[0,1]
 *
 * @param {RGBAColorSpace} model the RGB color model to convert to HSL
 * @return {HSLColorSpace} the converted HSL color model
 */
export const toHSL = ({ red, green, blue }: RGBAColorSpace): HSLColorSpace => {
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

    hue = normalizeRotation(hue * 60);

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
 * Converts an RGB color value to HSV. Formula modeled from
 * https://en.wikipedia.org/wiki/HSL_and_HSV. This function assumes
 * RGB values are within the domain of [0,255], and the output HSV values
 * are as follows. H [0,360], S [0,100], L[0,100]
 *
 * @param {RGBAColorSpace} model the RGB color model to convert to HSV
 * @return {HSVColorSpace} the converted HSV color model
 */
export const toHSV = ({ red, green, blue }: RGBAColorSpace): HSVColorSpace => {
    // Convert values from 0-255 to 0-1
    const redRatio = red / 255;
    const greenRatio = green / 255;
    const blueRatio = blue / 255;
    // Find both min/max values then calc their range
    const min = Math.min(redRatio, greenRatio, blueRatio);
    const max = Math.max(redRatio, greenRatio, blueRatio);
    const delta = max - min;
    const saturation = max === 0 ? 0 : delta / max;
    let hue = 0;
    if (max !== min) {
        switch (max) {
            case redRatio:
                hue =
                    (greenRatio - blueRatio) / delta +
                    (greenRatio < blueRatio ? 6 : 0);
                break;
            case greenRatio:
                hue = (blueRatio - redRatio) / delta + 2;
                break;
            case blueRatio:
                hue = (redRatio - greenRatio) / delta + 4;
                break;
        }
        hue /= 6;
    }
    return {
        hue: clampNumericValue(Math.round(hue * 360), 0, 360),
        saturation: clampNumericValue(Math.round(saturation * 100), 0, 100),
        value: clampNumericValue(Math.round(max * 100), 0, 100),
    };
};

const rgbaConverter: Omit<Converter<RGBAColorSpace>, 'toRGBA'> = {
    toHSL,
    toHSV,
    toHWB,
};

export default rgbaConverter;
