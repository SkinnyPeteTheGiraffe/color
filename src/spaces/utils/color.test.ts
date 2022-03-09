import RGBAColorSpace from '../rgba/types/rgba-color-space';
import HWBColorSpace from '../hwb/types/hwb-space';
import HSLColorSpace from '../hsl/types/hsl-color-space';
import {
    convertHslToRgb,
    convertHwbToRgb,
    convertRgbToHsl,
    convertRgbToHwb,
} from './color';

describe('model color utils', () => {
    it('should convert rgba to hsl successfully', () => {
        expect(
            convertRgbToHsl({ red: 0, green: 221, blue: 255, alpha: 1 })
        ).toMatchObject<HSLColorSpace>({
            hue: 188,
            saturation: 100,
            lightness: 50,
        });
    });

    it('should convert hsl to rgba successfully', () => {
        expect(
            convertHslToRgb({ hue: 188, saturation: 1, lightness: 0.5 })
        ).toMatchObject<RGBAColorSpace>({
            red: 0,
            green: 221,
            blue: 255,
            alpha: 1,
        });
    });

    it('should convert rgb to hwb successfully', () => {
        expect(
            convertRgbToHwb({ red: 55, green: 191, blue: 255, alpha: 1 })
        ).toMatchObject<HWBColorSpace>({
            hue: 199,
            whiteness: 22,
            blackness: 0,
        });
    });

    it('should convert hwb to rgb successfully', () => {
        expect(
            convertHwbToRgb({
                hue: 199,
                whiteness: 22,
                blackness: 0,
            })
        ).toMatchObject<RGBAColorSpace>({
            red: 56,
            green: 192,
            blue: 255,
            alpha: 1,
        });
    });
});
