import { getFormattedData } from '../../bin/fileParser.js';

const groupMapper = (group) => {
    let answers = group.replace(new RegExp('\n', 'g'), '');
    let seen = new Set();
    let numberOfAnswers = [...answers].filter(answer => {
        return seen.has(answer) ? false : seen.add(answer);
    });

    return numberOfAnswers.length;
}

const uniqueArrayFilter = (answers) => {
    let seen = new Set();
    return answers.filter(answer => {
        return seen.has(answer) ?
            false :
            seen.add(answer);
    });
};

const groupMapperV2 = (group) => {
    let groups = group.split('\n');

    if (groups.length === 1) {
        let answers = uniqueArrayFilter([...groups[0]]);
        return answers.length;
    }

    let answerMap = new Map();
    groups.forEach(answer => {
        if (answer.length === 1) {
            if (answerMap.has(answer)) {
                let mapValue = answerMap.get(answer);
                answerMap.set(answer, mapValue + 1);
            } else {
                answerMap.set(answer, 1);
            }
        } else {
            [...answer].map((value, index) => {
                if (answerMap.has(value)) {
                    let mapValue = answerMap.get(value);
                    answerMap.set(value, mapValue + 1);
                } else {
                    answerMap.set(value, 1);
                }
            })
        }
    });

    let matchingAnswers = 0;
    answerMap.forEach((value, key) => {
        if (value === groups.length) {
            ++matchingAnswers;
        }
    });

    return matchingAnswers;
}

const summation = (accumulator, currentValue) => accumulator + currentValue;

//***First attempts***/
// 6.1
const solveForOne = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '\n\n', (groupAnswers) => {
        let sum = groupAnswers.map(groupMapper).reduce(summation);
        callback(sum);
    });
}

// 6.2
// really gross...
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