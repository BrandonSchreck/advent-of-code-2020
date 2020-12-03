import { readFromFileAsync } from '../../bin/fileParser.js';

// returns the count of passwords that match their policies
const validPasswordCount = (filePath, callback) => {
    // async read from file
    readFromFileAsync(filePath, (err, data) => {
        // 
        const passwordPolicies = parsePasswordPolicies(data);
        const validPasswords = validPasswordPolicies(passwordPolicies);
        return callback(validPasswords.length);
    });
}

// take the data stream and split each line to an array
const parsePasswordPolicies = (data) => {
    const fullPolicy = data.toString().split('\n');
    return fullPolicy.map(parsePasswordPolicy);
}

// Parse the policy into 4 parts:
// '1-3 a: abcde' => [ [ 1,3 ], 'a', 'abcde', isValid ]
const parsePasswordPolicy = (value) => {
    const policyParts = value.split(' ');
    const passwordIntervals = policyParts[0].split('-');
    const passwordChar = policyParts[1].charAt(0);
    const password = policyParts[2].trim()

    return {
        passwordIntervals, // password character intervals
        passwordChar, // password character
        password, // password
        isValid: isValidPassword(passwordIntervals, passwordChar, password)
    }
}

// if the character count falls between (inclusive) the password
// policies intervals
const isValidPassword = (intervals, passwordChar, password) => {
    const characterCount = (password.split(passwordChar).length - 1);
    return (characterCount >= intervals[0] && characterCount <= intervals[1]);
}

// password policies that meet their requirements
const validPasswordPolicies = (passwordPolicies) => {
    return passwordPolicies.filter(policy => policy.isValid);
}

export {
    validPasswordCount
}