import { HSL } from './hsl.resolver';

describe('hsl resolver', () => {
    it('should create hsl color from hex string', () => {
        expect(HSL.fromHex('#30e57f').toString()).toBe<string>(
            'hsl(146,78%,54%)'
        );
    });
    it('should create hsl color from hsl values', () => {
        expect(HSL.fromHSL(133, 74, 20).toString()).toBe<string>(
            'hsl(133,74%,20%)'
        );
    });
    it('should create hsl color from rgb values', () => {
        expect(HSL.fromRGB(48, 229, 127).toString()).toBe<string>(
            'hsl(146,78%,54%)'
        );
    });
    it('should create hsl color from rgb values', () => {
        expect(HSL.fromRGBA(48, 229, 127, 1).toString()).toBe<string>(
            'hsl(146,78%,54%)'
        );
    });
});
