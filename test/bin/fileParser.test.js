import assert from 'assert';
import { readFromFileAsync } from '../../bin/fileParser.js';

const relativeFilePath = 'srv/day-1/sample-expense-report.txt';

describe('FileParser Tests', () => {
    it('readFromFileAsync should be a function', () => {
        assert.strictEqual(typeof readFromFileAsync, 'function');
    });

    it('readFromFileAsync should be able to read from a file', (done) => {
        readFromFileAsync(relativeFilePath, (err, data) => {
            if (err) return done(err);
            assert.ok(data);
            done();
        });
    });
});