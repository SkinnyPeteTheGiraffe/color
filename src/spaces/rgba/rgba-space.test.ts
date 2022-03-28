import RGBASpace from './rgba-space';
import RGBAColorSpace from './types/rgba-color-space';
import HSLColorSpace from '../hsl/types/hsl-color-space';

describe('rgba color space', () => {
    let rgba: RGBASpace;

    beforeEach(() => {
        rgba = new RGBASpace({ red: 200, green: 128, blue: 75, alpha: 1 });
    });

    describe('color channel mutators', () => {
        it('should lighten rgba with value between 0 - 1', () => {
            expect(rgba.lighten(0.42).toString()).toBe<string>(
                'rgb(227,191,165)'
            );
        });
        it('should lighten rgba with value between 1 - 100', () => {
            expect(rgba.lighten(20).toString()).toBe<string>(
                'rgb(213,158,118)'
            );
        });
        it('should set color channel using setter function', () => {
            expect(rgba.setColor('blue', 200).blue()).toBe<number>(200);
        });
        it('should set color opacity using setter function 0 - 1', () => {
            expect(rgba.setOpacity(0.25).alpha()).toBe<number>(0.25);
        });
        it('should set color opacity using setter function 1 - 100', () => {
            expect(rgba.setOpacity(35).alpha()).toBe<number>(0.35);
        });
        it('should return grayscale', () => {
            expect(rgba.grayscale().toString()).toBe<string>(
                'rgb(143,143,143)'
            );
        });
        it('should clone color', () => {
            expect(rgba.clone()).toMatchObject<RGBASpace>(rgba);
        });
        it('should fade rgba color', () => {
            expect(rgba.fade(0.5).alpha()).toBe<number>(0.5);
        });
        it('should fill rgba color', () => {
            expect(rgba.setColor('alpha', 0.5).fill(0.5).alpha()).toBe<number>(
                0.75
            );
        });

        it('should rotate hue positive', () => {
            expect(rgba.rotate(90).toString()).toBe<string>('rgb(86,200,76)');
        });
        it('should rotate hue negative', () => {
            expect(rgba.rotate(-90).toString()).toBe<string>('rgb(190,76,200)');
        });

        it('should darken rgba with value between 0 - 1', () => {
            expect(rgba.darken(0.42).toString()).toBe<string>('rgb(121,72,37)');
        });
        it('should darken rgba with value between 1 - 100', () => {
            expect(rgba.darken(20).toString()).toBe<string>('rgb(168,100,52)');
        });

        it('should saturate rgba with value 0 - 1', () => {
            expect(rgba.saturate(0.75).toString()).toBe<string>(
                `rgb(247,120,29)`
            );
        });
        it('should saturate rgba with value 1 - 100', () => {
            expect(rgba.saturate(62).toString()).toBe<string>(
                `rgb(239,121,37)`
            );
        });

        it('should desaturate rgba with value 0 - 1', () => {
            expect(rgba.desaturate(0.25).toString()).toBe<string>(
                `rgb(185,130,91)`
            );
        });
        it('should desaturate rgba with value 1 - 100', () => {
            expect(rgba.desaturate(25).toString()).toBe<string>(
                `rgb(185,130,91)`
            );
        });

        it('should whiten rgba with value 0 - 1', () => {
            expect(rgba.whiten(0.75).toString()).toBe<string>(
                `rgb(199,158,129)`
            );
        });
        it('should whiten rgba with value 1 - 100', () => {
            expect(rgba.whiten(62).toString()).toBe<string>(`rgb(199,153,120)`);
        });

        it('should blacken rgba with value 0 - 1', () => {
            expect(rgba.blacken(0.75).toString()).toBe<string>(
                `rgb(157,108,74)`
            );
        });
        it('should blacken rgba with value 1 - 100', () => {
            expect(rgba.blacken(62).toString()).toBe<string>(`rgb(164,111,74)`);
        });

        it('should mix rgba colors', () => {
            expect(
                rgba.mix({ red: 255, green: 255, blue: 0, alpha: 1 }).toString()
            ).toBe<string>('rgb(228,192,38)');
        });
        it('should mix rgba colors weighted', () => {
            expect(
                rgba
                    .mix({ red: 255, green: 255, blue: 0, alpha: 1 }, 0.69) // nice
                    .toString()
            ).toBe<string>('rgb(238,216,23)');
        });
    });
    describe('color channel accessors', () => {
        it('should return red channel value', () => {
            expect(rgba.red()).toBe<number>(200);
        });
        it('should return green channel value', () => {
            expect(rgba.green()).toBe<number>(128);
        });
        it('should return blue channel value', () => {
            expect(rgba.blue()).toBe<number>(75);
        });
        it('should return red channel value from accessor function', () => {
            expect(rgba.color('red')).toBe<number>(200);
        });
        it('should return green channel value from accessor function', () => {
            expect(rgba.color('green')).toBe<number>(128);
        });
        it('should return blue channel value from accessor function', () => {
            expect(rgba.color('blue')).toBe<number>(75);
        });
        it('should return alpha channel value', () => {
            expect(rgba.alpha()).toBe<number>(1);
        });
        it('should return formatted RGB string', () => {
            expect(rgba.toString()).toBe<string>('rgb(200,128,75)');
        });
        it('should return formatted RGBA string', () => {
            expect(rgba.toString(true)).toBe<string>('rgba(200,128,75,1)');
        });
        it('should return formatted RGBA array', () => {
            expect(rgba.toArray()).toStrictEqual<Array<number>>([
                200, 128, 75, 1,
            ]);
        });
        it('should return hex string with hashtag', () => {
            expect(rgba.toHexString()).toBe<string>('#c8804b');
        });
        it('should return hex string without hashtag', () => {
            expect(rgba.toHexString(true)).toBe<string>('c8804b');
        });
        it('should return rgba object', () => {
            expect(rgba.toObject()).toMatchObject<RGBAColorSpace>({
                red: 200,
                green: 128,
                blue: 75,
                alpha: 1,
            });
        });
        it('should return hsl space object', () => {
            expect(rgba.toHSLColorSpace()).toMatchObject<HSLColorSpace>({
                hue: 25,
                saturation: 53,
                lightness: 54,
            });
        });
    });
});
