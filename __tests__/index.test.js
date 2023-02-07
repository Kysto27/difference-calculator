import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const result = [
  {
    file1: 'file1.json', file2: 'file2.json', formatter: 'plain', expected: 'plainOutput.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', formatter: 'stylish', expected: 'stylishOutput.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', formatter: 'json', expected: 'jsonOutput.json',
  },
  {
    file1: 'file1.yml', file2: 'file2.yaml', formatter: 'plain', expected: 'plainOutput.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yaml', formatter: 'stylish', expected: 'stylishOutput.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yaml', formatter: 'json', expected: 'jsonOutput.json',
  },
];

test.each(result)('plain, output and json formatter', ({
  file1, file2, formatter, expected,
}) => {
  const file1Path = getFixturePath(file1);
  const file2Path = getFixturePath(file2);
  const actual = genDiff(file1Path, file2Path, formatter);
  const expectedResult = readFile(expected);
  expect(actual).toEqual(expectedResult);
});
