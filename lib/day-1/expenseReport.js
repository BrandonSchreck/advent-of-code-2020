import { getFormattedData } from '../../bin/fileParser.js';

function calculateTwoSum(expenses, sum) {
  let expensesHashTable = {};

  for (let i = 0; i < expenses.length; i++) {
    let expense = Number(expenses[i]);
    let difference = sum - expense;
    let secondExpense = expensesHashTable[difference];

    if (secondExpense !== undefined && (expense + secondExpense == sum)) {
      return expense * secondExpense;
    } else {
      expensesHashTable[expense] = expense;
    }
  }
}

function calculateThreeSum(expenses, sum) {
  for (let i = 0; i < expenses.length; i++) {
    let expense = expenses.splice(i, 1).pop();
    let difference = sum - expense;
    let twoSumValue = calculateTwoSum(expenses, difference);

    if (twoSumValue) {
      return expense * twoSumValue;
    }
  }
}

function solveForOne(filePath, callback) {
  getFormattedData(filePath, '\n', (expenses) => {
    let product = calculateTwoSum(expenses, 2020);
    return callback(product);
  });
}

function solveForTwo(filePath, callback) {
  getFormattedData(filePath, '\n', (expenses) => {
    let product = calculateThreeSum(expenses, 2020)
    return callback(product);
  });
}

export {
  solveForOne,
  solveForTwo
}