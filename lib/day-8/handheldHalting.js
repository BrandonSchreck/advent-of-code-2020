import { getFormattedData } from '../../bin/fileParser.js';
import { BootCode } from './bootCode.js';

const ACC_COMMAND = 'acc';
const JMP_COMMAND = 'jmp';
const NOP_COMMAND = 'nop';

const accAction = (currentCode, accumulatorValue, instructionCode) => {
    currentCode.wasPreviouslyRan = true;

    let evalString = `${accumulatorValue} ${currentCode.operator} ${currentCode.argumentValue}`;
    accumulatorValue = eval(evalString);

    ++instructionCode;

    return {
        accumulatorValue,
        instructionCode
    };
}

const jmpAction = (currentCode, instructionCode) => {
    currentCode.wasPreviouslyRan = true;

    let evalString = `${instructionCode} ${currentCode.operator} ${currentCode.argumentValue}`;
    instructionCode = eval(evalString);

    return instructionCode;
}

const parseBootCodes = (bootCodes) => {
    let codeArray = [];

    bootCodes.forEach((code, i) => {
        code = code.split(' ');
        let operation = code[0].trim();
        let argument = code[1].trim();
        let operator = argument.substring(0, 1);
        let argumentValue = Number(argument.substring(1));
        codeArray[i] = new BootCode(operation, operator, argumentValue);
    });

    return codeArray;
}

const run = (codeArray) => {
    let accumulatorValue = 0;
    let instructionCode = 0;

    while (instructionCode < codeArray.length) {
        let currentCode = codeArray[instructionCode];

        if (currentCode === undefined) {
            break;
        } else if (currentCode.wasPreviouslyRan) {
            break;
        } else if (currentCode.operation === ACC_COMMAND) {
            ({
                accumulatorValue,
                instructionCode
            } = accAction(currentCode, accumulatorValue, instructionCode));
            continue;
        } else if (currentCode.operation === JMP_COMMAND) {
            instructionCode = jmpAction(currentCode, instructionCode);
            continue;
        } else {
            currentCode.wasPreviouslyRan = true;
            ++instructionCode;
        }
    }

    return {
        accumulatorValue,
        instructionCode
    };
}

const solveForOne = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '\n', (bootCodes) => {
        const codeArray = parseBootCodes(bootCodes);
        const { accumulatorValue, instructionCode } = run(codeArray);
        callback(accumulatorValue);
    });
}

const solveForTwo = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '\n', (bootCodes) => {
        const codeArray = parseBootCodes(bootCodes);

        for (let i = 0; i < codeArray.length; i++) {
            let currentCode = codeArray[i];

            if (currentCode.operation === ACC_COMMAND) {
                continue;
            }

            // spread operator on array keeps internal object references 
            // which prevents this from running correctly
            // e.g. modifiedCode.wasPreviouslyRan will always be
            // true after the first iteration
            let modifiedCodeArray = codeArray.map(code => ({ ...code }));
            let modifiedCode = modifiedCodeArray[i];
            modifiedCode.operation = modifiedCode.operation === JMP_COMMAND 
                ? NOP_COMMAND 
                : JMP_COMMAND;

            const { accumulatorValue, instructionCode } = run(modifiedCodeArray);

            if (instructionCode >= modifiedCodeArray.length) {
                callback(accumulatorValue);
                break;
            }
        }
    });
}

export {
    solveForOne,
    solveForTwo
}