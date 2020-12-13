import assert from 'assert';
import { solveForOne, solveForTwo } from '../../../lib/day-9/encodingError.js';

const preamble = 5;
const relativeFilePath = 'srv/day-9/sample-game-output.txt';

describe('Encoding Error 9.1 test', () => {
    const expectedValue = 127;

    it(`${expectedValue} is invalid`, () => {
        return solveForOne(relativeFilePath, (accumulatorValue) => {
            assert.strictEqual(accumulatorValue, expectedValue);
        }, preamble);
    });
});

describe('Encoding Error 9.2 test', () => {
    const expectedValue = 62;

    it(`${expectedValue} is the wekness`, () => {
        return solveForTwo(relativeFilePath, (accumulatorValue) => {
            assert.strictEqual(accumulatorValue, expectedValue);
        }, preamble);
    });
});