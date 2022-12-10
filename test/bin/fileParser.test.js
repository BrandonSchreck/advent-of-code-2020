import assert from 'assert';
import { getFormattedData } from '../../bin/fileParser.js';

const relativeFilePath = 'src/day-1/sample-expense-report.txt';

describe('FileParser Tests', () => {
    it('getFormattedData should be a function', () => {
        assert.strictEqual(typeof getFormattedData, 'function');
    });

    it('getFormattedData should be able to read from a file', (done) => {
        getFormattedData(relativeFilePath, '\n', (data) => {
            assert.ok(data);
            done();
        });
    });
});