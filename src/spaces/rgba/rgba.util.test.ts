import { convertHexToRgb } from './rgba.utils';

describe('rgb model utils', () => {
    describe('convert full length hex value to rgb', () => {
        it('should handle full length hex values with hashtags', () => {
            expect(convertHexToRgb('#fdb234')).toMatchObject({
                red: 253,
                green: 178,
                blue: 52,
            });
        });
        it('should handle full length hex values without hashtags', () => {
            expect(convertHexToRgb('fdb234')).toMatchObject({
                red: 253,
                green: 178,
                blue: 52,
            });
        });
    });

    describe('convert shorthand hex value to rgb', () => {
        it('should handle shorthand hex values with hashtags', () => {
            expect(convertHexToRgb('#fb3')).toMatchObject({
                red: 255,
                green: 187,
                blue: 51,
            });
        });
        it('should handle shorthand hex values without hashtags', () => {
            expect(convertHexToRgb('fb3')).toMatchObject({
                red: 255,
                green: 187,
                blue: 51,
            });
        });
    });

    describe('return default color if hex value provided is too short', () => {
        it('should return default color with hashtags', () => {
            expect(convertHexToRgb('#f')).toMatchObject({
                red: 0,
                green: 0,
                blue: 0,
            });
        });
        it('should return default color without hashtags', () => {
            expect(convertHexToRgb('f')).toMatchObject({
                red: 0,
                green: 0,
                blue: 0,
            });
        });
    });

    describe('return default color if hex value provided is too long', () => {
        it('should return default color with hashtags', () => {
            expect(convertHexToRgb('#fffffffff')).toMatchObject({
                red: 0,
                green: 0,
                blue: 0,
            });
        });
        it('should return default color without hashtags', () => {
            expect(convertHexToRgb('fffffffff')).toMatchObject({
                red: 0,
                green: 0,
                blue: 0,
            });
        });
    });

    describe('return default color if hex value provided is invalid', () => {
        it('should return default color with hashtags', () => {
            expect(convertHexToRgb('#zzzyyy')).toMatchObject({
                red: 0,
                green: 0,
                blue: 0,
            });
        });
        it('should return default color without hashtags', () => {
            expect(convertHexToRgb('zzzyyy')).toMatchObject({
                red: 0,
                green: 0,
                blue: 0,
            });
        });
    });
});
