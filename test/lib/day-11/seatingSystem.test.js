import assert from 'assert';
import { solveForOne, solveForTwo } from '../../../lib/day-11/seatingSystem.js';

const relativeFilePath = 'srv/day-11/sample-seating-map.txt';

describe('Seating System 11.1 test', () => {
    const expectedValue = 37;

    it(`should be ${expectedValue} occupied seats`, () => {
        return solveForOne(relativeFilePath, (seats) => {
            assert.strictEqual(seats, expectedValue);
        });
    });
});

describe('Seating System 11.2 test', () => {
    const expectedValue = 26;

    it(`should be ${expectedValue} occupied seats`, () => {
        return solveForTwo(relativeFilePath, (seats) => {
            assert.strictEqual(seats, expectedValue);
        });
    });
});