import { getFormattedData } from '../../bin/fileParser.js';

/***** Mappers *****/

// deprecated as of 2.1
// Parse the policy into 4 parts:
// '1-3 a: abcde' => [ [ 1,3 ], 'a', 'abcde', isValid ]
const legacyPasswordPolicyMapper = (value) => {
    const policyParts = value.split(' ');
    const policy = policyMapper(policyParts);
    
    return {
        ...policy,
        isValid: legacyPasswordValidator(policy)
    }
}

// Map the policy into 4 parts:
// '1-3 a: abcde' => [ [ 1,3 ], 'a', 'abcde', isValid ]
const passwordPolicyMapper = (value) => {
    const policyParts = value.split(' ');
    const policy = policyMapper(policyParts);

    return {
        ...policy,
        isValid: passwordValidator(policy)
    }
}


const policyMapper = (policyParts) => {
    const indexes = policyParts[0].split('-').map(x => Number(x));
    const passwordChar = policyParts[1].charAt(0);
    const password = policyParts[2].trim();

    return {
        indexes,
        passwordChar,
        password
    };
}

/***** Validators *****/

// deprecated as of 2.1
// if the character count falls between (inclusive) the password
// policies intervals
const legacyPasswordValidator = ({
    indexes,
    passwordChar,
    password
}) => {
    const characterCount = (password.split(passwordChar).length - 1);
    return (characterCount >= indexes[0] && characterCount <= indexes[1]);
}

// indexes = non-zero indexed
// '2-5 d: abcef' - invalid because neither 2 nor 5 contain a d
// '1-2 a: abc' - valid because 1 is a
// '1-3 c: ccc' - invalid because more than 
const passwordValidator = ({
    indexes,
    passwordChar,
    password
}) => {
    const firstChar = password[(indexes[0] - 1)];
    const secondChar = password[(indexes[1] - 1)];
    
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