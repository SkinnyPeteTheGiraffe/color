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
        it('should return red channel value from accessor function', () => {
            expect(rgba.color('red')).toBe(200);
        });
        it('should return green channel value from accessor function', () => {
            expect(rgba.color('green')).toBe(128);
        });
        it('should return blue channel value from accessor function', () => {
            expect(rgba.color('blue')).toBe(75);
        });
        it('should return alpha channel value', () => {
            expect(rgba.alpha()).toBe(1);
        });
        it('should set color channel using setter function', () => {
            expect(rgba.setColor('blue', 200).blue()).toBe(200);
        });
        it('should set color opacity using setter function 0 - 1', () => {
            expect(rgba.setOpacity(0.25).alpha()).toBe(0.25);
        });
        it('should set color opacity using setter function 1 - 100', () => {
            expect(rgba.setOpacity(35).alpha()).toBe(0.35);
        });
        it('should return grayscale', () => {
            expect(rgba.grayscale().toString()).toBe('rgb(143,143,143)');
        });
        it('should clone color', () => {
            expect(rgba.clone()).toMatchObject(rgba);
        });
        it('should fade rgba color', () => {
            expect(rgba.fade(0.5).alpha()).toBe(0.5);
        });
        it('should fill rgba color', () => {
            expect(rgba.setColor('alpha', 0.5).fill(0.5).alpha()).toBe(0.75);
        });
        it('should return grayscale', () => {
            expect(rgba.grayscale().toString()).toBe('rgb(143,143,143)');
        });
        it('should rotate hue positive', () => {
            expect(rgba.rotate(90).toString()).toBe('rgb(86,200,75)');
        });
        it('should rotate hue negative', () => {
            expect(rgba.rotate(-90).toString()).toBe('rgb(190,75,200)');
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

        it('should whiten rgba with value 0 - 1', () => {
            expect(rgba.whiten(0.75).toString()).toBe(`rgb(199,158,129)`);
        });
        it('should whiten rgba with value 1 - 100', () => {
            expect(rgba.whiten(62).toString()).toBe(`rgb(199,153,120)`);
        });

        it('should blacken rgba with value 0 - 1', () => {
            expect(rgba.blacken(0.75).toString()).toBe(`rgb(157,108,74)`);
        });
        it('should blacken rgba with value 1 - 100', () => {
            expect(rgba.blacken(62).toString()).toBe(`rgb(164,111,74)`);
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
