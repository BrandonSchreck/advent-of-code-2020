import assert from 'assert';
import { solveForOne, solveForTwo } from '../../../lib/day-13/shuttleSearch.js';

const relativeFilePath = 'src/day-13/sample-shuttle-schedule.txt';

describe('Shuttle Search 13.1 test', () => {
    const expectedValue = 295;

    it(`Earliest bus multiplied by wait time should be ${expectedValue}`, () => {
        return solveForOne(relativeFilePath, (output) => {
            assert.strictEqual(output, expectedValue);
        });
    });
});

describe('Shuttle Search 13.2 test', () => {
    const expectedValue = 1068781;

    it(`Earliest bus multiplied by wait time should be ${expectedValue}`, () => {
        return solveForTwo(relativeFilePath, (output) => {
            assert.strictEqual(output, expectedValue);
        });
    });
});