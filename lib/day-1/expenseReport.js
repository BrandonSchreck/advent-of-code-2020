import { getFormattedData } from '../../bin/fileParser.js';

function twoSumViaFilters(expenses, sum) {
  // iterate through expenses
  for (let i = 0; i < expenses.length; i++) {
    let expense = expenses[i];
    let difference = sum - expense;
    let summandsArray = expenses.filter(x => x == difference);

    if (summandsArray.length == 1) {
      return expense * summandsArray[0];
    }
  }
}

function threeSumViaFilters(expenses, sum) {
  // iterate through expenses
  for (let i = 0; i < expenses.length; i++) {
    let expense = expenses.splice(i, 1).pop();
    let difference = sum - expense;
    let twoSumValue = twoSumViaFilters(expenses, difference);

    if (twoSumValue) {
      return expense * twoSumValue;
    }
  }
}

function solveForOne(filePath, callback) {
  getFormattedData(filePath, '\n', (expenses) => {
    const sum = 2020;
    let product = twoSumViaFilters(expenses, sum);
    return callback(product);
  });
}

function solveForTwo(filePath, callback) {
  getFormattedData(filePath, '\n', (expenses) => {
    const sum = 2020;
    let product = threeSumViaFilters(expenses, sum)
    return callback(product);
  });
}

export {
  solveForOne,
  solveForTwo
}