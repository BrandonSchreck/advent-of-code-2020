// TODO - refactor
import { readFromFileAsync } from './bin/fileParser.js'
const relativeFilePath = 'srv/day-3/tree-map.txt';

const slopeArray = [
    [1,1],
    [3,1],
    [5,1],
    [7,1],
    [1,2]
]

readFromFileAsync(relativeFilePath, (err, data) => {
    const mapArray = data.toString().split('\n');

    console.log(`There are ${traverseMap(slopeArray[1], mapArray)} trees encountered.`);
    let p = 1;
    slopeArray.forEach(x => {
        return p *= traverseMap(x, mapArray);
    })
    console.log(`The product from multiplying together the number of trees is ${p}`)
});

function traverseMap(slope, mapArray) {
    let i = 0;
    let mapWidth = mapArray[i].length;
    let numberOfTrees = 0;
    let position = {
        x: 0,
        y: 0
    };

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