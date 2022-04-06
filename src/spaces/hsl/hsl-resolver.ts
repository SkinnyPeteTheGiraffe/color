import colors from '../../colors';
import HSLColorSpace from './types/hsl-color-space';
import rgbaConverter from '../utils/converter/rgba-converter';
import hexConverter from '../utils/converter/hex-converter';
import { ExtendedHSLSpace } from '../extended/hsl-extended';

export const fromHex = (hex: string): ExtendedHSLSpace =>
    new ExtendedHSLSpace(rgbaConverter.toHSL(hexConverter.toRGBA(hex)));

export const fromCssColor = (color: keyof typeof colors): ExtendedHSLSpace =>
    fromHex(colors[color]);

export const fromHSL = (
    hue: number,
    saturation: number,
    lightness: number
): ExtendedHSLSpace => new ExtendedHSLSpace({ hue, saturation, lightness });

export const fromHSLColorSpace = (space: HSLColorSpace): ExtendedHSLSpace =>
    new ExtendedHSLSpace(space);
