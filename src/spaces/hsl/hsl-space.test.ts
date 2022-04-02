import HSLSpace from './hsl-space';
import { expect } from 'chai';

describe('hsl color space', function () {
    let hsl: HSLSpace;

    beforeEach(function () {
        hsl = new HSLSpace({ hue: 144, saturation: 50, lightness: 75 });
    });

    describe('color channel mutators', function () {
        it('should whiten hsl with value between 0 - 1', function () {
            expect(hsl.whiten(0.42).toString()).to.eq('hsl(144,0%,88%)');
        });
        it('should whiten hsl with value between 1 - 100', function () {
            expect(hsl.whiten(29).toString()).to.eq('hsl(144,25%,84%)');
        });
        it('should blacken hsl with value between 0 - 1', function () {
            expect(hsl.blacken(0.42).toString()).to.eq('hsl(144,38%,73%)');
        });
        it('should blacken hsl with value between 1 - 100', function () {
            expect(hsl.blacken(100).toString()).to.eq('hsl(144,22%,69%)');
        });
        it('should greyscale hsl color', function () {
            expect(hsl.grayscale().toString()).to.eq('hsl(0,0%,78%)');
        });
        it('should lighten hsl color 0 - 1', function () {
            expect(hsl.lighten(0.22).toString()).to.eq('hsl(144,50%,92%)');
        });
        it('should lighten hsl color -1 - 0', function () {
            expect(hsl.lighten(-0.22).toString()).to.eq('hsl(144,50%,59%)');
        });
        it('should lighten hsl color 1 - 100', function () {
            expect(hsl.lighten(5).toString()).to.eq('hsl(144,50%,79%)');
        });
        it('should darken hsl color 0 - 1', function () {
            expect(hsl.darken(0.22).toString()).to.eq('hsl(144,50%,59%)');
        });
        it('should darken hsl color 1 - 100', function () {
            expect(hsl.darken(5).toString()).to.eq('hsl(144,50%,71%)');
        });
        it('should saturate hsl color 0 - 1', function () {
            expect(hsl.saturate(0.44).toString()).to.eq('hsl(144,72%,75%)');
        });
        it('should saturate hsl color with large number', function () {
            expect(hsl.saturate(203123).toString()).to.eq('hsl(144,100%,75%)');
        });
        it('should saturate hsl color with negative number', function () {
            expect(hsl.saturate(-203123).toString()).to.eq('hsl(144,0%,75%)');
        });
        it('should saturate hsl color 1 - 100', function () {
            expect(hsl.saturate(88).toString()).to.eq('hsl(144,94%,75%)');
        });
        it('should desaturate hsl color 0 - 1', function () {
            expect(hsl.desaturate(0.72).toString()).to.eq('hsl(144,14%,75%)');
        });
        it('should desaturate hsl color 1 - 100', function () {
            expect(hsl.desaturate(12).toString()).to.eq('hsl(144,44%,75%)');
        });
        it('should clone hsl object', function () {
            expect(hsl.clone()).deep.eq(hsl);
        });
        it('should mix hsl colors', function () {
            expect(
                hsl.mix({ hue: 270, saturation: 64, lightness: 40 }).toString()
            ).to.eq('hsl(241,23%,60%)');
        });
        it('should rotate hsl color hue', function () {
            expect(hsl.rotate(64).toString()).to.eq('hsl(208,50%,75%)');
        });
        it('should set color channels using setter function', function () {
            expect(hsl.setColor('hue', 360).hue()).to.eq(360);
            expect(hsl.setColor('lightness', 100).lightness()).to.eq(100);
            expect(hsl.setColor('saturation', 75).saturation()).to.eq(75);
        });
        it('should handle any attempts of overflowing', function () {
            expect(
                hsl.setColor('saturation', 100).saturate(1).toString()
            ).to.eq('hsl(144,100%,75%)');
        });
        it('should handle any attempts of "underflowing"', function () {
            expect(
                hsl.setColor('saturation', -1000).desaturate(10000).toString()
            ).to.eq('hsl(144,0%,75%)');
        });
    });
    describe('color channel accessors', function () {
        it('should return hue channel value from accessor function', function () {
            expect(hsl.color('hue')).to.eq(144);
        });
        it('should return saturation channel value from accessor function', function () {
            expect(hsl.color('saturation')).to.eq(50);
        });
        it('should return lightness channel value from accessor function', function () {
            expect(hsl.color('lightness')).to.eq(75);
        });
        it('should return hue channel value', function () {
            expect(hsl.hue()).to.eq(144);
        });
        it('should return saturation channel value', function () {
            expect(hsl.saturation()).to.eq(50);
        });
        it('should return lightness channel value', function () {
            expect(hsl.lightness()).to.eq(75);
        });
        it('should return formatted HSL string', function () {
            expect(hsl.toString()).to.eq('hsl(144,50%,75%)');
        });
        it('should return formatted HSL array', function () {
            expect(hsl.toArray()).deep.eq([144, 50, 75]);
        });
        it('should return hex string with hashtag', function () {
            expect(hsl.toHexString()).to.eq('#9fdfb9');
        });
        it('should return hex string without hashtag', function () {
            expect(hsl.toHexString(true)).to.eq('9fdfb9');
        });
        it('should return hsl object', function () {
            expect(hsl.toObject()).deep.eq({
                hue: 144,
                saturation: 50,
                lightness: 75,
            });
        });
        it('should return rgba space object', function () {
            expect(hsl.toRGBAColorSpace()).deep.eq({
                red: 159,
                green: 223,
                blue: 185,
                alpha: 1,
            });
        });
        it('should return valid HWB space instance', function () {
            expect(hsl.toHWB().toString()).to.eq('hwb(144,62%,12%)');
        });
    });
});
