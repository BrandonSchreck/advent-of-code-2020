import { getFormattedData } from '../../bin/fileParser.js';

const calculateDifferences = (adapterArray) => {
    let oneJolters = 0;
    let twoJolters = 0;
    let threeJolters = 0;

    for (let i = 0; i < adapterArray.length; i++) {
        let currentAdapter = adapterArray[i];
        let previousAdapter = adapterArray[i - 1] ?? 0;
        let difference = currentAdapter - previousAdapter;

        switch (difference) {
            case 3: 
                ++threeJolters;
                break;
            case 2:
                ++twoJolters;
                break;
            case 1:
                ++oneJolters;
                break;
            default:
                throw "WTF";
        }
    }

    return oneJolters * (threeJolters + 1);
}

const solveForOne = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '\n', (adapterArray) => {
        adapterArray = adapterArray.map(Number).sort((a, b) => a - b);
        let result = calculateDifferences(adapterArray);
        return callback(result);
    });
} 

const solveForTwo = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '\n', (adapterArray) => {
        let paths = { '0': 1 };
        adapterArray = [0, ...adapterArray.map(Number).sort((a, b) => a - b)];

        for (let i = 1; i < adapterArray.length; i++) {
            let currentAdapter = adapterArray[i];
            let path1 = paths[currentAdapter - 1] ?? 0;
            let path2 = paths[currentAdapter - 2] ?? 0;
            let path3 = paths[currentAdapter - 3] ?? 0;
            paths[currentAdapter] = path1 + path2 + path3;
        }

        let pathKeys = Object.keys(paths).sort((a,b) => a - b);
        let endingIndex =  pathKeys[pathKeys.length - 1];
        return callback(paths[endingIndex]);
    });
} 

export {
    solveForOne,
    solveForTwo
}