import { convertHslToRgb, convertRgbToHsl, convertRgbToHwb } from './color';

describe('model color utils', function () {
    it('should convert rgba to hsl successfully', () => {
        expect(
            convertRgbToHsl({ red: 0, green: 221, blue: 255, alpha: 1 })
        ).toMatchObject({
            hue: 188,
            saturation: 1,
            lightness: 0.5,
        });
    });

    it('should convert hsl to rgba successfully', () => {
        expect(
            convertHslToRgb({ hue: 188, saturation: 1, lightness: 0.5 })
        ).toMatchObject({
            red: 0,
            green: 221,
            blue: 255,
            alpha: 1,
        });
    });

    it('should convert rgb to hwb successfully', () => {
        expect(
            convertRgbToHwb({ red: 55, green: 191, blue: 255, alpha: 1 })
        ).toMatchObject({
            hue: 199,
            whiteness: 22,
            blackness: 0,
        });
    });
});
