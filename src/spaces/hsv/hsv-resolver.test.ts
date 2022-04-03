import {
    fromCssColor,
    fromHex,
    fromHSV,
    fromHSVColorSpace,
} from './hsv-resolver';
import { expect } from 'chai';

describe('hsl resolver', function () {
    it('should create hsv color from hex string', function () {
        expect(fromHex('#30e57f').toString()).to.eq('hsv(146,79%,90%)');
    });
    it('should have access to conversion method', function () {
        expect(
            fromHex('#30e57f').toSpace('rgb').toSpace('hsv').toString()
        ).to.eq('hsv(146,79%,90%)');
    });
    it('should have not access to same space conversion method', function () {
        expect(fromHex('#50a8ff').toSpace('hsv')).to.eq(null);
    });
    it('should create hsv color from hsl values', function () {
        expect(fromHSV(133, 74, 20).toString()).to.eq('hsv(133,74%,20%)');
    });
    it('should create hsv color from rgb values', function () {
        expect(fromCssColor('AliceBlue').toString()).to.eq('hsv(208,6%,100%)');
    });
    it('should create hsv color from rgba values', function () {
        expect(
            fromHSVColorSpace({
                hue: 146,
                saturation: 78,
                value: 54,
            }).toString()
        ).to.eq('hsv(146,78%,54%)');
    });
});
