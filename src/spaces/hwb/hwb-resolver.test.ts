import { expect } from 'chai';
import {
    fromCssColor,
    fromHex,
    fromHWB,
    fromHWBColorSpace,
} from './hwb-resolver';

describe('hwb resolver', function () {
    it('should create hwb color from hex string', function () {
        expect(fromHex('#30e57f').toString()).to.eq('hwb(146,19%,10%)');
    });
    it('should have access to conversion method', function () {
        expect(
            fromHex('#30e57f').toSpace('rgb').toSpace('hwb').toString()
        ).to.eq('hwb(146,19%,10%)');
    });
    it('should have not access to same space conversion method', function () {
        expect(fromHex('#30e57f').toSpace('hwb')).to.eq(null);
    });
    it('should create hwb color from hwb values', function () {
        expect(fromHWB(133, 74, 20).toString()).to.eq('hwb(133,74%,20%)');
    });
    it('should create hwb color from rgb values', function () {
        expect(fromCssColor('AliceBlue').toString()).to.eq('hwb(208,94%,0%)');
    });
    it('should create hwb color from rgba values', function () {
        expect(
            fromHWBColorSpace({
                hue: 146,
                whiteness: 78,
                blackness: 54,
            }).toString()
        ).to.eq('hwb(146,78%,54%)');
    });
});
