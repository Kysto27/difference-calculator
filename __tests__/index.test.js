import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('JSON stylishOutput', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const actual = genDiff(file1Path, file2Path, 'stylish');
  const expected = readFile('stylishOutput.txt');
  expect(actual).toEqual(expected);
});

test('JSON plainOutput', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const actual = genDiff(file1Path, file2Path, 'plain');
  const expected = readFile('plainOutput.txt');
  expect(actual).toEqual(expected);
});

test('YML stylishOutput', () => {
  const file1Path = getFixturePath('file1.yml');
  const file2Path = getFixturePath('file2.yaml');
  const actual = genDiff(file1Path, file2Path, 'stylish');
  const expected = readFile('stylishOutput.txt');
  expect(actual).toEqual(expected);
});

test('YML plainOutput', () => {
  const file1Path = getFixturePath('file1.yml');
  const file2Path = getFixturePath('file2.yaml');
  const actual = genDiff(file1Path, file2Path, 'stylish');
  const expected = readFile('stylishOutput.txt');
  expect(actual).toEqual(expected);
});
