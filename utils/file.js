import path from 'path';
import fs from 'fs';

export function isValidFileInput(input) {
  if (!input) {
    throw new Error('No input file has been provided');
  }
  const extname = path.extname(input);
  if (extname != '.json') {
    throw new Error(
      `Only .json file is supported as an input, found ${extname}`
    );
  }
  if (!fs.existsSync(input)) {
    throw new Error('File not found');
  }
  return true;
}

export function parseDataFromFile(fileInput) {
  const input = fs.readFileSync(fileInput);
  const data = JSON.parse(input);
  return data;
}
