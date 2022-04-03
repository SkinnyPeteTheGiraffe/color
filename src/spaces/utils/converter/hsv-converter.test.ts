/* eslint-disable mocha/no-setup-in-describe */

import { expect } from 'chai';
import hsvConverter from './hsv-converter';
import HSVColorSpace from '../../hsv/types/hsv-color-space';

const color: HSVColorSpace = {
    hue: 180,
    saturation: 58,
    value: 78,
};

describe('test HSV conversion functions', function () {
    describe('should convert HSV to RGBA', function () {
        const rgbaTests = [
            {
                value: {
                    hue: 180,
                    saturation: 58,
                    value: 78,
                },
                expected: {
                    red: 84,
                    green: 199,
                    blue: 199,
                    alpha: 1,
                },
            },
            {
                value: {
                    hue: 45,
                    saturation: 20,
                    value: 100,
                },
                expected: {
                    red: 255,
                    green: 242,
                    blue: 204,
                    alpha: 1,
                },
            },
            {
                value: {
                    hue: 270,
                    saturation: 20,
                    value: 69,
                },
                expected: {
                    red: 158,
                    green: 141,
                    blue: 176,
                    alpha: 1,
                },
            },
            {
                value: {
                    hue: 300,
                    saturation: 20,
                    value: 69,
                },
                expected: {
                    red: 176,
                    green: 141,
                    blue: 176,
                    alpha: 1,
                },
            },
            {
                value: {
                    hue: Number.POSITIVE_INFINITY,
                    saturation: 20,
                    value: 69,
                },
                expected: {
                    red: 0,
                    green: 0,
                    blue: 0,
                    alpha: 1,
                },
            },
        ];
        rgbaTests.forEach(({ value, expected }) => {
            it(`should convert hsl(${value.hue},${value.saturation}%,${value.value}%) to RGBA`, function () {
                expect(hsvConverter.toRGBA(value)).deep.eq(expected);
            });
        });
    });
    it('should convert HSV to HWB', function () {
        expect(hsvConverter.toHWB(color)).deep.eq({
            hue: 180,
            whiteness: 33,
            blackness: 22,
        });
    });
    it('should convert HSV to HSL', function () {
        expect(hsvConverter.toHSL(color)).deep.eq({
            hue: 180,
            saturation: 51,
            lightness: 55,
        });
    });
});
