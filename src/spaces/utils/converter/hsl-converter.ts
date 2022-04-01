import Converter from './converter';
import HSLColorSpace from '../../hsl/types/hsl-color-space';
import RGBAColorSpace from '../../rgba/types/rgba-color-space';
import HSVColorSpace from '../../hsv/types/hsv-space';
import HWBColorSpace from '../../hwb/types/hwb-space';
import { normalizePercent } from '../../../common';

/**
 * Takes in hue values, clamps them, and converts to RGB value,
 * within the range of [0,255]
 * @param {number} p The adjusted lightness value
 * @param {number} q The saturated lightness value
 * @param {number} t The adjusted hue position
 *
 * @return {number} A RGB value within the range of [0,255]
 */
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

const toHSV = ({
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

const toHWB = (space: HSLColorSpace): HWBColorSpace => {
    const hsv = toHSV(space);
    const { hue, saturation: rawSaturation, value: rawValue } = hsv;
    const saturation = normalizePercent(rawSaturation);
    const value = normalizePercent(rawValue);
    const whiteness = (1 - saturation) * value;
    const blackness = 1 - value;
    return {
        hue,
        whiteness: Math.round(whiteness),
        blackness: Math.round(blackness),
    };
};

/**
 * Converts an HSL color value to RGB. Formula modeled from
 * https://en.wikipedia.org/wiki/HSL_and_HSV. This function assumes
 * HSL values are as follows; H [0,360], S [0,1], L[0,1]. The out RGB color
 * values are within the domain of [0,255]
 *
 * @author https://css-tricks.com/converting-color-spaces-in-javascript/#aa-hsl-to-rgb
 *
 * @param {HSLColorSpace} model the RGB color model to convert to HSL
 * @return {RGBAColorSpace} the converted HSL color model
 */
const toRGBA = ({
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

const hslConverter: Omit<Converter<HSLColorSpace>, 'toHSL'> = {
    toHSV,
    toHWB,
    toRGBA,
};

export default hslConverter;
