import { expect } from 'chai';
import {
    fromCssColor,
    fromHex,
    fromHSL,
    fromHSLColorSpace,
} from './hsl-resolver';

describe('hsl resolver', function () {
    it('should create hsl color from hex string', function () {
        expect(fromHex('#30e57f').toString()).to.eq('hsl(146,78%,54%)');
    });
    it('should have access to conversion method', function () {
        expect(
            fromHex('#30e57f').toSpace('rgb').toSpace('hsl').toString()
        ).to.eq('hsl(146,78%,54%)');
    });
    it('should have not access to same space conversion method', function () {
        expect(fromHex('#50a8ff').toSpace('hsl')).to.eq(null);
    });
    it('should create hsl color from hsl values', function () {
        expect(fromHSL(133, 74, 20).toString()).to.eq('hsl(133,74%,20%)');
    });
    it('should create hsl color from rgb values', function () {
        expect(fromCssColor('AliceBlue').toString()).to.eq('hsl(208,100%,97%)');
    });
    it('should create hsl color from rgba values', function () {
        expect(
            fromHSLColorSpace({
                hue: 146,
                saturation: 78,
                lightness: 54,
            }).toString()
        ).to.eq('hsl(146,78%,54%)');
    });
});
