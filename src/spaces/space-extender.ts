import Converter from './utils/converter/converter';
import HSVSpace from './hsv/hsv-space';
import RGBASpace from './rgba/rgba-space';
import HWBSpace from './hwb/hwb-space';
import { ModelType } from './base';
import { KeyedSpace } from './types';
import { HSLSpace } from './hsl';

/**
 * Allows for converting the current color space to another by providing
 * a {@link ModelType}, if the space provided doesn't match anything then
 * this will return null. This converts the current color space to the
 * specified space, and instantiates a new instance of the selected space.
 *
 * @remarks During the conversion process in there may be a loss of precision (usually negligible)
 *
 * @example ```ts
 * const hsl: HSLSpace = rgba.toSpace('hsl')
 * const hwb: HSLSpace = rgba.toSpace('hwb')
 * const hsv: HSLSpace = rgba.toSpace('hsv')
 * ```
 *
 * @return {KeyedSpace<ModelType>} the function provided instantiated with the converted color space
 */
export const toColorSpace = <
    T,
    M extends ModelType,
    C extends Converter<T>,
    H = null,
    W = null,
    L = null,
    R = null
>(
    data: T,
    converter: Partial<C>,
    space: ModelType,
    overrides?: {
        HSL?: typeof HSLSpace;
        RGBA?: typeof RGBASpace;
        HSV?: typeof HSVSpace;
        HWB?: typeof HWBSpace;
    }
): KeyedSpace<M, H, W, L, R> => {
    switch (space) {
        case 'hsv':
            if (converter.toHSV) {
                return new HSVSpace(converter.toHSV(data)) as KeyedSpace<
                    M,
                    H,
                    W,
                    L,
                    R
                >;
            }
            break;
        case 'hsl':
            if (converter.toHSL) {
                if (overrides?.HSL) {
                    const { HSL } = overrides;
                    return new HSL(converter.toHSL(data)) as KeyedSpace<
                        M,
                        H,
                        W,
                        L,
                        R
                    >;
                }
                return new HSLSpace(converter.toHSL(data)) as KeyedSpace<
                    M,
                    H,
                    W,
                    L,
                    R
                >;
            }
            break;
        case 'rgb':
            if (converter.toRGBA) {
                if (overrides?.RGBA) {
                    return new overrides.RGBA(
                        converter.toRGBA(data)
                    ) as KeyedSpace<M, H, W, L, R>;
                }
                return new RGBASpace(converter.toRGBA(data)) as KeyedSpace<
                    M,
                    H,
                    W,
                    L,
                    R
                >;
            }
            break;
        case 'hwb':
            if (converter.toHWB) {
                return new HWBSpace(converter.toHWB(data)) as KeyedSpace<
                    M,
                    H,
                    W,
                    L,
                    R
                >;
            }
            break;
        default:
            return null as KeyedSpace<M, H, W, L, R>;
    }
    return null as KeyedSpace<M, H, W, L, R>;
};
