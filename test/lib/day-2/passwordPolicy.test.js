import assert from 'assert';
import { validPasswordCount } from '../../../lib/day-2/passwordPolicy.js';

const relativeFilePath = 'srv/day-2/sample-password-policies.txt';

describe('Password Policy 2.1 - Sample', () => {
    const expectedValue = 2;

    it(`should return ${expectedValue} valid password policies`, () => {
        return validPasswordCount(relativeFilePath, (count) => {
            assert.strictEqual(count, expectedValue);
        });
    });
});

// describe('Password Policy 2.2 - Sample', () => {
//     const expectedValue = 1;

//     it(`should return ${expectedValue} valid password policies`, () => {
//         return validPasswordCount(relativeFilePath, (count) => {
//             assert.strictEqual(1, expectedValue);
//         });
//     });
// });