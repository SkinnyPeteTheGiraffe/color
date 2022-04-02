import HSLSpace from './hsl-space';
import colors from '../../colors';
import HSLColorSpace from './types/hsl-color-space';
import { hexConverter, rgbaConverter } from '../utils';

export const fromHex = (hex: string): HSLSpace =>
    new HSLSpace(rgbaConverter.toHSL(hexConverter.toRGBA(hex)));

export const fromCssColor = (color: keyof typeof colors): HSLSpace =>
    fromHex(colors[color]);

export const fromHSL = (
    hue: number,
    saturation: number,
    lightness: number
): HSLSpace => new HSLSpace({ hue, saturation, lightness });

export const fromHSLColorSpace = (space: HSLColorSpace): HSLSpace =>
    new HSLSpace(space);
