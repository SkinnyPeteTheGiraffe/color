import { ExtendedRGBASpace } from '../extensions';
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
export const fromHex = (hex: string): ExtendedRGBASpace =>
    new ExtendedRGBASpace(hexConverter.toRGBA(hex));

export const fromCssColor = (color: keyof typeof colors): ExtendedRGBASpace =>
    fromHex(colors[color]);

export const fromRGB = (
    red: number,
    green: number,
    blue: number
): ExtendedRGBASpace => new ExtendedRGBASpace({ red, green, blue, alpha: 1 });

export const fromRGBA = (
    red: number,
    green: number,
    blue: number,
    alpha: number
): ExtendedRGBASpace => new ExtendedRGBASpace({ red, green, blue, alpha });

export const fromRGBAColorSpace = (space: RGBAColorSpace): ExtendedRGBASpace =>
    new ExtendedRGBASpace(space);
