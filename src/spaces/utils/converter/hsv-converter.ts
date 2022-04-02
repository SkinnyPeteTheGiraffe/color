import Converter from './converter';
import HSLColorSpace from '../../hsl/types/hsl-color-space';
import HSVColorSpace from '../../hsv/types/hsv-space';
import HWBColorSpace from '../../hwb/types/hwb-space';
import RGBAColorSpace from '../../rgba/types/rgba-color-space';
import { normalizePercent, normalizeRotation } from '../../../common';

const toHSL = ({ hue, saturation, value }: HSVColorSpace): HSLColorSpace => {
    const hslL = ((200 - saturation) * value) / 100;

    return {
        hue,
        saturation: Math.round(
            hslL === 0 || hslL === 200
                ? 0
                : ((saturation * value) /
                      100 /
                      (hslL <= 100 ? hslL : 200 - hslL)) *
                      100
        ),
        lightness: Math.round((hslL * 5) / 10),
    };
};

const toHWB = ({ hue, saturation, value }: HSVColorSpace): HWBColorSpace => ({
    hue,
    whiteness: Math.round(((100 - saturation) * value) / 100),
    blackness: Math.round(100 - value),
});

const toRGBA = ({ hue, saturation, value }: HSVColorSpace): RGBAColorSpace => {
    const h = normalizeRotation(hue) / 360;
    const s = normalizePercent(saturation);
    const v = normalizePercent(value);
    let red: number;
    let green: number;
    let blue: number;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            red = v;
            green = t;
            blue = p;
            break;
        case 1:
            red = q;
            green = v;
            blue = p;
            break;
        case 2:
            red = p;
            green = v;
            blue = t;
            break;
        case 3:
            red = p;
            green = q;
            blue = v;
            break;
        case 4:
            red = t;
            green = p;
            blue = v;
            break;
        case 5:
            red = v;
            green = p;
            blue = q;
            break;
        default:
            red = 0;
            green = 0;
            blue = 0;
    }
    return {
        red: Math.round(red * 255),
        green: Math.round(green * 255),
        blue: Math.round(blue * 255),
        alpha: 1,
    };
};

const hsvConverter: Omit<Converter<HSVColorSpace>, 'toHSV'> = {
    toHSL,
    toHWB,
    toRGBA,
};

export default hsvConverter;
