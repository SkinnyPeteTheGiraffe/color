import { ModelType } from '../types/base';
import KeyedSpace from '../types/keyed-spaced';
import { ExtendedRGBASpace } from './rgba-extended';
import { toColorSpace } from '../space-extender';
import Converter from '../utils/converter/converter';
import HWBSpace from '../hwb/hwb-space';
import HWBColorSpace from '../hwb/types/hwb-color-space';
import hwbConverter from '../utils/converter/hwb-converter';
import { ExtendedHSLSpace } from './hsl-extended';
import { ExtendedHSVSpace } from './hsv-extended';

export class ExtendedHWBSpace extends HWBSpace {
    /**
     * @inheritDoc
     */
    public clone(): ExtendedHWBSpace {
        return new ExtendedHWBSpace(this.model);
    }

    /**
     * @inheritDoc
     */
    public applyModel(model: HWBColorSpace): ExtendedHWBSpace {
        super.applyModel(model);
        return this;
    }

    /**
     * @inheritDoc
     */
    public setColor(
        color: keyof HWBColorSpace,
        value: number
    ): ExtendedHWBSpace {
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
        null,
        ExtendedHSLSpace,
        ExtendedRGBASpace
    > {
        return toColorSpace<
            HWBColorSpace,
            T,
            Converter<HWBColorSpace>,
            ExtendedHSVSpace,
            null,
            ExtendedHSLSpace,
            ExtendedRGBASpace
        >(this.model, hwbConverter, space, {
            HSL: ExtendedHSLSpace,
            HSV: ExtendedHSVSpace,
            RGBA: ExtendedRGBASpace,
        });
    }
}
