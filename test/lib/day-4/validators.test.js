import assert from 'assert';
import {
    birthYearValidator,
    issueYearValidator,
    experirationYearValidator,
    heightValidator,
    hairColorValidator,
    eyeColorValidator,
    passportValidator
} from '../../../lib/day-4/validators.js';

describe('Password Processor Validators Tests', () => {
    describe('birthYearValidator tests', () => {
        const invalid = ['02', '1919', '2003', 'apple', '-1986'];
        const valid = ['1920', '1986', '2002'];

        invalid.forEach(test => {
            it(`BirthdayYear: ${test} - should be false`, () => {
                assert.strictEqual(birthYearValidator(test), false);
            });
        });

        valid.forEach(test => {
            it(`BirthdayYear: ${test} - should be true`, () => {
                assert.strictEqual(birthYearValidator(test), true);
            });
        });
    });

    describe('issueYearValidator tests', () => {
        const invalid = ['10', '2009', '2021', 'apple', '-2012'];
        const valid = ['2010', '2015', '2020'];

        invalid.forEach(test => {
            it(`IssueYear: ${test} - should be false`, () => {
                assert.strictEqual(issueYearValidator(test), false);
            });
        });

        valid.forEach(test => {
            it(`IssueYear: ${test} - should be true`, () => {
                assert.strictEqual(issueYearValidator(test), true);
            });
        });
    });

    describe('experirationYearValidator tests', () => {
        const invalid = ['20', '2019', '2031', 'apple', '-2025'];
        const valid = ['2020', '2025', '2030'];

        invalid.forEach(test => {
            it(`ExpirationYear: ${test} - should be false`, () => {
                assert.strictEqual(experirationYearValidator(test), false);
            });
        });

        valid.forEach(test => {
            it(`ExpirationYear: ${test} - should be true`, () => {
                assert.strictEqual(experirationYearValidator(test), true);
            });
        });
    });

    describe('heightValidator tests', () => {
        const invalid = ['149cm', '194cm', '58in', '77in', '190in', '190'];
        const valid = ['150cm', '170cm', '193cm', '59in', '69in', '76in', '60in', '190cm'];

        invalid.forEach(test => {
            it(`Height: ${test} - should be false`, () => {
                assert.strictEqual(heightValidator(test), false);
            });
        });

        valid.forEach(test => {
            it(`Height: ${test} - should be true`, () => {
                assert.strictEqual(heightValidator(test), true);
            });
        });
    });

    describe('hairColorValidator tests', () => {
        const invalid = ['#123abz', '123abc'];
        const valid = ['#123abc'];

        invalid.forEach(test => {
            it(`HairColor: ${test} - should be false`, () => {
                assert.strictEqual(hairColorValidator(test), false);
            });
        });

        valid.forEach(test => {
            it(`HairColor: ${test} - should be true`, () => {
                assert.strictEqual(hairColorValidator(test), true);
            });
        });
    });

    describe('eyeColorValidator tests', () => {
        const invalid = ['wat'];
        const valid = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

        invalid.forEach(test => {
            it(`EyeColor: ${test} - should be false`, () => {
                assert.strictEqual(eyeColorValidator(test), false);
            });
        });

        valid.forEach(test => {
            it(`EyeColor: ${test} - should be true`, () => {
                assert.strictEqual(eyeColorValidator(test), true);
            });
        });
    });

    describe('passportValidator tests', () => {
        const invalid = ['0123456789'];
        const valid = ['000000001'];

        invalid.forEach(test => {
            it(`PassportId: ${test} - should be false`, () => {
                assert.strictEqual(passportValidator(test), false);
            });
        });

        valid.forEach(test => {
            it(`PassportId: ${test} - should be true`, () => {
                assert.strictEqual(passportValidator(test), true);
            });
        });
    });
});