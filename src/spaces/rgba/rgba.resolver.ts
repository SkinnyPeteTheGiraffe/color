import { RGBASpace } from './rgba.space';
import { convertHexToRgb } from './rgba.utils';

export const RGBA = {
    fromHex(hex: string): RGBASpace {
        return new RGBASpace(convertHexToRgb(hex));
    },
    fromRGB(red: number, green: number, blue: number): RGBASpace {
        return new RGBASpace({ red, green, blue, alpha: 1 });
    },
    fromRGBA(
        red: number,
        green: number,
        blue: number,
        alpha: number
    ): RGBASpace {
        return new RGBASpace({ red, green, blue, alpha });
    },
};
