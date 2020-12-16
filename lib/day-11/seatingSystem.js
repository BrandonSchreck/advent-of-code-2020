import { getFormattedData } from '../../bin/fileParser.js';

const getAdjacentOccupancy = (seatX, seatY, rowWidth, seatingMapHeight, seatMap) => {
    let occupiedSeats = 0;
    let endingRow = seatX + 1;;
    let endingColumn = seatY + 1;

    for (let i = seatX - 1; i <= endingRow; i++) {
        if (i < 0 || i > seatingMapHeight) continue; // if out of map
        for (let j = seatY - 1; j <= endingColumn; j++) {
            if (j < 0 || j > rowWidth) continue; // if out of map
            if (i == seatX && j == seatY) continue; // if the current seat 
            if (seatMap[i][j] == '#') ++occupiedSeats;
        }
    }

    return occupiedSeats;
}

const getSeenOccupancy = (seatX, seatY, rowWidth, seatingMapHeight, seatMap) => {
    let occupiedSeats = 0;
    let directionArray = [
        [-1,-1], [-1,0], [-1,1],
        [ 0,-1],         [ 0,1],
        [ 1,-1], [ 1,0], [ 1,1]
    ];

    for (let i = 0; i < directionArray.length; i++) {
        let multiplier = 1;
        let withinSeatingArea = true;
        let currentDirection = directionArray[i];
        
        while(withinSeatingArea) {
            let nextX = seatX + currentDirection[0] * multiplier;
            let nextY = seatY + currentDirection[1] * multiplier;

            if (nextX < 0 || nextX > seatingMapHeight) withinSeatingArea = false; // if out of map
            else if (nextY < 0 || nextY > rowWidth) withinSeatingArea = false; // if out of map
            else if (seatMap[nextX][nextY] == 'L') break; // break on first vacant seat
            else if (seatMap[nextX][nextY] == '#') { // is occupied...increase and bounce
                ++occupiedSeats;
                break;
            }
            else ++multiplier; // increase multiplier
        }
    }

    return occupiedSeats;
}

const updateSeatLayout = (seatMap, occupancyRules, tolerance) => {
    let numberOfUpdates = 0;
    let occupiedSeats = 0;
    
    let updatedSeatLayout = seatMap.map((row, i, seatMap) => {
        let updatedRow = [];

        updatedRow = [...row].map((seat, j, row) => {
            let lastRowIndex = row.length - 1;
            let lastColumnIndex = seatMap.length - 1;
            let adjacentOccupancy = occupancyRules(i, j, lastRowIndex, lastColumnIndex, seatMap);

            switch(seat) {
                case 'L':
                    if (adjacentOccupancy == 0) {
                        ++numberOfUpdates;
                        ++occupiedSeats;
                        return '#';
                    }
                    return 'L';
                case '#':
                    if (adjacentOccupancy >= tolerance) {
                        ++numberOfUpdates;
                        return 'L';
                    } else {
                        ++occupiedSeats;
                        return '#';
                    }
                default:
                    return '.';
            }

        });

        return updatedRow.join('');
    });

    return {
        runAgain: numberOfUpdates !== 0,
        occupiedSeats: occupiedSeats,
        updatedSeatLayout: updatedSeatLayout
    };
}

function solve(seatLayout, occupancyRules, tolerance) {
    let numberOccupied = 0;
    let chaosStabilized = false;

    while (!chaosStabilized) {
        let {
            runAgain,
            occupiedSeats,
            updatedSeatLayout
        } = updateSeatLayout(seatLayout, occupancyRules, tolerance);

        chaosStabilized = !runAgain;
        numberOccupied = occupiedSeats;
        seatLayout = updatedSeatLayout;
    }

    return numberOccupied;
}

const solveForOne = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '\n', (seatLayout) => {
        let tolerance = 4;
        callback(solve(seatLayout, getAdjacentOccupancy, tolerance));
    });
}

const solveForTwo = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '\n', (seatLayout) => {
        let tolerance = 5;
        callback(solve(seatLayout, getSeenOccupancy, tolerance));
    });
}

export {
    solveForOne,
    solveForTwo
}