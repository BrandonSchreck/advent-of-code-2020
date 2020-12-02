import assert from 'assert';
import { getArrayFromFile } from '../../bin/fileParser.js';

const relativeFilePath = 'srv/day-1/sample-expense-report.txt';

describe('FileParser Tests', () => {
    it('getArrayFromFile is a function', () => {
        assert.strictEqual(typeof getArrayFromFile, 'function');
    });

    it('getArrayFromFile should read from file', (done) => {
        getArrayFromFile(relativeFilePath, (err, data) => {
            if (err) return done(err);
            assert.ok(data);
            done();
        });
    });
});