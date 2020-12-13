import assert from 'assert';
import { solveForOne, solveForTwo } from '../../../lib/day-8/handheldHalting.js';

const relativeFilePath = 'srv/day-8/sample-boot-codes.txt';

describe('Handheld Halting 8.1 test', () => {
    const expectedValue = 5;

    it(`should return ${expectedValue} as the accumulator value`, () => {
        return solveForOne(relativeFilePath, (accumulatorValue) => {
            assert.strictEqual(accumulatorValue, expectedValue);
        });
    });
});

describe('Handheld Halting 8.2 test', () => {
    const expectedValue = 8;

    it(`should return ${expectedValue} as the accumulator value`, () => {
        return solveForTwo(relativeFilePath, (accumulatorValue) => {
            assert.strictEqual(accumulatorValue, expectedValue);
        });
    });
});