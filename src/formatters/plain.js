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

const formatPlain = (diffTree, ancestry = '') => {
  const {
    type, key, children, value, value1, value2,
  } = diffTree;
  switch (type) {
    case 'root': {
      const result = children.flatMap((child) => formatPlain(child));
      return result.filter((child) => child !== '').join('\n');
    }
    case 'nested': {
      const result = children.flatMap((child) => formatPlain(child, `${ancestry}${key}.`));
      return result.filter((child) => child !== '').join('\n');
    }
    case 'added':
      return `Property '${ancestry}${key}' was added with value: ${getValue(value)}`;
    case 'deleted':
      return `Property '${ancestry}${key}' was removed`;
    case 'unchanged':
      return '';
    case 'changed': {
      return `Property '${ancestry}${key}' was updated. From ${getValue(value1)} to ${getValue(value2)}`;
    }
    default:
      throw new Error(`Unknown type: ${type}!`);
  }
};

export default formatPlain;
