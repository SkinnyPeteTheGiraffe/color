import colors from '../../colors';
import HSVSpace from './hsv-space';
import HSVColorSpace from './types/hsv-space';
import { hexConverter, rgbaConverter } from '../utils';

export const fromHex = (hex: string): HSVSpace =>
    new HSVSpace(rgbaConverter.toHSV(hexConverter.toRGBA(hex)));

export const fromCssColor = (color: keyof typeof colors): HSVSpace =>
    fromHex(colors[color]);

export const fromHSV = (
    hue: number,
    saturation: number,
    value: number
): HSVSpace => new HSVSpace({ hue, saturation, value });

export const fromHSVColorSpace = (space: HSVColorSpace): HSVSpace =>
    new HSVSpace(space);
