import RGBASpace from './rgba-space';
import { expect } from 'chai';

describe('rgba color space', function () {
    let rgba: RGBASpace;
    beforeEach(function () {
        rgba = new RGBASpace({ red: 200, green: 128, blue: 75, alpha: 1 });
    });
    describe('color channel mutators', function () {
        it('should lighten rgba with value between 0 - 1', function () {
            expect(rgba.lighten(0.42).toString()).to.eq('rgb(227,191,165)');
        });
        it('should lighten rgba with value between 1 - 100', function () {
            expect(rgba.lighten(20).toString()).to.eq('rgb(213,158,118)');
        });
        it('should set color channel using setter function', function () {
            expect(rgba.setColor('blue', 200).blue()).to.eq(200);
        });
        it('should set color opacity using setter function 0 - 1', function () {
            expect(rgba.setOpacity(0.25).alpha()).to.eq(0.25);
        });
        it('should set color opacity using setter function 1 - 100', function () {
            expect(rgba.setOpacity(35).alpha()).to.eq(0.35);
        });
        it('should return grayscale', function () {
            expect(rgba.grayscale().toString()).to.eq('rgb(143,143,143)');
        });
        it('should clone color', function () {
            expect(rgba.clone()).to.deep.eq(rgba);
        });
        it('should fade rgba color', function () {
            expect(rgba.fade(0.5).alpha()).to.eq(0.5);
        });
        it('should fill rgba color', function () {
            expect(rgba.setColor('alpha', 0.5).fill(0.5).alpha()).to.eq(0.75);
        });

        it('should rotate hue positive', function () {
            expect(rgba.rotate(90).toString()).to.eq('rgb(86,200,76)');
        });
        it('should rotate hue negative', function () {
            expect(rgba.rotate(-90).toString()).to.eq('rgb(190,76,200)');
        });

        it('should darken rgba with value between 0 - 1', function () {
            expect(rgba.darken(0.42).toString()).to.eq('rgb(121,72,37)');
        });
        it('should darken rgba with value between 1 - 100', function () {
            expect(rgba.darken(20).toString()).to.eq('rgb(168,100,52)');
        });

        it('should saturate rgba with value 0 - 1', function () {
            expect(rgba.saturate(0.75).toString()).to.eq(`rgb(247,120,29)`);
        });
        it('should saturate rgba with value 1 - 100', function () {
            expect(rgba.saturate(62).toString()).to.eq(`rgb(239,121,37)`);
        });

        it('should desaturate rgba with value 0 - 1', function () {
            expect(rgba.desaturate(0.25).toString()).to.eq(`rgb(185,130,91)`);
        });
        it('should desaturate rgba with value 1 - 100', function () {
            expect(rgba.desaturate(25).toString()).to.eq(`rgb(185,130,91)`);
        });

        it('should whiten rgba with value 0 - 1', function () {
            expect(rgba.whiten(0.75).toString()).to.eq(`rgb(199,159,130)`);
        });
        it('should whiten rgba with value 1 - 100', function () {
            expect(rgba.whiten(62).toString()).to.eq(`rgb(199,153,120)`);
        });

        it('should blacken rgba with value 0 - 1', function () {
            expect(rgba.blacken(0.75).toString()).to.eq(`rgb(156,108,74)`);
        });
        it('should blacken rgba with value 1 - 100', function () {
            expect(rgba.blacken(62).toString()).to.eq(`rgb(163,111,74)`);
        });

        it('should mix rgba colors', function () {
            expect(
                rgba.mix({ red: 255, green: 255, blue: 0, alpha: 1 }).toString()
            ).to.eq('rgb(228,192,38)');
        });
        it('should mix rgba colors weighted', function () {
            expect(
                rgba
                    .mix({ red: 255, green: 255, blue: 0, alpha: 1 }, 0.69) // nice
                    .toString()
            ).to.eq('rgb(238,216,23)');
        });
    });
    describe('color channel accessors', function () {
        it('should return red channel value', function () {
            expect(rgba.red()).to.eq(200);
        });
        it('should return green channel value', function () {
            expect(rgba.green()).to.eq(128);
        });
        it('should return blue channel value', function () {
            expect(rgba.blue()).to.eq(75);
        });
        it('should return red channel value from accessor function', function () {
            expect(rgba.color('red')).to.eq(200);
        });
        it('should return green channel value from accessor function', function () {
            expect(rgba.color('green')).to.eq(128);
        });
        it('should return blue channel value from accessor function', function () {
            expect(rgba.color('blue')).to.eq(75);
        });
        it('should return alpha channel value', function () {
            expect(rgba.alpha()).to.eq(1);
        });
        it('should return formatted RGB string', function () {
            expect(rgba.toString()).to.eq('rgb(200,128,75)');
        });
        it('should return formatted RGBA string', function () {
            expect(rgba.toString(true)).to.eq('rgba(200,128,75,1)');
        });
        it('should return formatted RGBA array', function () {
            expect(rgba.toArray()).deep.eq([200, 128, 75, 1]);
        });
        it('should return hex string with hashtag', function () {
            expect(rgba.toHexString()).to.eq('#c8804b');
        });
        it('should return hex string without hashtag', function () {
            expect(rgba.toHexString(true)).to.eq('c8804b');
        });
        it('should return rgba object', function () {
            expect(rgba.toObject()).deep.eq({
                red: 200,
                green: 128,
                blue: 75,
                alpha: 1,
            });
        });
    });
});
