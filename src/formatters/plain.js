import _ from 'lodash';

const getValue = (data) => {
  if (!_.isObject(data)) {
    if (typeof data === 'string') {
      return `'${data}'`;
    }
    return data;
  }
  return '[complex value]';
};

const makePlainOutput = (diffTree, ancestry = '') => {
  const {
    type, name, children, value, value1, value2,
  } = diffTree;
  switch (type) {
    case 'tree': {
      const result = children.flatMap((child) => makePlainOutput(child));
      return result.filter((key) => key !== '').join('\n');
    }
    case 'nested': {
      const result = children.flatMap((child) => makePlainOutput(child, `${ancestry}${name}.`));
      return result.filter((key) => key !== '').join('\n');
    }
    case 'added':
      return `Property '${ancestry}${name}' was added with value: ${getValue(value)}`;
    case 'deleted':
      return `Property '${ancestry}${name}' was removed`;
    case 'unchanged':
      return '';
    case 'changed': {
      return `Property '${ancestry}${name}' was updated. From ${getValue(value1)} to ${getValue(value2)}`;
    }
    default:
      throw new Error(`Unknown type: ${type}!`);
  }
};

export default makePlainOutput;
