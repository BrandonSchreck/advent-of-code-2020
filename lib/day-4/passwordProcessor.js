import { readFromFileAsync } from '../../bin/fileParser.js';
import {
    birthYearValidator,
    issueYearValidator,
    experirationYearValidator,
    heightValidator,
    hairColorValidator,
    eyeColorValidator,
    passportValidator
} from './validators.js';

// array of fields and if they are required
const v1FieldMatrix = [
    { key: 'byr:', required: true  },
    { key: 'iyr:', required: true  },
    { key: 'eyr:', required: true  },
    { key: 'hgt:', required: true  },
    { key: 'hcl:', required: true  },
    { key: 'ecl:', required: true  },
    { key: 'pid:', required: true  },
    { key: 'cid:', required: false },
];

// array of fields, if they are required, and validator
// each validator takes in a single value to determine
// validity
const v2FieldMatrix = [
    { key: 'byr:', required: true,  validator: birthYearValidator        },
    { key: 'iyr:', required: true,  validator: issueYearValidator        },
    { key: 'eyr:', required: true,  validator: experirationYearValidator },
    { key: 'hgt:', required: true,  validator: heightValidator           },
    { key: 'hcl:', required: true,  validator: hairColorValidator        },
    { key: 'ecl:', required: true,  validator: eyeColorValidator         },
    { key: 'pid:', required: true,  validator: passportValidator         },
    { key: 'cid:', required: false, validator: null                      },
];


const solveForOne = (relativeFilePath, callback) => {
    readFromFileAsync(relativeFilePath, (err, data) => {
        const passportArray = data.toString().split('\n\n');
        const validPassports = passportArray.filter(passport => {
            return validPassport(passport, v1FieldMatrix);
        });
        return callback(validPassports.length);
    });
};

const solveForTwo = (relativeFilePath, callback) => {
    readFromFileAsync(relativeFilePath, (err, data) => {
        const passportArray = data.toString().split('\n\n');
        const validPassports = passportArray.filter(passport => {
            return validPassport(passport, v2FieldMatrix);
        });
        return callback(validPassports.length);
    });
};

const formatPassport = (passport) => passport.replace(new RegExp('\n', 'g'), ' ').split(' ').filter(Boolean);

function validPassport(passport, fieldMatrix) {
    const passportParts = formatPassport(passport);

    for (let index = 0; index < fieldMatrix.length; index++) {
        const field = fieldMatrix[index];
        const fieldKey = field.key;
        const passportField = passportParts.filter(x => x.includes(fieldKey))[0] ?? '';

        if (!field.required) break;
        if (passportField == '') return false;
        
        const keyValue = passportField.split(fieldKey).filter(Boolean)[0];
        if (field.validator && !field.validator(keyValue)) return false;
    }

    return true;
};

export {
    solveForOne,
    solveForTwo
}