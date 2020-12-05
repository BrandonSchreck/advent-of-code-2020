import assert from 'assert';
import { solveForOne, solveForTwo } from '../../../lib/day-3/tobogganTrajectory.js';

const relativeFilePath = 'srv/day-3/sample-tree-map.txt';

describe('Toboggan Trajectory 3.1 - Sample', () => {
    const expectedValue = 7;

    it(`should return ${expectedValue} trees`, () => {
        return solveForOne(relativeFilePath, (count) => {
            assert.strictEqual(count, expectedValue);
        });
    });
});

describe('Toboggan Trajectory 3.2 - Sample', () => {
    const expectedValue = 336;

    it(`should return ${expectedValue} trees`, () => {
        return solveForTwo(relativeFilePath, (count) => {
            assert.strictEqual(count, expectedValue);
        });
    });
});