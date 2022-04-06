import HSLSpace from '../hsl/hsl-space';
import { ModelType } from '../types/base';
import KeyedSpace from '../types/keyed-spaced';
import { ExtendedRGBASpace } from './rgba-extended';
import { toColorSpace } from '../space-extender';
import HSLColorSpace from '../hsl/types/hsl-color-space';
import Converter from '../utils/converter/converter';
import hslConverter from '../utils/converter/hsl-converter';
import { ExtendedHWBSpace } from './hwb-extended';
import { ExtendedHSVSpace } from './hsv-extended';

export class ExtendedHSLSpace extends HSLSpace {
    /**
     * @inheritDoc
     */
    public clone(): ExtendedHSLSpace {
        return new ExtendedHSLSpace(this.model);
    }

    public applyModel(model: HSLColorSpace): ExtendedHSLSpace {
        super.applyModel(model);
        return this;
    }

    /**
     * @inheritDoc
     */
    public setColor(
        color: keyof HSLColorSpace,
        value: number
    ): ExtendedHSLSpace {
        super.setColor(color, value);
        return this;
    }

    /**
     * Converts the HSL color space to the model matching the provided key.
     * @param space The color model to convert the space to
     *
     * @returns A new instance of the color space which matches the provided key otherwise `null`
     */
    public toSpace<T extends ModelType>(
        space: T
    ): KeyedSpace<
        T,
        ExtendedHSVSpace,
        ExtendedHWBSpace,
        null,
        ExtendedRGBASpace
    > {
        return toColorSpace<
            HSLColorSpace,
            T,
            Converter<HSLColorSpace>,
            ExtendedHSVSpace,
            ExtendedHWBSpace,
            null,
            ExtendedRGBASpace
        >(this.model, hslConverter, space, {
            RGBA: ExtendedRGBASpace,
            HSV: ExtendedHSVSpace,
            HWB: ExtendedHWBSpace,
        });
    }
}
