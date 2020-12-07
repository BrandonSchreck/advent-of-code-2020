import { getFormattedData } from '../../bin/fileParser.js';

// naming things is the hardest...
const middleOut = (upper, lower) => (upper - lower) / 2 + lower;
const planeCapacity = {
    rows: 128,
    columns: 8
};

const passMap = (boardingPass) => {
    const seat = parseBoardingPass(0, planeCapacity.rows, 0, planeCapacity.columns, [...boardingPass]);
    const seatNumber = seat[0] * 8 + seat[1];
    return seatNumber;
}

const parseBoardingPass = (lowerRow, row, lowerColumn, column, boardingPass) => {
    let value = boardingPass.shift();

    switch (value) {
        case 'F':
            return parseBoardingPass(lowerRow, middleOut(row, lowerRow), lowerColumn, column, boardingPass);
        case 'B':
            return parseBoardingPass(middleOut(row, lowerRow), row, lowerColumn, column, boardingPass);
        case 'R':
            return parseBoardingPass(lowerRow, row, middleOut(column, lowerColumn), column, boardingPass);
        case 'L':
            return parseBoardingPass(lowerRow, row, lowerColumn, middleOut(column, lowerColumn), boardingPass);
        default:
            return [--row, --column];
    }
}

const missingSeatsFilter = (seat, index, seats) => {
    if ((index + 1) === seats.length) {
        return false;
    }
    let nextSeat = seats[index + 1];
    return nextSeat - seat > 1 ? true : false;
}

const solveForOne = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '\n', (boardingPasses) => {
        const seatNumbers = boardingPasses.map(passMap).sort((a, b) => b - a);
        return callback(seatNumbers[0]);
    });
}

const solveForTwo = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '\n', (boardingPasses) => {
        const seatNumbers = boardingPasses.map(passMap).sort((a, b) => a - b);
        const missingSeats = seatNumbers.filter(missingSeatsFilter);
        return callback(missingSeats[0] + 1);
    });
}

export {
    solveForOne,
    solveForTwo
}