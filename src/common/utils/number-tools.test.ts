/* eslint-disable mocha/no-setup-in-describe */
import { expect } from 'chai';
import {
    clampNumericValue,
    normalizePercent,
    normalizeRotation,
} from './number-tools';

describe('test number tools functions', function () {
    const normalizePercentTests = [
        { value: 100, allowNegative: false, expected: 1 },
        { value: 1, allowNegative: false, expected: 1 },
        { value: 75, allowNegative: false, expected: 0.75 },
        { value: -100, allowNegative: true, expected: -1 },
        { value: -1, allowNegative: true, expected: -1 },
        { value: -75, allowNegative: true, expected: -0.75 },
        { value: -75, allowNegative: false, expected: 0 },
    ];
    const clampNumericValueTests = [
        { value: 100, min: 0, max: 100, expected: 100 },
        { value: 120, min: 0, max: 100, expected: 100 },
        { value: 0, min: 0, max: 100, expected: 0 },
        { value: -20, min: 0, max: 100, expected: 0 },
    ];
    const normalizeRotationTests = [
        { value: -540, expected: 180 },
        { value: 180, expected: 180 },
        { value: 720, expected: 0 },
        { value: 386, expected: 26 },
        { value: -4, expected: 356 },
        { value: 0, expected: 0 },
        { value: 360, expected: 0 },
    ];
    describe('test normalize percent function', function () {
        normalizePercentTests.forEach(({ value, allowNegative, expected }) => {
            it(`should normalize ${value} and ${
                allowNegative ? '' : 'not'
            } allowing negatives values`, function () {
                expect(normalizePercent(value, allowNegative)).to.eq(expected);
            });
        });
    });
    describe('test clamp function', function () {
        clampNumericValueTests.forEach(({ value, min, max, expected }) => {
            it(`should clamp ${value} between ${min} and ${max}`, function () {
                expect(clampNumericValue(value, min, max)).to.eq(expected);
            });
        });
    });
    describe('test normalize rotation function', function () {
        normalizeRotationTests.forEach(({ value, expected }) => {
            it(`should normalize ${value} degrees`, function () {
                expect(normalizeRotation(value)).to.eq(expected);
            });
        });
    });
});
