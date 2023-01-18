import fs from 'fs';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { load } from 'js-yaml';

const parse = (filepath) => {
  let result;
  const extension = path.extname(filepath);
  const readFile = fs.readFileSync(path.resolve(process.cwd(), filepath).trim());
  if (extension === '.json') {
    result = JSON.parse(readFile);
  } else if (extension === '.yml') {
    result = load(readFile);
  } else if (extension === '.yaml') {
    result = load(readFile);
  }
  return result;
};

export default parse;
