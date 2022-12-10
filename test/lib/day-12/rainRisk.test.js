import assert from 'assert';
import { solveForOne, solveForTwo } from '../../../lib/day-12/rainRisk.js';

const relativeFilePath = 'src/day-12/sample-navigation-instructions.txt';

describe('Rain Risk 12.1 test', () => {
    const expectedValue = 25;

    it(`Manhattan distance should be ${expectedValue}`, () => {
        return solveForOne(relativeFilePath, (distance) => {
            assert.strictEqual(distance, expectedValue);
        });
    });
});

describe('Rain Risk 12.2 test', () => {
    const expectedValue = 286;

    it(`Manhattan distance should be ${expectedValue}`, () => {
        return solveForTwo(relativeFilePath, (distance) => {
            assert.strictEqual(distance, expectedValue);
        });
    });
});