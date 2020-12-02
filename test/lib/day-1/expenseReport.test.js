import assert from 'assert';
import { solveForTwoExpenses, solveForThreeExpenses } from '../../../lib/day-1/expenseReport.js';

const relativeFilePath = 'srv/day-1/sample-expense-report.txt';

describe('Expense Report 1.1 - Sample', () => {
    const expectedValue = 514579;

    it(`should return ${expectedValue}`, () => {
        return solveForTwoExpenses(relativeFilePath, (product) => {
            assert.strictEqual(product, expectedValue);
        });
    });
});

describe('Expense Report 1.2 - Sample', () => {
    const expectedValue = 241861950;

    it(`should return ${expectedValue}`, () => {
        return solveForThreeExpenses(relativeFilePath, (product) => {
            assert.strictEqual(product, expectedValue);
        })
    });
});