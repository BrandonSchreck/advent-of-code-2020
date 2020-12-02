import { readFile } from 'fs';
import path from 'path';

const getArrayFromFile = (relativePath, callback) => {
    const encoding = 'utf8';
    const filePath = path.join(process.cwd(), relativePath);
    readFile(filePath, encoding, callback);
}

export {
    getArrayFromFile
}