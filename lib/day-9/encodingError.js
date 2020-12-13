import { getFormattedData } from '../../bin/fileParser.js';

const getInvalidNumber = (preamble, outputArray) => {
    let subArrayStart = 0;

    for (let i = preamble; i < outputArray.length; i++) {
        let currentValue = Number(outputArray[i]);
        let subArray = [...outputArray].splice(subArrayStart, preamble);

        if (hasTwoSum(currentValue, subArray)) {
            subArrayStart++;
            preamble++;
        } else {
            return currentValue;
        }
    }
};

const hasTwoSum = (sum, array) => {
    let hashSet = {};

    for (let i = 0; i < array.length; i++) {
        let currentValue = Number(array[i]);
        let difference = sum - currentValue;
        let lookup = hashSet[difference];

        if (lookup !== undefined && (currentValue + lookup == sum)) {
            return true;
        } else {
            hashSet[currentValue] = currentValue;
        }
    }

    return false;
}

const getContiguousSetRange = (invalidNumber, outputArray) => {
    let sum = 0;
    let endingIndex = 0;
    let startingIndex = 0;

    for (let i = startingIndex; i < outputArray.length; i++) {
        endingIndex = i;
        sum += Number(outputArray[i]);

        if ((endingIndex - startingIndex <= 2) || sum < invalidNumber) {
            continue;
        } else if (sum == invalidNumber) {
            return {
                startingIndex,
                endingIndex
            };
        } else {
            sum = 0;
            endingIndex = 0;
            ++startingIndex;
            i = startingIndex - 1;
        }
    }
}

const solveForOne = (relativeFilePath, callback, preamble = 25) => {
    getFormattedData(relativeFilePath, '\n', (outputArray) => {
        let invalidNumber = getInvalidNumber(preamble, outputArray);
        callback(invalidNumber);
    });
}

const solveForTwo = (relativeFilePath, callback, preamble = 25) => {
    getFormattedData(relativeFilePath, '\n', (outputArray) => {
        let invalidNumber = getInvalidNumber(preamble, outputArray);

        let {
            startingIndex,
            endingIndex
        } = getContiguousSetRange(invalidNumber, outputArray);

        let contiguousSet = [...outputArray]
            .slice(startingIndex, endingIndex + 1)
            .map(x => Number(x))
            .sort((a, b) => {
                return a - b;
            });

        let weakness = contiguousSet[0] + contiguousSet[contiguousSet.length - 1];
        return callback(weakness);
    });
}

export {
    solveForOne,
    solveForTwo
}