import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const format = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(data);
    case 'plain':
      return formatPlain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};

export default format;
