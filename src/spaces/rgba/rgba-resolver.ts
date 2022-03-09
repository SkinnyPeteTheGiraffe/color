import RGBASpace from './rgba-space';
import colors from '../../colors';
import { convertHexToRgb } from './rgba-utils';
import RGBAColorSpace from './types/rgba-color-space';

export const fromHex = (hex: string): RGBASpace =>
    new RGBASpace(convertHexToRgb(hex));

export const fromCssColor = (color: keyof typeof colors): RGBASpace =>
    fromHex(colors[color]);

export const fromRGB = (red: number, green: number, blue: number): RGBASpace =>
    new RGBASpace({ red, green, blue, alpha: 1 });

export const fromRGBA = (
    red: number,
    green: number,
    blue: number,
    alpha: number
): RGBASpace => new RGBASpace({ red, green, blue, alpha });

export const fromRGBAColorSpace = (space: RGBAColorSpace): RGBASpace =>
    new RGBASpace(space);