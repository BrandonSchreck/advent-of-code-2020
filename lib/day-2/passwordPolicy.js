import { getFormattedData } from '../../bin/fileParser.js';

// Policy object
function Policy(policyParts) {
    this.rangeArray = policyParts[0].split('-').map(x => Number(x));
    this.passwordChar = policyParts[1].charAt(0);
    this.password = policyParts[2].trim();
}

// mapper for 2.1
// Parse the policy into 4 parts:
// '1-3 a: abcde' => { [ 1,3 ], 'a', 'abcde', isValid }
const legacyPasswordPolicyMapper = (value) => {
    const policyParts = value.split(' ');
    const policy = new Policy(policyParts);
    
    return {
        ...policy,
        isValid: legacyPasswordValidator(policy)
    }
}

// mapper for 2.2
// Map the policy into 4 parts:
// '1-3 a: abcde' => { [ 1,3 ], 'a', 'abcde', isValid }
const passwordPolicyMapper = (value) => {
    const policyParts = value.split(' ');
    const policy = new Policy(policyParts);

    return {
        ...policy,
        isValid: passwordValidator(policy)
    }
}

/***** Validators *****/

// validator for 2.1
// if the character count falls between (inclusive) the password
// policies intervals
const legacyPasswordValidator = ({
    rangeArray,
    passwordChar,
    password
}) => {
    const characterCount = (password.split(passwordChar).length - 1);
    return (characterCount >= rangeArray[0] && characterCount <= rangeArray[1]);
}

// validator for 2.2
// rangeArray = non-zero indexed
// '2-5 d: abcef' - invalid because neither 2 nor 5 contain 'a' or 'd'
// '1-2 a: abc' - valid because 1 is 'a'
// '1-3 c: ccc' - invalid because position 1 and 3 contain 'c'
const passwordValidator = ({
    rangeArray,
    passwordChar,
    password
}) => {
    const firstChar = password[(rangeArray[0] - 1)];
    const secondChar = password[(rangeArray[1] - 1)];
    
    let valid = false;

    if (firstChar == passwordChar && secondChar == passwordChar) valid = false;
    else if (firstChar != passwordChar && secondChar != passwordChar) valid = false;
    else if (firstChar == passwordChar || secondChar == passwordChar) valid = true;

    return valid;
}

// password policies that meet their requirements
const validPolicies = policy => policy.isValid;

// returns the count of passwords that match their policies
const solveForOne = (filePath, callback) => {
    getFormattedData(filePath, '\n', (passwordPolicies) => {
        const policies = passwordPolicies.map(legacyPasswordPolicyMapper);
        const validPasswords = policies.filter(validPolicies);
        return callback(validPasswords.length);
    });
}

// returns the count of passwords that match their policies
const solveForTwo = (filePath, callback) => {
    getFormattedData(filePath, '\n', (passwordPolicies) => {
        const policies = passwordPolicies.map(passwordPolicyMapper);
        const validPasswords = policies.filter(validPolicies);
        return callback(validPasswords.length);
    });
}

export {
    solveForOne,
    solveForTwo
}