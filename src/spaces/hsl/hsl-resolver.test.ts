// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from '@jest/globals';

import {
    fromCssColor,
    fromHex,
    fromHSL,
    fromHSLColorSpace,
} from './hsl-resolver';

describe('hsl resolver', () => {
    it('should create hsl color from hex string', () => {
        expect(fromHex('#30e57f').toString()).toBe('hsl(146,78%,54%)');
    });
    it('should create hsl color from hsl values', () => {
        expect(fromHSL(133, 74, 20).toString()).toBe('hsl(133,74%,20%)');
    });
    it('should create hsl color from rgb values', () => {
        expect(fromCssColor('AliceBlue').toString()).toBe('hsl(208,100%,97%)');
    });
    it('should create hsl color from rgba values', () => {
        expect(
            fromHSLColorSpace({
                hue: 146,
                saturation: 78,
                lightness: 54,
            }).toString()
        ).toBe('hsl(146,78%,54%)');
    });
});
