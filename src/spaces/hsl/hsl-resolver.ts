import HSLSpace from './hsl-space';
import colors from '../../colors';
import HslColorSpace from './types/hsl-color-space';
import { convertHexToRgb } from '../rgba/rgba-utils';
import { convertRgbToHsl } from '../utils';

export const fromHex = (hex: string): HSLSpace =>
    new HSLSpace(convertRgbToHsl(convertHexToRgb(hex)));

export const fromCssColor = (color: keyof typeof colors): HSLSpace =>
    fromHex(colors[color]);

export const fromHSL = (
    hue: number,
    saturation: number,
    lightness: number
): HSLSpace => new HSLSpace({ hue, saturation, lightness });

export const fromHSLColorSpace = (space: HslColorSpace): HSLSpace =>
    new HSLSpace(space);
