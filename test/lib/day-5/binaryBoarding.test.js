import assert from 'assert';
import { solveForOne } from '../../../lib/day-5/binaryBoarding.js';

describe('Password Processor 4.1 test', () => {
    const relativeFilePath = 'srv/day-5/sample-boarding-passes.txt';
    const expectedValue = 820;

    it(`should return seatId: ${expectedValue}`, () => {
        return solveForOne(relativeFilePath, (seatId) => {
            assert.strictEqual(seatId, expectedValue);
        });
    });
});