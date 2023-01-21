/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const diff = (filepath1, filepath2) => {
  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);
  const data1 = fs.readFileSync(path.resolve(process.cwd(), filepath1).trim());
  const data2 = fs.readFileSync(path.resolve(process.cwd(), filepath2).trim());
  const obj1 = parse(data1, extension1);
  const obj2 = parse(data2, extension2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  let result = '';
  for (const key of sortedKeys) {
    if (!Object.hasOwn(obj1, key)) {
      result += `  + ${key}: ${obj2[key]}\n`;
    } else if (!Object.hasOwn(obj2, key)) {
      result += `  - ${key}: ${obj1[key]}\n`;
    } else if (obj1[key] !== obj2[key]) {
      result += `  - ${key}: ${obj1[key]}\n`;
      result += `  + ${key}: ${obj2[key]}\n`;
    } else {
      result += `    ${key}: ${obj1[key]}\n`;
    }
  }
  console.log(`{\n${result}}`);
  return `{\n${result}}`;
};

export default diff;
