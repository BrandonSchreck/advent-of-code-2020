import { getFormattedData } from '../../bin/fileParser.js';

const summation = (accumulator, currentValue) => accumulator + currentValue;
const answerFilter = (group, answer) => {
    let indivualResponse = group.split('\n');
    return indivualResponse.every(response => response.includes(answer));
}

const groupMapper = (group) => {
    let allAnswers = group.replace(new RegExp('\n', 'g'), '');
    let uniqueAnswers = new Set([...allAnswers]);
    return uniqueAnswers.size;
}

const groupMapperV2 = (group) => {
    let allAnswers = group.replace(new RegExp('\n', 'g'), '');
    let uniqueAnswers = new Set([...allAnswers]);
    let matchingAnswers = [...uniqueAnswers].filter(answer => answerFilter(group, answer));
    return matchingAnswers.length;
}

// 6.1
const solveForOne = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '\n\n', (groupAnswers) => {
        let sum = groupAnswers.map(groupMapper).reduce(summation);
        callback(sum);
    });
}

// 6.2
const solveForTwo = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '\n\n', (groupAnswers) => {
        let sum = groupAnswers.map(groupMapperV2).reduce(summation);
        callback(sum);
    });
}

export {
    solveForOne,
    solveForTwo
}