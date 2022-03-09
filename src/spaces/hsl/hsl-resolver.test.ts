import {
    fromCssColor,
    fromHex,
    fromHSL,
    fromHSLColorSpace,
} from './hsl-resolver';

describe('hsl resolver', () => {
    it('should create hsl color from hex string', () => {
        expect(fromHex('#30e57f').toString()).toBe<string>('hsl(146,78%,54%)');
    });
    it('should create hsl color from hsl values', () => {
        expect(fromHSL(133, 74, 20).toString()).toBe<string>(
            'hsl(133,74%,20%)'
        );
    });
    it('should create hsl color from rgb values', () => {
        expect(fromCssColor('AliceBlue').toString()).toBe<string>(
            'hsl(208,100%,97%)'
        );
    });
    it('should create hsl color from rgba values', () => {
        expect(
            fromHSLColorSpace({
                hue: 146,
                saturation: 78,
                lightness: 54,
            }).toString()
        ).toBe<string>('hsl(146,78%,54%)');
    });
});
