import { getArrayFromFile } from '../../bin/fileParser.js';

const solve = (filePath) => {
    getArrayFromFile(filePath, (err, data) => {
        const inputs = data.toString().split("\n");
        console.log(inputs);
    });
}

export {
    solve
}