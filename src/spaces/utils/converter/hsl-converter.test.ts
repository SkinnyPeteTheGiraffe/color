import { expect } from 'chai';
import { hslConverter } from './index';
import HSLColorSpace from '../../hsl/types/hsl-color-space';

const color: HSLColorSpace = {
    hue: 180,
    saturation: 50,
    lightness: 55,
};

describe('test HSL conversion functions', function () {
    it('should convert HSL to RGBA', function () {
        expect(hslConverter.toRGBA(color)).deep.eq({
            red: 83,
            green: 198,
            blue: 198,
            alpha: 1,
        });
    });
    it('should convert HSL to HWB', function () {
        expect(hslConverter.toHWB(color)).deep.eq({
            hue: 180,
            whiteness: 33,
            blackness: 22,
        });
    });
    it('should convert HSL to HSV', function () {
        expect(hslConverter.toHSV(color)).deep.eq({
            hue: 180,
            saturation: 58,
            value: 78,
        });
    });
});
