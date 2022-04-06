import { ModelType } from '../types/base';
import Converter from '../utils/converter/converter';
import KeyedSpace from '../types/keyed-spaced';
import HSVSpace from '../hsv/hsv-space';
import HSVColorSpace from '../hsv/types/hsv-color-space';
import hsvConverter from '../utils/converter/hsv-converter';
import { ExtendedRGBASpace } from './rgba-extended';
import { ExtendedHSLSpace } from './hsl-extended';
import { ExtendedHWBSpace } from './hwb-extended';
import { toColorSpace } from '../space-extender';

export class ExtendedHSVSpace extends HSVSpace {
    /**
     * @inheritDoc
     */
    public blacken(ratio: number): ExtendedHSVSpace {
        super.blacken(ratio);
        return this;
    }

    /**
     * @inheritDoc
     */
    public clone(): ExtendedHSVSpace {
        return new ExtendedHSVSpace(this.model);
    }

    /**
     * @inheritDoc
     */
    public darken(ratio: number): ExtendedHSVSpace {
        super.darken(ratio);
        return this;
    }

    /**
     * @inheritDoc
     */
    public desaturate(ratio: number): ExtendedHSVSpace {
        super.desaturate(ratio);
        return this;
    }

    /**
     * @inheritDoc
     */
    public applyModel(model: HSVColorSpace): ExtendedHSVSpace {
        super.applyModel(model);
        return this;
    }

    /**
     * @inheritDoc
     */
    public setColor(
        color: keyof HSVColorSpace,
        value: number
    ): ExtendedHSVSpace {
        super.setColor(color, value);
        return this;
    }

    /**
     * @inheritDoc
     */
    public grayscale(): ExtendedHSVSpace {
        super.grayscale();
        return this;
    }

    /**
     * @inheritDoc
     */
    public lighten(ratio: number): ExtendedHSVSpace {
        super.lighten(ratio);
        return this;
    }

    /**
     * @inheritDoc
     */
    public mix(color: HSVColorSpace, weight = 0.5): ExtendedHSVSpace {
        super.mix(color, weight);
        return this;
    }

    /**
     * @inheritDoc
     */
    public rotate(degrees: number): ExtendedHSVSpace {
        super.rotate(degrees);
        return this;
    }

    /**
     * @inheritDoc
     */
    public saturate(ratio: number): ExtendedHSVSpace {
        super.saturate(ratio);
        return this;
    }

    /**
     * @inheritDoc
     */
    public whiten(ratio: number): ExtendedHSVSpace {
        super.whiten(ratio);
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
        null,
        ExtendedHWBSpace,
        ExtendedHSLSpace,
        ExtendedRGBASpace
    > {
        return toColorSpace<
            HSVColorSpace,
            T,
            Converter<HSVColorSpace>,
            null,
            ExtendedHWBSpace,
            ExtendedHSLSpace,
            ExtendedRGBASpace
        >(this.model, hsvConverter, space, {
            HSL: ExtendedHSLSpace,
            HWB: ExtendedHWBSpace,
            RGBA: ExtendedRGBASpace,
        });
    }
}
