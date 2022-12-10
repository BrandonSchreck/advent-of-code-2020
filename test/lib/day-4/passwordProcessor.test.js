import assert from 'assert';
import { solveForOne, solveForTwo } from '../../../lib/day-4/passwordProcessor.js';

describe('Password Processor 4.1 test', () => {
    const relativeFilePath = 'src/day-4/sample-passport-data.txt';
    const expectedValue = 2;

    it(`should return ${expectedValue} valid passports`, () => {
        return solveForOne(relativeFilePath, (count) => {
            assert.strictEqual(count, expectedValue);
        });
    });
});

describe('Password Processor 4.2 tests', () => {
    it(`should return valid passports`, () => {
        const validPassportsFilePath = 'src/day-4/valid-passports.txt';
        return solveForTwo(validPassportsFilePath, (count) => {
            assert.notStrictEqual(0, count);
        });
    });

    it(`should return no valid passports`, () => {
        const invalidPassportsFilePath = 'src/day-4/invalid-passports.txt';
        return solveForTwo(invalidPassportsFilePath, (count) => {
            assert.strictEqual(0, count);
        });
    });
});

