import { readFile } from 'fs';
import path from 'path';

// reads the file from the provided relativePath
function readFromFileAsync(relativePath, callback, encoding = 'utf8') {
    // join the current working directory with the provided relativePath 
    // of the file
    const filePath = path.join(process.cwd(), relativePath);

    // fs.readFile asynchronously reads the entire contents of a file
    readFile(filePath, encoding, callback);
}

export {
    readFromFileAsync
}