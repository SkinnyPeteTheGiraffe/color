import colors from '../../colors';
import { ModelType } from './base';

type TypedResolver<T, S, M extends ModelType> = M extends 'rgb'
    ? {
          fromRGBA(red: number, green: number, blue: number, alpha?: number): T;
          fromRGBAColorSpace(space: S): T;
      }
    : M extends 'hsl'
    ? {
          fromHSL(hue: number, saturation: number, lightness: number): T;
          fromHSLColorSpace(space: S): T;
      }
    : M extends 'hsv'
    ? {
          fromHSV(hue: number, saturation: number, value: number): T;
          fromHSVColorSpace(space: S): T;
      }
    : M extends 'hwb'
    ? {
          fromHWB(hue: number, whiteness: number, blackness: number): T;
          fromHWBColorSpace(space: S): T;
      }
    : null;

interface BaseResolver<T> {
    /**
     * Create a {@link RGBASpace} instance from a valid color hex value.
     *
     * @remarks Accepts both shorthand and full hex values and with or without a # (Ex. #FFF / #FFFFFF / FFF / FFFFFF)
     *
     * @param hex a valid string hex color value
     * @return New {@link RGBASpace} instance of the hex color value
     */
    fromHex(hex: string): T;
    fromCssColor(color: keyof typeof colors): T;
}

type SpaceResolver<T, S, M extends ModelType> = BaseResolver<T> &
    TypedResolver<T, S, M>;

export default SpaceResolver;
