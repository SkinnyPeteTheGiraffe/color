import { expect } from 'chai';
import rgbaConverter from './rgba-converter';
import { RGBAColorSpace } from '../../rgba/lib';

const color: RGBAColorSpace = {
    red: 180,
    green: 33,
    blue: 22,
    alpha: 1,
};

describe('test HWB conversion functions', function () {
    it('should convert RGBA to HWB', function () {
        expect(rgbaConverter.toHWB(color)).deep.eq({
            hue: 4,
            whiteness: 9,
            blackness: 29,
        });
    });
    it('should convert RGBA to HSL', function () {
        expect(rgbaConverter.toHSL(color)).deep.eq({
            hue: 4,
            saturation: 78,
            lightness: 40,
        });
    });
    it('should convert invalid RGBA to HSV', function () {
        expect(
            rgbaConverter.toHSV({ red: 0, blue: -2, green: -1, alpha: 1 })
        ).deep.eq({
            hue: 30,
            saturation: 0,
            value: 0,
        });
        expect(
            rgbaConverter.toHSV({ red: 1, blue: 0, green: -1, alpha: 1 })
        ).deep.eq({
            hue: 330,
            saturation: 100,
            value: 0,
        });
    });
    it('should convert HWB to HSV', function () {
        expect(rgbaConverter.toHSV(color)).deep.eq({
            hue: 4,
            saturation: 88,
            value: 71,
        });
    });
});
