import {
    fromCssColor,
    fromHex,
    fromHSV,
    fromHSVColorSpace,
} from './hsv-resolver';

describe('hsl resolver', () => {
    it('should create hsv color from hex string', () => {
        expect(fromHex('#30e57f').toString()).toBe<string>('hsv(146,79%,90%)');
    });
    it('should create hsv color from hsl values', () => {
        expect(fromHSV(133, 74, 20).toString()).toBe<string>(
            'hsv(133,74%,20%)'
        );
    });
    it('should create hsv color from rgb values', () => {
        expect(fromCssColor('AliceBlue').toString()).toBe<string>(
            'hsv(208,6%,100%)'
        );
    });
    it('should create hsv color from rgba values', () => {
        expect(
            fromHSVColorSpace({
                hue: 146,
                saturation: 78,
                value: 54,
            }).toString()
        ).toBe<string>('hsv(146,78%,54%)');
    });
});
