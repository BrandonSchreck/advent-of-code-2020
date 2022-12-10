import { createRequire } from 'module';
import { getFormattedData } from "../../bin/fileParser.js";

const require = createRequire(import.meta.url);
const lcm = require('lcm');

const solveForOne = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '\n', (busSchedule) => {
        let currentTime, departingBus, earliestDeparture;
        
        earliestDeparture = currentTime = +busSchedule[0];
        const schedule = busSchedule[1].split(',').filter(x => x !== 'x').map(x => Number(x));

        while (!departingBus) {
            currentTime++;
            departingBus = schedule.find(x => { return currentTime % x === 0});
        }

        callback((currentTime - earliestDeparture) * departingBus);
    });
}

const solveForTwo = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '\n', (busSchedule) => {
        let currentTime, offset;

        // split string, map to obj with value and index,
        // and remove any 'x' 
        const schedule = busSchedule[1]
            .split(',')
            .map((id, i) => ({ id, i }))
            .filter(x => x.id !== 'x');

        const firstBus = schedule.shift();
        currentTime = offset = +firstBus.id;

        for (let { id, i} of schedule) {
            while ((currentTime + i) % +id !== 0) {
                currentTime += offset;
            }
            offset = lcm(offset, +id);
        }

        callback(currentTime);
    });
}

export {
    solveForOne,
    solveForTwo
}