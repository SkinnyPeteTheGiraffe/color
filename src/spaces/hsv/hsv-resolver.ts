import colors from '../../colors';
import HSVColorSpace from './types/hsv-space';
import rgbaConverter from '../utils/converter/rgba-converter';
import hexConverter from '../utils/converter/hex-converter';
import { ExtendedHSVSpace } from '../extensions';

export const fromHex = (hex: string): ExtendedHSVSpace =>
    new ExtendedHSVSpace(rgbaConverter.toHSV(hexConverter.toRGBA(hex)));

export const fromCssColor = (color: keyof typeof colors): ExtendedHSVSpace =>
    fromHex(colors[color]);

export const fromHSV = (
    hue: number,
    saturation: number,
    value: number
): ExtendedHSVSpace => new ExtendedHSVSpace({ hue, saturation, value });

export const fromHSVColorSpace = (space: HSVColorSpace): ExtendedHSVSpace =>
    new ExtendedHSVSpace(space);
