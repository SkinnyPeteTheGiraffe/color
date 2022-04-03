import colors from '../../colors';
import HSLColorSpace from './types/hsl-color-space';
import { hexConverter, rgbaConverter } from '../utils';
import { ExtendedHSLSpace } from '../extensions';

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
