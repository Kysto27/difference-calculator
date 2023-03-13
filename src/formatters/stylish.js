import _ from 'lodash';

const makeIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);

const stringify = (data, formatStylish, depth = 1) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const result = keys.map((key) => {
    const value = data[key];
    return formatStylish({ key, value, type: 'unchanged' }, depth + 1);
  });
  return `{\n${result.join('\n')}\n  ${makeIndent(depth)}}`;
};

const formatStylish = (diffTree, depth = 0) => {
  const {
    type, key, children, value, value1, value2,
  } = diffTree;
  switch (type) {
    case 'root': {
      const result = children.map((child) => formatStylish(child, depth + 1));
      return `{\n${result.join('\n')}\n}`;
    }
    case 'nested': {
      const result = children.map((child) => formatStylish(child, depth + 1));
      return `${makeIndent(depth)}  ${key}: {\n${result.join('\n')}\n${makeIndent(depth)}  }`;
    }
    case 'added':
      return `${makeIndent(depth)}+ ${key}: ${stringify(value, formatStylish, depth)}`;
    case 'deleted':
      return `${makeIndent(depth)}- ${key}: ${stringify(value, formatStylish, depth)}`;
    case 'unchanged':
      return `${makeIndent(depth)}  ${key}: ${stringify(value, formatStylish, depth)}`;
    case 'changed': {
      const deleted = `${makeIndent(depth)}- ${key}: ${stringify(value1, formatStylish, depth)}`;
      const added = `${makeIndent(depth)}+ ${key}: ${stringify(value2, formatStylish, depth)}`;
      return `${deleted}\n${added}`;
    }
    default:
      throw new Error(`Unknown type: ${type}!`);
  }
};

export default formatStylish;
