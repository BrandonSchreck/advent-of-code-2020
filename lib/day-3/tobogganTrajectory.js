import { getFormattedData } from '../../bin/fileParser.js';

function solve(mapArray, slopeArray) {
    let trees = 1;
    
    for(let i = 0; i < slopeArray.length; i++) {
        trees *= traverseMap(slopeArray[i], mapArray);
    }
    
    return trees;
}

function traverseMap(slope, mapArray) {
    let i = 0,
        mapWidth = mapArray[i].length,
        numberOfTrees = 0,
        position = { x: 0, y: 0 };

    while (i != mapArray.length - 1) {
        position.y = i += slope[1];
        position.x += slope[0];

        if (position.x > mapWidth - 1) {
            position.x = position.x - mapWidth;
        }

        numberOfTrees += mapArray[i].charAt(position.x) === '#' ? 1 : 0;
    }

    return numberOfTrees;
}

const solveForOne = (relativeFilePath, callback) => {
    const slopeArray = [ [3, 1] ];

    getFormattedData(relativeFilePath, '\n', (mapArray) => {
        return callback(solve(mapArray, slopeArray));
    });
}

const solveForTwo = (relativeFilePath, callback) => {
    const slopeArray = [ [1, 1], [3, 1], [5, 1], [7, 1], [1, 2] ];

    getFormattedData(relativeFilePath, '\n', (mapArray) => {
        return callback(solve(mapArray, slopeArray));
    });
}

export {
    solveForOne,
    solveForTwo
}