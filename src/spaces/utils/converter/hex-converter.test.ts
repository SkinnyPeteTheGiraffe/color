import { expect } from 'chai';
import { hexConverter } from './index';

describe('test HEX conversion functions', function () {
    it('should handle full length hex values with hashtags', function () {
        expect(hexConverter.toRGBA('#fdb234')).deep.eq({
            red: 253,
            green: 178,
            blue: 52,
            alpha: 1,
        });
    });
    it('should handle full length hex values without hashtags', function () {
        expect(hexConverter.toRGBA('fdb234')).deep.eq({
            red: 253,
            green: 178,
            blue: 52,
            alpha: 1,
        });
    });
    it('should handle shorthand hex values with hashtags', function () {
        expect(hexConverter.toRGBA('#fb3')).deep.eq({
            red: 255,
            green: 187,
            blue: 51,
            alpha: 1,
        });
    });
    it('should handle shorthand hex values without hashtags', function () {
        expect(hexConverter.toRGBA('fb3')).deep.eq({
            red: 255,
            green: 187,
            blue: 51,
            alpha: 1,
        });
    });
    it('should return default color with hashtags', function () {
        expect(hexConverter.toRGBA('#f')).deep.eq({
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
        });
    });
    it('should return default color without hashtags', function () {
        expect(hexConverter.toRGBA('f')).deep.eq({
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
        });
    });
});
