import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import diff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('plain JSON', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const actual = diff(file1Path, file2Path);
  const expected = readFile('output.txt');
  expect(actual).toEqual(expected);
});

test('plain YML', () => {
  const file1Path = getFixturePath('file1.yml');
  const file2Path = getFixturePath('file2.yaml');
  const actual = diff(file1Path, file2Path);
  const expected = readFile('output.txt');
  expect(actual).toEqual(expected);
});
