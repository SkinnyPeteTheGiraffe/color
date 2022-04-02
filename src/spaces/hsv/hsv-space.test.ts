import { HSVSpace } from './index';
import { expect } from 'chai';

describe('hsv color space', function () {
    let hsv: HSVSpace;

    beforeEach(function () {
        hsv = new HSVSpace({ hue: 144, saturation: 50, value: 75 });
    });

    describe('color channel mutators', function () {
        it('should match color values', function () {
            expect(hsv.color('hue')).to.eq(144);
            expect(hsv.color('saturation')).to.eq(50);
            expect(hsv.color('value')).to.eq(75);
        });
        it('should match color array', function () {
            expect(hsv.toArray()).deep.eq([144, 50, 75]);
        });
        it('should match color object', function () {
            expect(hsv.toObject()).deep.eq({
                hue: 144,
                saturation: 50,
                value: 75,
            });
        });
        it('should match rgb hex', function () {
            expect(hsv.toHexString()).to.eq('#60bf86');
            expect(hsv.toHexString(true)).to.eq('60bf86');
        });
        it('should whiten hsv with value between 0 - 1', function () {
            expect(hsv.whiten(0.42).toString()).to.eq('hsv(144,28%,75%)');
        });
        it('should whiten hsv with value between 1 - 100', function () {
            expect(hsv.whiten(29).toString()).to.eq('hsv(144,35%,75%)');
        });
        it('should blacken hsv with value between 0 - 1', function () {
            expect(hsv.blacken(0.42).toString()).to.eq('hsv(144,41%,65%)');
        });
        it('should blacken hsv with value between 1 - 100', function () {
            expect(hsv.blacken(100).toString()).to.eq('hsv(144,24%,50%)');
        });
        it('should greyscale hsv color', function () {
            expect(hsv.grayscale().toString()).to.eq('hsv(0,0%,61%)');
        });
        it('should lighten hsv color 0 - 1', function () {
            expect(hsv.lighten(0.22).toString()).to.eq('hsv(144,34%,82%)');
        });
        it('should lighten hsv color -1 - 0', function () {
            expect(hsv.lighten(-0.22).toString()).to.eq('hsv(144,60%,63%)');
        });
        it('should lighten hsv color 1 - 100', function () {
            expect(hsv.lighten(5).toString()).to.eq('hsv(144,46%,77%)');
        });
        it('should darken hsv color 0 - 1', function () {
            expect(hsv.darken(0.22).toString()).to.eq('hsv(144,60%,63%)');
        });
        it('should darken hsv color 1 - 100', function () {
            expect(hsv.darken(5).toString()).to.eq('hsv(144,55%,73%)');
        });
        it('should saturate hsv color 0 - 1', function () {
            expect(hsv.saturate(0.44).toString()).to.eq('hsv(144,66%,83%)');
        });
        it('should saturate hsv color with large number', function () {
            expect(hsv.saturate(203123).toString()).to.eq('hsv(144,81%,94%)');
        });
        it('should saturate hsv color with negative number', function () {
            expect(hsv.saturate(-203123).toString()).to.eq('hsv(144,0%,56%)');
        });
        it('should saturate hsv color 1 - 100', function () {
            expect(hsv.saturate(88).toString()).to.eq('hsv(144,78%,92%)');
        });
        it('should desaturate hsv color 0 - 1', function () {
            expect(hsv.desaturate(0.72).toString()).to.eq('hsv(144,14%,75%)');
        });
        it('should desaturate hsv color 1 - 100', function () {
            expect(hsv.desaturate(12).toString()).to.eq('hsv(144,44%,75%)');
        });
        it('should clone hsv object', function () {
            expect(hsv.clone()).deep.eq(hsv);
        });
        it('should mix hsv colors without weight', function () {
            expect(
                hsv.mix({ hue: 97, saturation: 64, value: 40 }, 0).toString()
            ).to.eq('hsv(144,50%,75%)');
        });
        it('should mix hsv colors', function () {
            expect(
                hsv.mix({ hue: 97, saturation: 64, value: 40 }).toString()
            ).to.eq('hsv(126,46%,58%)');
        });
        it('should rotate hsv color hue', function () {
            expect(hsv.rotate(64).toString()).to.eq('hsv(208,50%,75%)');
        });
        it('should set color channels using setter function', function () {
            expect(hsv.setColor('hue', 360).hue()).to.eq(360);
            expect(hsv.setColor('value', 100).value()).to.eq(100);
            expect(hsv.setColor('saturation', 75).saturation()).to.eq(75);
        });
        it('should handle any attempts of overflowing', function () {
            expect(
                hsv.setColor('saturation', 100).saturate(1).toString()
            ).to.eq('hsv(144,100%,76%)');
        });
        it('should handle any attempts of "underflowing"', function () {
            expect(
                hsv.setColor('saturation', -1000).desaturate(10000).toString()
            ).to.eq('hsv(144,0%,75%)');
        });
    });
});
