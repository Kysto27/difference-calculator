/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getExtension = (filepath) => {
  const parts = filepath.split('.');
  return parts[parts.length - 1];
};

const parse = (filepath) => {
  let result;
  const extension = getExtension(filepath);
  const readFile = fs.readFileSync(path.resolve(filepath));
  if (extension === 'json') {
    result = JSON.parse(readFile);
  }
  return result;
};

const diff = (filepath1, filepath2) => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);
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

  return `{\n${result}}`;
};

export default diff;
