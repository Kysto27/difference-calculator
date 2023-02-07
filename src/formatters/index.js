import makeStylishOutput from './stylish.js';
import makePlainOutput from './plain.js';

const makeOutput = (data, formatName) => {
  switch (formatName) {
    case 'stylish': {
      return makeStylishOutput(data);
    }
    case 'plain': {
      return makePlainOutput(data);
    }
    case 'json': {
      return JSON.stringify(data);
    }
    default:
      throw new Error(`Unknown formatName: '${formatName}'!`);
  }
};

export default makeOutput;
