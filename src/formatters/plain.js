import _ from 'lodash';

const stringify = (data) => {
  if (!_.isObject(data)) {
    if (typeof data === 'string') {
      return `'${data}'`;
    }
    return data;
  }
  return '[complex value]';
};

const getProperty = (property, key) => `${property}${key}`;

const formatPlain = (node, property = '') => {
  switch (node.type) {
    case 'root': {
      const result = node.children.flatMap((child) => formatPlain(child));
      return result.filter(Boolean).join('\n');
    }
    case 'nested': {
      const result = node.children.flatMap((child) => formatPlain(child, `${getProperty(property, node.key)}.`));
      return result.filter((child) => child !== '').join('\n');
    }
    case 'added': {
      return `Property '${getProperty(property, node.key)}' was added with value: ${stringify(node.value)}`;
    }
    case 'deleted': {
      return `Property '${getProperty(property, node.key)}' was removed`;
    }
    case 'unchanged':
      return '';
    case 'changed': {
      return `Property '${getProperty(property, node.key)}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
    }
    default:
      throw new Error(`Unknown type: ${node.type}!`);
  }
};

export default formatPlain;
