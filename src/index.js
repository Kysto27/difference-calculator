import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import makeDiffTree from './makeDiff.js';
import format from './formatters/index.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath).trim();

const readFile = (filepath) => fs.readFileSync(getFullPath(filepath));

const getDataType = (filepath) => path.extname(filepath);

const getData = (filepath) => parse(readFile(filepath), getDataType(filepath));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diffTree = makeDiffTree(data1, data2);
  return format(diffTree, formatName);
};

export default genDiff;
