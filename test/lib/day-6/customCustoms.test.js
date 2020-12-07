import assert from 'assert';
import { solveForOne, solveForTwo } from '../../../lib/day-6/customCustoms.js';

describe('Custom Customs 6.1 test', () => {
    const relativeFilePath = 'srv/day-6/sample-group-forms.txt';
    const expectedValue = 11;

    it(`should return ${expectedValue} unique answers`, () => {
        return solveForOne(relativeFilePath, (sum) => {
            assert.strictEqual(sum, expectedValue);
        });
    });
});

describe('Custom Customs 6.2 test', () => {
    const relativeFilePath = 'srv/day-6/sample-group-forms.txt';
    const expectedValue = 6;

    it(`should return ${expectedValue} unique answers`, () => {
        return solveForTwo(relativeFilePath, (sum) => {
            assert.strictEqual(sum, expectedValue);
        });
    });
});