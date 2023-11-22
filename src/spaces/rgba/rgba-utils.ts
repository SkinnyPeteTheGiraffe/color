import RGBAColorSpace from './types/rgba-color-space';
import { normalizePercent } from '../../common/utils/number-tools';

export const mixRGBASpaces = (
    base: RGBAColorSpace,
    additive: RGBAColorSpace,
    weight: number
): RGBAColorSpace => {
    const normalized = normalizePercent(weight);
    const w = normalized * 2 - 1;
    const a = additive.alpha - base.alpha;
    let w1: number;
    if (w * a === -1) {
        w1 = (w + 1) / 2;
    } else {
        w1 = ((w + a) / (1 + w * a) + 1) / 2;
    }
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
            Math.max(
                additive.alpha * normalized + base.alpha * (1 - normalized),
                0
            ),
            1
        ),
    };
};

function twoDigitHex(value: number) {
    return value.toString(16).padStart(2, '0');
}

export const rgbaSpaceToHexString = (
    space: RGBAColorSpace,
    removeHashtag?: boolean
): string =>
    `${!removeHashtag ? '#' : ''}${twoDigitHex(space.red)}${twoDigitHex(
        space.green
    )}${twoDigitHex(space.blue)}`;

export const applyGreyscaleToRGBASpace = (
    space: RGBAColorSpace
): RGBAColorSpace => {
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
