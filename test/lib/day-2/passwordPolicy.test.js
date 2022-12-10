import assert from 'assert';
import { solveForOne, solveForTwo } from '../../../lib/day-2/passwordPolicy.js';

const relativeFilePath = 'src/day-2/sample-password-policies.txt';

describe('Password Policy 2.1 - Sample', () => {
    const expectedValue = 2;

    it(`should return ${expectedValue} valid password policies`, () => {
        return solveForOne(relativeFilePath, (count) => {
            assert.strictEqual(count, expectedValue);
        });
    });
});

describe('Password Policy 2.2 - Sample', () => {
    const expectedValue = 1;

    it(`should return ${expectedValue} valid password policies`, () => {
        return solveForTwo(relativeFilePath, (count) => {
            assert.strictEqual(count, expectedValue);
        });
    });
});