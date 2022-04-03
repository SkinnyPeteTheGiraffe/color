/* eslint-disable mocha/no-setup-in-describe */
import { expect } from 'chai';
import { mixRGBASpaces } from './rgba-utils';
import { normalizePercent } from '../../common/utils/number-tools';

describe('test rgba util functions', function () {
    const mixRGBASpacesTests = [
        {
            base: {
                red: 255,
                blue: 255,
                green: 255,
                alpha: 1,
            },
            additive: {
                red: 0,
                blue: 0,
                green: 0,
                alpha: 1,
            },
            weight: 0.5,
            expected: {
                red: 128,
                blue: 128,
                green: 128,
                alpha: 1,
            },
        },
        {
            base: {
                red: 0,
                blue: 0,
                green: 0,
                alpha: 1,
            },
            additive: {
                red: 255,
                blue: 255,
                green: 255,
                alpha: 1,
            },
            weight: 0.5,
            expected: {
                red: 128,
                blue: 128,
                green: 128,
                alpha: 1,
            },
        },
        {
            base: {
                red: 0,
                blue: 0,
                green: 0,
                alpha: 0,
            },
            additive: {
                red: 255,
                blue: 255,
                green: 255,
                alpha: 1,
            },
            weight: 1,
            expected: {
                red: 255,
                blue: 255,
                green: 255,
                alpha: 1,
            },
        },
        {
            base: {
                red: 255,
                blue: 255,
                green: 255,
                alpha: 0,
            },
            additive: {
                red: 0,
                blue: 0,
                green: 0,
                alpha: 1,
            },
            weight: 1,
            expected: {
                red: 0,
                blue: 0,
                green: 0,
                alpha: 1,
            },
        },
        {
            base: {
                red: 255,
                blue: 255,
                green: 255,
                alpha: -1,
            },
            additive: {
                red: 0,
                blue: 0,
                green: 0,
                alpha: 1,
            },
            weight: 0.25,
            expected: {
                red: 191,
                blue: 191,
                green: 191,
                alpha: 0,
            },
        },
    ];
    mixRGBASpacesTests.forEach(({ base, additive, weight, expected }) => {
        it(`should mix rgba(${Object.values(base).join(
            ','
        )}) with rgba(${Object.values(additive).join(',')}) with ${
            normalizePercent(weight) * 100
        }% weight`, function () {
            expect(mixRGBASpaces(base, additive, weight)).deep.eq(expected);
        });
    });
});
