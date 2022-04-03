import { expect } from 'chai';
import hwbConverter from './hwb-converter';
import HWBColorSpace from '../../hwb/types/hwb-color-space';

const color: HWBColorSpace = {
    hue: 180,
    whiteness: 33,
    blackness: 22,
};

describe('test HWB conversion functions', function () {
    it('should convert HWB to RGBA', function () {
        expect(hwbConverter.toRGBA(color)).deep.eq({
            red: 84,
            green: 199,
            blue: 199,
            alpha: 1,
        });
    });
    it('should convert HWB to HSL', function () {
        expect(hwbConverter.toHSL(color)).deep.eq({
            hue: 180,
            saturation: 51,
            lightness: 55,
        });
    });
    it('should convert HWB to HSV', function () {
        expect(hwbConverter.toHSV(color)).deep.eq({
            hue: 180,
            saturation: 58,
            value: 78,
        });
    });
});
