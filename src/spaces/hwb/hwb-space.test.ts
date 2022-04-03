import HWBSpace from './hwb-space';
import { expect } from 'chai';

describe('hwb color space', function () {
    let hwb: HWBSpace;

    beforeEach(function () {
        hwb = new HWBSpace({ hue: 144, whiteness: 50, blackness: 75 });
    });

    describe('color channel mutators', function () {
        it('should match color values', function () {
            expect(hwb.color('hue')).to.eq(144);
            expect(hwb.color('whiteness')).to.eq(50);
            expect(hwb.color('blackness')).to.eq(75);
        });
        it('should match color array', function () {
            expect(hwb.toArray()).deep.eq([144, 50, 75]);
        });
        it('should match color object', function () {
            expect(hwb.toObject()).deep.eq({
                hue: 144,
                whiteness: 50,
                blackness: 75,
            });
        });
        it('should match rgb hex', function () {
            expect(hwb.toHexString()).to.eq('#804066');
            expect(hwb.toHexString(true)).to.eq('804066');
        });
        it('should whiten hsv with value between 0 - 1', function () {
            expect(hwb.whiten(0.42).toString()).to.eq('hwb(144,71%,75%)');
        });
        it('should whiten hsv with value between 1 - 100', function () {
            expect(hwb.whiten(29).toString()).to.eq('hwb(144,64%,75%)');
        });
        it('should blacken hsv with value between 0 - 1', function () {
            expect(hwb.blacken(0.29).toString()).to.eq('hwb(144,50%,97%)');
        });
        it('should blacken hsv with value between 1 - 100', function () {
            expect(hwb.blacken(100).toString()).to.eq('hwb(144,50%,100%)');
        });
        it('should greyscale hsv color', function () {
            expect(hwb.grayscale().toString()).to.eq('hwb(0,34%,66%)');
        });
        it('should lighten hsv color 0 - 1', function () {
            expect(hwb.lighten(0.22).toString()).to.eq('hwb(144,62%,69%)');
        });
        it('should lighten hsv color -1 - 0', function () {
            expect(hwb.lighten(-0.22).toString()).to.eq('hwb(144,40%,80%)');
        });
        it('should lighten hsv color 1 - 100', function () {
            expect(hwb.lighten(5).toString()).to.eq('hwb(144,54%,73%)');
        });
        it('should darken hsv color 0 - 1', function () {
            expect(hwb.darken(0.22).toString()).to.eq('hwb(144,40%,80%)');
        });
        it('should darken hsv color 1 - 100', function () {
            expect(hwb.darken(5).toString()).to.eq('hwb(144,48%,76%)');
        });
        it('should saturate hsv color 0 - 1', function () {
            expect(hwb.saturate(0.44).toString()).to.eq('hwb(144,38%,62%)');
        });
        it('should saturate hsv color with large number', function () {
            expect(hwb.saturate(203123).toString()).to.eq('hwb(144,38%,62%)');
        });
        it('should saturate hsv color with negative number', function () {
            expect(hwb.saturate(-203123).toString()).to.eq('hwb(144,38%,62%)');
        });
        it('should saturate hsv color 1 - 100', function () {
            expect(hwb.saturate(88).toString()).to.eq('hwb(144,38%,62%)');
        });
        it('should desaturate hsv color 0 - 1', function () {
            expect(hwb.desaturate(0.72).toString()).to.eq('hwb(144,38%,62%)');
        });
        it('should desaturate hsv color 1 - 100', function () {
            expect(hwb.desaturate(12).toString()).to.eq('hwb(144,38%,62%)');
        });
        it('should clone hsv object', function () {
            expect(hwb.clone()).deep.eq(hwb);
        });
        it('should mix hsv colors', function () {
            expect(
                hwb.mix({ hue: 97, whiteness: 64, blackness: 40 }).toString()
            ).to.eq('hwb(255,43%,44%)');
        });
        it('should rotate hsv color hue', function () {
            expect(hwb.rotate(64).toString()).to.eq('hwb(208,50%,75%)');
        });
        it('should set color channels using setter function', function () {
            expect(hwb.setColor('hue', 360).hue()).to.eq(360);
            expect(hwb.setColor('whiteness', 100).whiteness()).to.eq(100);
            expect(hwb.setColor('blackness', 75).blackness()).to.eq(75);
        });
        it('should handle any attempts of overflowing', function () {
            expect(hwb.setColor('blackness', 100).saturate(1).toString()).to.eq(
                'hwb(144,0%,100%)'
            );
        });
        it('should handle any attempts of "underflowing"', function () {
            expect(
                hwb.setColor('whiteness', -1000).desaturate(10000).toString()
            ).to.eq('hwb(144,13%,87%)');
        });
    });
});
