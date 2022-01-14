import { RGBA } from './rgba';

describe('rgba model', () => {
    let rgba: RGBA;

    beforeEach(() => {
        rgba = new RGBA({ red: 200, green: 128, blue: 75, alpha: 1 });
    });

    describe('lighten rgba model', () => {
        it('should return red channel value', () => {
            expect(rgba.red()).toBe(200);
        });
        it('should return green channel value', () => {
            expect(rgba.green()).toBe(128);
        });
        it('should return blue channel value', () => {
            expect(rgba.blue()).toBe(75);
        });
        it('should return alpha channel value', () => {
            expect(rgba.alpha()).toBe(1);
        });
        it('should lighten rgba with value between 0 - 1', () => {
            expect(rgba.lighten(0.42).toString()).toBe('rgb(227,191,164)');
        });
        it('should lighten rgba with value between 1 - 100', () => {
            expect(rgba.lighten(20).toString()).toBe('rgb(213,157,118)');
        });

        it('should darken rgba with value between 0 - 1', () => {
            expect(rgba.darken(0.42).toString()).toBe('rgb(122,73,37)');
        });
        it('should darken rgba with value between 1 - 100', () => {
            expect(rgba.darken(20).toString()).toBe('rgb(169,100,51)');
        });

        it('should saturate rgba with value 0 - 1', () => {
            expect(rgba.saturate(0.75).toString()).toBe(`rgb(247,120,29)`);
        });
        it('should saturate rgba with value 1 - 100', () => {
            expect(rgba.saturate(62).toString()).toBe(`rgb(239,121,37)`);
        });

        it('should desaturate rgba with value 0 - 1', () => {
            expect(rgba.desaturate(0.25).toString()).toBe(`rgb(185,130,91)`);
        });
        it('should desaturate rgba with value 1 - 100', () => {
            expect(rgba.desaturate(25).toString()).toBe(`rgb(185,130,91)`);
        });
        it('should mix rgba colors', () => {
            expect(
                rgba.mix({ red: 255, green: 255, blue: 0, alpha: 1 }).toString()
            ).toBe('rgb(228,192,38)');
        });
        it('should mix rgba colors weighted', () => {
            expect(
                rgba
                    .mix({ red: 255, green: 255, blue: 0, alpha: 1 }, 0.69) // nice
                    .toString()
            ).toBe('rgb(238,216,23)');
        });
    });
});
