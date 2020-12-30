import { getFormattedData } from '../../bin/fileParser.js';

const EAST_BEARING = 'EAST';
const NORTH_BEARING = 'NORTH';
const SOUTH_BEARING = 'SOUTH';
const WEST_BEARING = 'WEST';

const turnShipOne = (currentBearing, degrees, direction) => {
    switch(currentBearing) {
        case EAST_BEARING:
            if (degrees == 180) currentBearing = WEST_BEARING;
            else if ( direction == 'L' && degrees == 90 || direction == 'R' && degrees == 270 ) currentBearing = NORTH_BEARING;
            else if ( direction == 'R' && degrees == 90 || direction == 'L' && degrees == 270 ) currentBearing = SOUTH_BEARING;
            break;
        case NORTH_BEARING:
            if (degrees == 180) currentBearing = SOUTH_BEARING;
            else if ( direction == 'L' && degrees == 90 || direction == 'R' && degrees == 270 ) currentBearing = WEST_BEARING;
            else if ( direction == 'R' && degrees == 90 || direction == 'L' && degrees == 270 ) currentBearing = EAST_BEARING;
            break;
        case SOUTH_BEARING:
            if (degrees == 180) currentBearing = NORTH_BEARING;
            else if ( direction == 'L' && degrees == 90 || direction == 'R' && degrees == 270 ) currentBearing = EAST_BEARING;
            else if ( direction == 'R' && degrees == 90 || direction == 'L' && degrees == 270 ) currentBearing = WEST_BEARING;
            break;
        case WEST_BEARING:
            if (degrees == 180) currentBearing = EAST_BEARING;
            else if ( direction == 'L' && degrees == 90 || direction == 'R' && degrees == 270 ) currentBearing = SOUTH_BEARING;
            else if ( direction == 'R' && degrees == 90 || direction == 'L' && degrees == 270 ) currentBearing = NORTH_BEARING;
            break;
        default:
            throw `Bearing ${currentBearing} has not been defined.`;
    }

    return currentBearing;
}

const turnShipTwo = (step, units, ship) => {
    let currentX = ship.waypoint.x;
    let currentY = ship.waypoint.y;

    if ((step === 'R' || step === 'L') && units === 180) {
        ship.waypoint.x = -currentX;
        ship.waypoint.y = -currentY;
    }
    else if ( (step === 'R' && units === 90) || (step === 'L' && units === 270) ) {
        ship.waypoint.x = currentY;
        ship.waypoint.y = -currentX;
    }
    else if ( (step === 'L' && units === 90) || (step === 'R' && units === 270) ) {
        ship.waypoint.x = -currentY;
        ship.waypoint.y = currentX;
    }

    return ship;
}

const navigationOne = (step, units, ship) => {
    switch(step) {
        case 'N':
            ship.y += units;
            break;
        case 'S':
            ship.y -= units;
            break;
        case 'E':
            ship.x += units;
            break;
        case 'W':
            ship.x -= units;
            break;
        case 'L':
        case 'R':
            ship.bearing = turnShipOne(ship.bearing, units, step);
            break;
        case 'F':
            let direction = ship.bearing.slice(0,1);
            ship = navigationOne(direction, units, ship);
            break;
    }

    return ship;
}

const navigationTwo = (step, units, ship) => {
    switch(step) {
        case 'N':
            ship.waypoint.y += units;
            break;
        case 'S':
            ship.waypoint.y -= units;
            break;
        case 'E':
            ship.waypoint.x += units;
            break;
        case 'W':
            ship.waypoint.x -= units;
            break;
        case 'L':
        case 'R':
            ship = turnShipTwo(step, units, ship)
            break;
        case 'F':
            ship.coordinates.x += (ship.waypoint.x * units);
            ship.coordinates.y += (ship.waypoint.y * units);
            break;
    }

    return ship;
}

const traverse = (navStep, ship, navigate) => {
    let step = navStep.slice(0,1);
    let units = Number(navStep.slice(1));
    return navigate(step, units, ship);
}

const solveForOne = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '\n', (navigationInstructions) => {
        let ship = { bearing: EAST_BEARING, x: 0, y: 0 };

        navigationInstructions.forEach((navStep) => {
            ship = traverse(navStep, ship, navigationOne);
        });

        callback(Math.abs(ship.x) + Math.abs(ship.y));
    });
}

const solveForTwo = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '\n', (navigationInstructions) => {
        let ship = { 
            coordinates: { x: 0, y: 0 },
            waypoint: { x: 10, y: 1 } 
        };

        navigationInstructions.forEach((navStep) => {
            ship = traverse(navStep, ship, navigationTwo);
        });

        callback(Math.abs(ship.coordinates.x) + Math.abs(ship.coordinates.y));
    });
}

export {
    solveForOne,
    solveForTwo
}