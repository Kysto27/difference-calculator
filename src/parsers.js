import { load } from 'js-yaml';

const parse = (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return load(data);
    case '.yaml':
      return load(data);
    default:
      throw new Error(`Unknown extension: '${extension}'!`);
  }
};

export default parse;
