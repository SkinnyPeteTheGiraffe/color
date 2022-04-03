import { ModelType } from './base';
import { KeyedSpace } from './types';
import { toColorSpace } from './space-extender';
import {
    Converter,
    hslConverter,
    hsvConverter,
    hwbConverter,
    rgbaConverter,
} from './utils';
import RGBSpace from './rgba/rgba-space';
import RGBAColorSpace from './rgba/types/rgba-color-space';
import HSLSpace from './hsl/hsl-space';
import HSLColorSpace from './hsl/types/hsl-color-space';
import { HSVSpace } from './hsv';
import HSVColorSpace from './hsv/types/hsv-space';
import { HWBSpace } from './hwb';
import { HWBColorSpace } from './hwb/types';

/* -------------- RGBA -------------- */
export class ExtendedRGBASpace extends RGBSpace {
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
        >(this.space, rgbaConverter, space, {
            HSL: ExtendedHSLSpace,
            HSV: ExtendedHSVSpace,
            HWB: ExtendedHWBSpace,
        });
    }
}

/* -------------- HSL -------------- */
export class ExtendedHSLSpace extends HSLSpace {
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
        >(this.space, hslConverter, space, {
            RGBA: ExtendedRGBASpace,
            HSV: ExtendedHSVSpace,
            HWB: ExtendedHWBSpace,
        });
    }
}

/* -------------- HSV -------------- */
export class ExtendedHSVSpace extends HSVSpace {
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
        >(this.space, hsvConverter, space, {
            HSL: ExtendedHSLSpace,
            HWB: ExtendedHWBSpace,
            RGBA: ExtendedRGBASpace,
        });
    }
}

/* -------------- HWB -------------- */
export class ExtendedHWBSpace extends HWBSpace {
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
        >(this.space, hwbConverter, space, {
            HSL: ExtendedHSLSpace,
            HSV: ExtendedHSVSpace,
            RGBA: ExtendedRGBASpace,
        });
    }
}
