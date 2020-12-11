class BootCode {
    constructor(operation, operator, argumentValue) {
        this.operation = operation; // acc, jmp, or nop
        this.operator = operator; // + or -
        this.argumentValue = argumentValue;
        this.wasPreviouslyRan = false;
    }
}

export {
    BootCode
}