import { ModelType } from '../types/base';
import KeyedSpace from '../types/keyed-spaced';
import Converter from '../utils/converter/converter';
import RGBASpace from '../rgba/rgba-space';
import RGBAColorSpace from '../rgba/types/rgba-color-space';
import rgbaConverter from '../utils/converter/rgba-converter';
import { ExtendedHSLSpace } from './hsl-extended';
import { ExtendedHSVSpace } from './hsv-extended';
import { ExtendedHWBSpace } from './hwb-extended';
import { toColorSpace } from '../space-extender';

export class ExtendedRGBASpace extends RGBASpace {
    /**
     * @inheritDoc
     */
    public blacken(ratio: number): ExtendedRGBASpace {
        super.blacken(ratio);
        return this;
    }

    /**
     * @inheritDoc
     */
    public clone(): ExtendedRGBASpace {
        return new ExtendedRGBASpace(this.model);
    }

    /**
     * @inheritDoc
     */
    public darken(ratio: number): ExtendedRGBASpace {
        super.darken(ratio);
        return this;
    }

    /**
     * @inheritDoc
     */
    public desaturate(ratio: number): ExtendedRGBASpace {
        super.desaturate(ratio);
        return this;
    }

    /**
     * @inheritDoc
     */
    public applyModel(model: RGBAColorSpace): ExtendedRGBASpace {
        super.applyModel(model);
        return this;
    }

    /**
     * @inheritDoc
     */
    public setColor(
        color: keyof RGBAColorSpace,
        value: number
    ): ExtendedRGBASpace {
        super.setColor(color, value);
        return this;
    }

    /**
     * @inheritDoc
     */
    public fade(ratio: number): ExtendedRGBASpace {
        super.fade(ratio);
        return this;
    }

    /**
     * @inheritDoc
     */
    public fill(ratio: number): ExtendedRGBASpace {
        super.fill(ratio);
        return this;
    }

    /**
     * @inheritDoc
     */
    public grayscale(): ExtendedRGBASpace {
        super.grayscale();
        return this;
    }

    /**
     * @inheritDoc
     */
    public lighten(ratio: number): ExtendedRGBASpace {
        super.lighten(ratio);
        return this;
    }

    /**
     * @inheritDoc
     */
    public mix(color: RGBAColorSpace, weight = 0.5): ExtendedRGBASpace {
        super.mix(color, weight);
        return this;
    }

    /**
     * @inheritDoc
     */
    public rotate(degrees: number): ExtendedRGBASpace {
        super.rotate(degrees);
        return this;
    }

    /**
     * @inheritDoc
     */
    public saturate(ratio: number): ExtendedRGBASpace {
        super.saturate(ratio);
        return this;
    }

    /**
     * @inheritDoc
     */
    public setOpacity(percent: number): ExtendedRGBASpace {
        super.setOpacity(percent);
        return this;
    }

    /**
     * @inheritDoc
     */
    public whiten(ratio: number): ExtendedRGBASpace {
        super.whiten(ratio);
        return this;
    }

    /**
     * Converts the RGBA color space to the model matching the provided key.
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
        ExtendedHSLSpace,
        null
    > {
        return toColorSpace<
            RGBAColorSpace,
            T,
            Converter<RGBAColorSpace>,
            ExtendedHSVSpace,
            ExtendedHWBSpace,
            ExtendedHSLSpace,
            null
        >(this.model, rgbaConverter, space, {
            HSL: ExtendedHSLSpace,
            HSV: ExtendedHSVSpace,
            HWB: ExtendedHWBSpace,
        });
    }
}
