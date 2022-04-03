import {
    fromCssColor,
    fromHex,
    fromRGBA,
    fromRGBAColorSpace,
} from './rgba-resolver';
import { expect } from 'chai';

describe('rgba resolver', function () {
    it('should create rgba color from hex string', function () {
        expect(fromHex('#30e57f').toString()).to.eq('rgb(48,229,127)');
    });
    it('should have access to conversion method', function () {
        expect(
            fromHex('#50a8ff').toSpace('hsl').toSpace('rgb').toString()
        ).to.eq('rgb(82,168,255)');
    });
    it('should have not access to same space conversion method', function () {
        expect(fromHex('#50a8ff').toSpace('rgb')).to.eq(null);
    });
    it('should create rgba color from rgba', function () {
        expect(fromRGBA(133, 74, 200, 0.69).toString()).to.eq(
            'rgb(133,74,200)'
        );
    });
    it('should create rgb color from rgba', function () {
        expect(fromRGBA(133, 74, 200).toString(true)).to.eq(
            'rgba(133,74,200,1)'
        );
    });
    it('should create rgba color from rgb values', function () {
        expect(fromCssColor('AliceBlue').toString()).to.eq('rgb(240,248,255)');
    });
    it('should create rgba color from rgba values', function () {
        expect(
            fromRGBAColorSpace({
                red: 146,
                green: 78,
                blue: 54,
                alpha: 0.24,
            }).toString(true)
        ).to.eq('rgba(146,78,54,0.24)');
    });
});
