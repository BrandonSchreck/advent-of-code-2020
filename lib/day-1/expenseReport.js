import { getFormattedData } from '../../bin/fileParser.js';

// TODO - rework og solution

// // *** Hashtables *** //	
// function solveForTwoExpenses(filePath, callback, sum = 2020) {	
//   // async read from file	
//   readFromFileAsync(filePath, (err, data) => {	
//     // take the data and split by new line, then map to a number	
//     let expenses = data.toString().split('\n').map(Number);	
//     return callback(twoSumViaHashTable(expenses, sum));	
//   });	
// }	

// function solveForThreeExpenses(filePath, callback, sum = 2020) {	
//   // async read from file	
//   readFromFileAsync(filePath, (err, data) => {	
//     // take the data and split by new line, then map to a number	
//     let expenses = data.toString().split('\n').map(Number);	
//     return callback(threeSumViaHashTable(expenses, sum));	
//   });	
// }	

// function twoSumViaHashTable(expenses, sum) {	
//   // create an object to store hash table	
//   let expensesHashTable = {};	

//   // iterate through expenses	
//   for (let i = 0; i < expenses.length; i++) {	
//     let expense = expenses[i];	
//     let difference = sum - expense;	
//     let secondExpense = expensesHashTable[difference];	

//     // if the hash table contains the difference	
//     // and if the current expense plus the difference equals the targeted sum	
//     if (secondExpense !== undefined && (expense + secondExpense === sum)) {	
//       // we have a winner! - return the product of the expenses	
//       return expense * secondExpense;	
//     } else {	
//       // store the current expense in the hashtable	
//       expensesHashTable[expenses[i]] = expenses[i];	
//     }	
//   }	
// }	

// function threeSumViaHashTable(expenses, sum) {	
//   // iterate through expenses	
//   for (let i = 0; i < expenses.length; i++) {	
//     let expense = expenses.splice(i, 1).pop();	
//     let difference = sum - expense;	
//     let twoSumValue = twoSumViaHashTable(expenses, difference);	

//     if (twoSumValue) {	
//       return expense * twoSumValue;	
//     }	
//   }	
// }

// TODO - refactor O(n^2) time complexity (code smell)
// original implementation is more performant
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

// TODO - refactor O(n^3) time complexity (code smell)
// original implementation is more performant
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