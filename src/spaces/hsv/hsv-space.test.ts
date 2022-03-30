import { HSVSpace } from './index';

describe('hsv color space', () => {
    let hsv: HSVSpace;

    beforeEach(() => {
        hsv = new HSVSpace({ hue: 144, saturation: 50, value: 75 });
    });

    describe('color channel mutators', () => {
        it('should whiten hsv with value between 0 - 1', () => {
            expect(hsv.whiten(0.42).toString()).toBe<string>(
                'hsv(144,29%,75%)'
            );
        });
        it('should whiten hsv with value between 1 - 100', () => {
            expect(hsv.whiten(29).toString()).toBe<string>('hsv(144,35%,75%)');
        });
        it('should blacken hsv with value between 0 - 1', () => {
            expect(hsv.blacken(0.42).toString()).toBe<string>(
                'hsv(144,41%,64%)'
            );
        });
        it('should blacken hsv with value between 1 - 100', () => {
            expect(hsv.blacken(100).toString()).toBe<string>(
                'hsv(144,25%,50%)'
            );
        });
        it('should greyscale hsv color', () => {
            expect(hsv.grayscale().toString()).toBe<string>('hsv(0,0%,0%)');
        });
        it('should lighten hsv color 0 - 1', () => {
            expect(hsv.lighten(0.22).toString()).toBe<string>(
                'hsv(144,33%,81%)'
            );
        });
        it('should lighten hsv color -1 - 0', () => {
            expect(hsv.lighten(-0.22).toString()).toBe<string>(
                'hsv(144,60%,63%)'
            );
        });
        it('should lighten hsv color 1 - 100', () => {
            expect(hsv.lighten(5).toString()).toBe<string>('hsv(144,45%,76%)');
        });
        it('should darken hsv color 0 - 1', () => {
            expect(hsv.darken(0.22).toString()).toBe<string>(
                'hsv(144,60%,63%)'
            );
        });
        it('should darken hsv color 1 - 100', () => {
            expect(hsv.darken(5).toString()).toBe<string>('hsv(144,54%,73%)');
        });
        it('should saturate hsv color 0 - 1', () => {
            expect(hsv.saturate(0.44).toString()).toBe<string>(
                'hsv(144,64%,83%)'
            );
        });
        it('should saturate hsv color with large number', () => {
            expect(hsv.saturate(203123).toString()).toBe<string>(
                'hsv(144,80%,93%)'
            );
        });
        it('should saturate hsv color with negative number', () => {
            expect(hsv.saturate(-203123).toString()).toBe<string>(
                'hsv(144,0%,56%)'
            );
        });
        it('should saturate hsv color 1 - 100', () => {
            expect(hsv.saturate(88).toString()).toBe<string>(
                'hsv(144,77%,91%)'
            );
        });
        it('should desaturate hsv color 0 - 1', () => {
            expect(hsv.desaturate(0.72).toString()).toBe<string>(
                'hsv(144,14%,75%)'
            );
        });
        it('should desaturate hsv color 1 - 100', () => {
            expect(hsv.desaturate(12).toString()).toBe<string>(
                'hsv(144,44%,75%)'
            );
        });
        it('should clone hsv object', () => {
            expect(hsv.clone()).toMatchObject<HSVSpace>(hsv);
        });
        it('should mix hsv colors', () => {
            expect(
                hsv.mix({ hue: 97, saturation: 64, value: 40 }).toString()
            ).toBe<string>('hsv(0,100%,100%)');
        });
        it('should rotate hsv color hue', () => {
            expect(hsv.rotate(64).toString()).toBe<string>('hsv(208,50%,75%)');
        });
        it('should set color channels using setter function', () => {
            expect(hsv.setColor('hue', 360).hue()).toBe<number>(360);
            expect(hsv.setColor('value', 100).value()).toBe<number>(100);
            expect(hsv.setColor('saturation', 75).saturation()).toBe<number>(
                75
            );
        });
        it('should handle any attempts of overflowing', () => {
            expect(
                hsv.setColor('saturation', 100).saturate(1).toString()
            ).toBe<string>('hsv(144,100%,75%)');
        });
        it('should handle any attempts of "underflowing"', () => {
            expect(
                hsv.setColor('saturation', -1000).desaturate(10000).toString()
            ).toBe<string>('hsv(144,0%,75%)');
        });
    });
});