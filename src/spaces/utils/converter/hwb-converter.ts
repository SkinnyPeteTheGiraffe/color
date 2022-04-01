import Converter from './converter';
import RGBAColorSpace from '../../rgba/types/rgba-color-space';
import { HWBColorSpace } from '../../hwb/types';
import HSLColorSpace from '../../hsl/types/hsl-color-space';
import hslConverter from './hsl-converter';
import HSVColorSpace from '../../hsv/types/hsv-space';
import hsvConverter from './hsv-converter';

const toHSV = ({
    hue,
    whiteness,
    blackness,
}: HWBColorSpace): HSVColorSpace => ({
    hue,
    saturation:
        blackness === 100 ? 0 : 100 - (whiteness / (100 - blackness)) * 100,
    value: 100 - blackness,
});

const toHSL = (space: HWBColorSpace): HSLColorSpace =>
    hsvConverter.toHSL(toHSV(space));

const toRGBA = ({
    hue,
    whiteness,
    blackness,
}: HWBColorSpace): RGBAColorSpace => {
    const colorWhiteness = whiteness / 100;
    const clorBlackness = blackness / 100;
    if (colorWhiteness + clorBlackness >= 1) {
        const gray = colorWhiteness / (colorWhiteness + clorBlackness);
        return {
            red: gray,
            green: gray,
            blue: gray,
            alpha: 1,
        };
    }
    const rgb = hslConverter.toRGBA({ hue, saturation: 100, lightness: 50 });
    const calculateAppliedValue = (value: number) => {
        let calculatedValue = value / 255;
        calculatedValue *= 1 - colorWhiteness - clorBlackness;
        calculatedValue += colorWhiteness;
        return Math.min(Math.max(Math.floor(calculatedValue * 256), 0), 255);
    };
    rgb.red = calculateAppliedValue(rgb.red);
    rgb.green = calculateAppliedValue(rgb.green);
    rgb.blue = calculateAppliedValue(rgb.blue);
    return rgb;
};

const hwbConverter: Omit<Converter<HWBColorSpace>, 'toHWB'> = {
    toHSL,
    toHSV,
    toRGBA,
};

export default hwbConverter;
