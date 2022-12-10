import assert from 'assert';
import { solveForOne, solveForTwo } from '../../../lib/day-10/adapterArray.js';

describe('Adapter Array 10.1a test', () => {
    const expectedValue = 35;
    const relativeFilePath = 'src/day-10/sample-one-output-joltage.txt';

    it(`${expectedValue} is the difference`, () => {
        return solveForOne(relativeFilePath, (accumulatorValue) => {
            assert.strictEqual(accumulatorValue, expectedValue);
        });
    });
});

describe('Adapter Array 10.1b test', () => {
    const expectedValue = 220;
    const relativeFilePath = 'src/day-10/sample-two-output-joltage.txt';

    it(`${expectedValue} is the difference`, () => {
        return solveForOne(relativeFilePath, (accumulatorValue) => {
            assert.strictEqual(accumulatorValue, expectedValue);
        });
    });
});

describe('Adapter Array 10.2a test', () => {
    const expectedValue = 8;
    const relativeFilePath = 'src/day-10/sample-one-output-joltage.txt';

    it(`${expectedValue} paths`, () => {
        return solveForTwo(relativeFilePath, (accumulatorValue) => {
            assert.strictEqual(accumulatorValue, expectedValue);
        });
    });
});

describe('Adapter Array 10.2b test', () => {
    const expectedValue = 19208;
    const relativeFilePath = 'src/day-10/sample-two-output-joltage.txt';

    it(`${expectedValue} paths`, () => {
        return solveForTwo(relativeFilePath, (accumulatorValue) => {
            assert.strictEqual(accumulatorValue, expectedValue);
        });
    });
});