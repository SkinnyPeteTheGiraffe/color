import colors from '../../colors';
import { convertHexToRgb } from '../rgba/rgba-utils';
import { convertRgbToHsv } from '../utils';
import HSVSpace from './hsv-space';
import { HSVColorSpace } from './types';

export const fromHex = (hex: string): HSVSpace =>
    new HSVSpace(convertRgbToHsv(convertHexToRgb(hex)));

export const fromCssColor = (color: keyof typeof colors): HSVSpace =>
    fromHex(colors[color]);

export const fromHSV = (
    hue: number,
    saturation: number,
    value: number
): HSVSpace => new HSVSpace({ hue, saturation, value });

export const fromHSVColorSpace = (space: HSVColorSpace): HSVSpace =>
    new HSVSpace(space);
