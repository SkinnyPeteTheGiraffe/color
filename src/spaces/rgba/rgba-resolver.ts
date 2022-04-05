import { ExtendedRGBASpace } from '../extensions';
import colors from '../../colors';
import RGBAColorSpace from './types/rgba-color-space';
import hexConverter from '../utils/converter/hex-converter';
import SpaceResolver from '../types/space-resolver';

/**
 * Create a {@link RGBASpace} instance from a valid color hex value.
 *
 * @remarks Accepts both shorthand and full hex values and with or without a # (Ex. #FFF / #FFFFFF / FFF / FFFFFF)
 *
 * @param hex a valid string hex color value
 * @return {RGBASpace} New instance of the hex color value
 */
export const fromHex = (hex: string): ExtendedRGBASpace =>
    new ExtendedRGBASpace(hexConverter.toRGBA(hex));

/**
 * Create a {@link RGBASpace} instance from a valid color hex value.
 *
 * @remarks Accepts both shorthand and full hex values and with or without a # (Ex. #FFF / #FFFFFF / FFF / FFFFFF)
 *
 * @param hex a valid string hex color value
 * @return {ExtendedRGBASpace} New instance of the hex color value
 */
export const fromCssColor = (color: keyof typeof colors): ExtendedRGBASpace =>
    fromHex(colors[color]);

export const fromRGBA = (
    red: number,
    green: number,
    blue: number,
    alpha = 1
): ExtendedRGBASpace => new ExtendedRGBASpace({ red, green, blue, alpha });

export const fromRGBAColorSpace = (space: RGBAColorSpace): ExtendedRGBASpace =>
    new ExtendedRGBASpace(space);

export const RGBA: SpaceResolver<ExtendedRGBASpace, RGBAColorSpace, 'rgb'> = {
    fromHex: (hex: string): ExtendedRGBASpace =>
        new ExtendedRGBASpace(hexConverter.toRGBA(hex)),
    fromCssColor: (color: keyof typeof colors): ExtendedRGBASpace =>
        fromHex(colors[color]),
    fromRGBA: (
        red: number,
        green: number,
        blue: number,
        alpha = 1
    ): ExtendedRGBASpace => new ExtendedRGBASpace({ red, green, blue, alpha }),
    fromRGBAColorSpace: (space: RGBAColorSpace): ExtendedRGBASpace =>
        new ExtendedRGBASpace(space),
};
