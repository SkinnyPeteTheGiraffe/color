import { HSLSpace } from './hsl';

describe('hsl color space', () => {
    let hsl: HSLSpace;

    beforeEach(() => {
        hsl = new HSLSpace({ hue: 144, saturation: 50, lightness: 75 });
    });

    describe('color channel mutators', () => {
        it('should whiten hsl with value between 0 - 1', () => {
            expect(hsl.whiten(0.42).toString()).toBe('hsl(144,0%,88%)');
        });
        it('should whiten hsl with value between 1 - 100', () => {
            expect(hsl.whiten(29).toString()).toBe('hsl(144,21%,84%)');
        });
        it('should blacken hsl with value between 0 - 1', () => {
            expect(hsl.blacken(0.42).toString()).toBe('hsl(144,35%,72%)');
        });
        it('should blacken hsl with value between 1 - 100', () => {
            expect(hsl.blacken(100).toString()).toBe('hsl(144,19%,68%)');
        });
        it('should greyscale hsl color', () => {
            expect(hsl.grayscale().toString()).toBe('hsl(0,0%,78%)');
        });
        it('should lighten hsl color 0 - 1', () => {
            expect(hsl.lighten(0.22).toString()).toBe('hsl(144,50%,92%)');
        });
        it('should lighten hsl color 1 - 100', () => {
            expect(hsl.lighten(5).toString()).toBe('hsl(144,50%,79%)');
        });
        it('should saturate hsl color 0 - 1', () => {
            expect(hsl.saturate(0.44).toString()).toBe('hsl(144,72%,75%)');
        });
        it('should saturate hsl color 1 - 100', () => {
            expect(hsl.saturate(88).toString()).toBe('hsl(144,94%,75%)');
        });
        it('should desaturate hsl color 0 - 1', () => {
            expect(hsl.desaturate(0.72).toString()).toBe('hsl(144,14%,75%)');
        });
        it('should desaturate hsl color 1 - 100', () => {
            expect(hsl.desaturate(12).toString()).toBe('hsl(144,44%,75%)');
        });
        it('should clone hsl object', () => {
            expect(hsl.clone()).toMatchObject(hsl);
        });
    });
    describe('color channel accessors', () => {
        it('should return hue channel value from accessor function', () => {
            expect(hsl.color('hue')).toBe(144);
        });
        it('should return saturation channel value from accessor function', () => {
            expect(hsl.color('saturation')).toBe(50);
        });
        it('should return lightness channel value from accessor function', () => {
            expect(hsl.color('lightness')).toBe(75);
        });
        it('should return hue channel value', () => {
            expect(hsl.hue()).toBe(144);
        });
        it('should return saturation channel value', () => {
            expect(hsl.saturation()).toBe(50);
        });
        it('should return lightness channel value', () => {
            expect(hsl.lightness()).toBe(75);
        });
        it('should return formatted HSL string', () => {
            expect(hsl.toString()).toBe('hsl(144,50%,75%)');
        });
        it('should return formatted HSL array', () => {
            expect(hsl.toArray()).toStrictEqual([144, 50, 75]);
        });
        it('should return hex string with hashtag', () => {
            expect(hsl.toHexString()).toBe('#a0e0b9');
        });
        it('should return hex string without hashtag', () => {
            expect(hsl.toHexString(true)).toBe('a0e0b9');
        });
        it('should return hsl object', () => {
            expect(hsl.toObject()).toMatchObject({
                hue: 144,
                saturation: 50,
                lightness: 75,
            });
        });
        it('should return rgba object', () => {
            expect(hsl.toRGBA().toString()).toBe('rgb(160,224,185)');
        });
    });
});
