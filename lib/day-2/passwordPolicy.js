import { readFromFileAsync } from '../../bin/fileParser.js';

/***** Main Methods *****/

// deprecated as of 2.1
// returns the count of passwords that match their policies
const legacyValidPasswordCount = (filePath, callback) => {
    readFromFileAsync(filePath, (err, data) => {
        const passwordPolicies = parsePasswordPolicies(data, legacyPasswordPolicyMapper);
        const validPasswords = validPasswordPolicies(passwordPolicies);
        return callback(validPasswords.length);
    });
}

// returns the count of passwords that match their policies
const validPasswordCount = (filePath, callback) => {
    readFromFileAsync(filePath, (err, data) => {
        const passwordPolicies = parsePasswordPolicies(data, passwordPolicyMapper);
        const validPasswords = validPasswordPolicies(passwordPolicies);
        return callback(validPasswords.length);
    });
}

/***** Parser *****/

// take the data stream and split each line to an array
const parsePasswordPolicies = (data, mapper) => {
    const fullPolicy = data.toString().split('\n');
    return fullPolicy.map(mapper);
}

/***** Mappers *****/

// deprecated as of 2.1
// Parse the policy into 4 parts:
// '1-3 a: abcde' => [ [ 1,3 ], 'a', 'abcde', isValid ]
const legacyPasswordPolicyMapper = (value) => {
    const policyParts = value.split(' ');
    const policy = passwordPolicy(policyParts);

    return {
        ...policy,
        isValid: legacyPasswordValidator(policy)
    }
}

// Map the policy into 4 parts:
// '1-3 a: abcde' => [ [ 1,3 ], 'a', 'abcde', isValid ]
const passwordPolicyMapper = (value) => {
    const policyParts = value.split(' ');
    const policy = passwordPolicy(policyParts);

    return {
        ...policy,
        isValid: passwordValidator(policy)
    }
}

/***** ¿Constructor? *****/

// configures passwordPolicyObject
const passwordPolicy = (policyParts) => {
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
const validPasswordPolicies = (passwordPolicies) => {
    return passwordPolicies.filter(policy => policy.isValid);
}

/***** Exporter *****/

export {
    legacyValidPasswordCount, // deprecated as of 2.1
    validPasswordCount
}