import Converter from './converter';
import RGBAColorSpace from '../../rgba/types/rgba-color-space';
import { HWBColorSpace } from '../../hwb/types';
import HSLColorSpace from '../../hsl/types/hsl-color-space';
import hslConverter from './hsl-converter';
import HSVColorSpace from '../../hsv/types/hsv-space';
import hsvConverter from './hsv-converter';
import { normalizePercent } from '../../../common';

const toHSV = ({
    hue,
    whiteness,
    blackness,
}: HWBColorSpace): HSVColorSpace => ({
    hue,
    saturation: Math.round(
        blackness === 100 ? 0 : 100 - (whiteness / (100 - blackness)) * 100
    ),
    value: Math.round(100 - blackness),
});

const toHSL = (space: HWBColorSpace): HSLColorSpace =>
    hsvConverter.toHSL(toHSV(space));

const toRGBA = (space: HWBColorSpace): RGBAColorSpace => {
    const { hue, ...rest } = space;
    const whiteness = normalizePercent(rest.whiteness);
    const blackness = normalizePercent(rest.blackness);
    const rgb = hslConverter.toRGBA({ hue, saturation: 100, lightness: 50 });
    const keys = Object.keys(rgb) as Array<keyof RGBAColorSpace>;
    keys.forEach((key) => {
        let channel = rgb[key] / 255;

        channel *= 1 - whiteness - blackness;
        channel += whiteness;

        rgb[key] = Math.round(channel * 255);
    });
    return {
        ...rgb,
        alpha: 1,
    };
};

const hwbConverter: Omit<Converter<HWBColorSpace>, 'toHWB'> = {
    toHSL,
    toHSV,
    toRGBA,
};

export default hwbConverter;
