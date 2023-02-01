import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import makeDiffTree from './findDiff.js';
import makeOutput from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName) => {
  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);
  const data1 = fs.readFileSync(path.resolve(process.cwd(), filepath1).trim());
  const data2 = fs.readFileSync(path.resolve(process.cwd(), filepath2).trim());
  const obj1 = parse(data1, extension1);
  const obj2 = parse(data2, extension2);
  const diffTree = makeDiffTree(obj1, obj2);
  const result = makeOutput(diffTree, formatName);

  return result;
};

export default genDiff;
