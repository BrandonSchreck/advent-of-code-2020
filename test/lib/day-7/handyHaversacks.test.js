import assert from 'assert';
import {
    solveForOne,
    solveForTwo
} from '../../../lib/day-7/handyHaversacks.js';

describe('Handy Haversacks 7.1 test', () => {
    const relativeFilePath = 'srv/day-7/sample-bagging-rules.txt';
    const expectedValue = 4;

    it(`should return ${expectedValue} bags`, () => {
        return solveForOne(relativeFilePath, (bags) => {
            assert.strictEqual(bags, expectedValue);
        });
    });
});

describe('Handy Haversacks 7,2a test', () => {
    const relativeFilePath = 'srv/day-7/sample-bagging-rules.txt';
    const expectedValue = 32;

    it(`should return ${expectedValue} bags`, () => {
        return solveForTwo(relativeFilePath, (bags) => {
            assert.strictEqual(bags, expectedValue);
        });
    });
});

describe('Handy Haversacks 7,2b test', () => {
    const relativeFilePath = 'srv/day-7/another-sample-bagging-rules.txt';
    const expectedValue = 126;

    it(`should return ${expectedValue} bags`, () => {
        return solveForTwo(relativeFilePath, (bags) => {
            assert.strictEqual(bags, expectedValue);
        });
    });
});