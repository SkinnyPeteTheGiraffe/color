import RGBASpace from './rgba-space';
import colors from '../../colors';
import RGBAColorSpace from './types/rgba-color-space';
import { hexConverter } from '../utils';

/**
 * Create a {@link RGBASpace} instance from a valid color hex value.
 *
 * @remarks Accepts both shorthand and full hex values and with or without a # (Ex. #FFF / #FFFFFF / FFF / FFFFFF)
 *
 * @param hex a valid string hex color value
 * @return New {@link RGBASpace} instance of the hex color value
 */
export const fromHex = (hex: string): RGBASpace =>
    new RGBASpace(hexConverter.toRGBA(hex));

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
