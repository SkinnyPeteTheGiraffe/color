import { HSLSpace } from './hsl.space';
import { RGBA } from '../rgba';

export const HSL = {
    fromHex(hex: string): HSLSpace {
        return RGBA.fromHex(hex).toHSL();
    },
    fromHSL(hue: number, saturation: number, lightness: number): HSLSpace {
        return new HSLSpace({ hue, saturation, lightness });
    },
    fromRGB(red: number, green: number, blue: number): HSLSpace {
        return RGBA.fromRGB(red, green, blue).toHSL();
    },
    fromRGBA(
        red: number,
        green: number,
        blue: number,
        alpha: number
    ): HSLSpace {
        return RGBA.fromRGBA(red, green, blue, alpha).toHSL();
    },
};
