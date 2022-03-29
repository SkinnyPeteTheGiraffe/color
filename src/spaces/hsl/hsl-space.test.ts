import HSLSpace from './hsl-space';
import HSLColorSpace from './types/hsl-color-space';
import RGBAColorSpace from '../rgba/types/rgba-color-space';

describe('hsl color space', () => {
    let hsl: HSLSpace;

    beforeEach(() => {
        hsl = new HSLSpace({ hue: 144, saturation: 50, lightness: 75 });
    });

    describe('color channel mutators', () => {
        it('should whiten hsl with value between 0 - 1', () => {
            expect(hsl.whiten(0.42).toString()).toBe<string>('hsl(144,0%,88%)');
        });
        it('should whiten hsl with value between 1 - 100', () => {
            expect(hsl.whiten(29).toString()).toBe<string>('hsl(144,21%,84%)');
        });
        it('should blacken hsl with value between 0 - 1', () => {
            expect(hsl.blacken(0.42).toString()).toBe<string>(
                'hsl(144,35%,72%)'
            );
        });
        it('should blacken hsl with value between 1 - 100', () => {
            expect(hsl.blacken(100).toString()).toBe<string>(
                'hsl(144,19%,68%)'
            );
        });
        it('should greyscale hsl color', () => {
            expect(hsl.grayscale().toString()).toBe<string>('hsl(0,0%,78%)');
        });
        it('should lighten hsl color 0 - 1', () => {
            expect(hsl.lighten(0.22).toString()).toBe<string>(
                'hsl(144,50%,92%)'
            );
        });
        it('should lighten hsl color -1 - 0', () => {
            expect(hsl.lighten(-0.22).toString()).toBe<string>(
                'hsl(144,50%,59%)'
            );
        });
        it('should lighten hsl color 1 - 100', () => {
            expect(hsl.lighten(5).toString()).toBe<string>('hsl(144,50%,79%)');
        });
        it('should darken hsl color 0 - 1', () => {
            expect(hsl.darken(0.22).toString()).toBe<string>(
                'hsl(144,50%,59%)'
            );
        });
        it('should darken hsl color 1 - 100', () => {
            expect(hsl.darken(5).toString()).toBe<string>('hsl(144,50%,71%)');
        });
        it('should saturate hsl color 0 - 1', () => {
            expect(hsl.saturate(0.44).toString()).toBe<string>(
                'hsl(144,72%,75%)'
            );
        });
        it('should saturate hsl color with large number', () => {
            expect(hsl.saturate(203123).toString()).toBe<string>(
                'hsl(144,100%,75%)'
            );
        });
        it('should saturate hsl color with negative number', () => {
            expect(hsl.saturate(-203123).toString()).toBe<string>(
                'hsl(144,0%,75%)'
            );
        });
        it('should saturate hsl color 1 - 100', () => {
            expect(hsl.saturate(88).toString()).toBe<string>(
                'hsl(144,94%,75%)'
            );
        });
        it('should desaturate hsl color 0 - 1', () => {
            expect(hsl.desaturate(0.72).toString()).toBe<string>(
                'hsl(144,14%,75%)'
            );
        });
        it('should desaturate hsl color 1 - 100', () => {
            expect(hsl.desaturate(12).toString()).toBe<string>(
                'hsl(144,44%,75%)'
            );
        });
        it('should clone hsl object', () => {
            expect(hsl.clone()).toMatchObject<HSLSpace>(hsl);
        });
        it('should mix hsl colors', () => {
            expect(
                hsl.mix({ hue: 270, saturation: 64, lightness: 40 }).toString()
            ).toBe<string>('hsl(241,23%,60%)');
        });
        it('should rotate hsl color hue', () => {
            expect(hsl.rotate(64).toString()).toBe<string>('hsl(208,50%,75%)');
        });
        it('should set color channels using setter function', () => {
            expect(hsl.setColor('hue', 360).hue()).toBe<number>(360);
            expect(hsl.setColor('lightness', 100).lightness()).toBe<number>(
                100
            );
            expect(hsl.setColor('saturation', 75).saturation()).toBe<number>(
                75
            );
        });
        it('should handle any attempts of overflowing', () => {
            expect(
                hsl.setColor('saturation', 100).saturate(1).toString()
            ).toBe<string>('hsl(144,100%,75%)');
        });
        it('should handle any attempts of "underflowing"', () => {
            expect(
                hsl.setColor('saturation', -1000).desaturate(10000).toString()
            ).toBe<string>('hsl(144,0%,75%)');
        });
    });
    describe('color channel accessors', () => {
        it('should return hue channel value from accessor function', () => {
            expect(hsl.color('hue')).toBe<number>(144);
        });
        it('should return saturation channel value from accessor function', () => {
            expect(hsl.color('saturation')).toBe<number>(50);
        });
        it('should return lightness channel value from accessor function', () => {
            expect(hsl.color('lightness')).toBe<number>(75);
        });
        it('should return hue channel value', () => {
            expect(hsl.hue()).toBe<number>(144);
        });
        it('should return saturation channel value', () => {
            expect(hsl.saturation()).toBe<number>(50);
        });
        it('should return lightness channel value', () => {
            expect(hsl.lightness()).toBe<number>(75);
        });
        it('should return formatted HSL string', () => {
            expect(hsl.toString()).toBe<string>('hsl(144,50%,75%)');
        });
        it('should return formatted HSL array', () => {
            expect(hsl.toArray()).toStrictEqual<Array<number>>([144, 50, 75]);
        });
        it('should return hex string with hashtag', () => {
            expect(hsl.toHexString()).toBe<string>('#9fdfb9');
        });
        it('should return hex string without hashtag', () => {
            expect(hsl.toHexString(true)).toBe<string>('9fdfb9');
        });
        it('should return hsl object', () => {
            expect(hsl.toObject()).toMatchObject<HSLColorSpace>({
                hue: 144,
                saturation: 50,
                lightness: 75,
            });
        });
        it('should return rgba space object', () => {
            expect(hsl.toRGBAColorSpace()).toMatchObject<RGBAColorSpace>({
                red: 159,
                green: 223,
                blue: 185,
                alpha: 1,
            });
        });
    });
});
