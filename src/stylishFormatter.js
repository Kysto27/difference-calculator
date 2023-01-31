import _ from 'lodash';

const makeIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);

const valueFormate = (data, formatStylish, depth = 1) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const result = keys.map((name) => {
    const value = data[name];
    return formatStylish({ name, value, type: 'unchanged' }, depth + 1);
  });
  return `{\n${result.join('\n')}\n  ${makeIndent(depth)}}`;
};

const stylish = (diffTree, depth = 0) => {
  const {
    type, name, children, value, value1, value2,
  } = diffTree;
  switch (type) {
    case 'tree': {
      const result = children.map((child) => stylish(child, depth + 1));
      return `{\n${result.join('\n')}\n}`;
    }
    case 'nested': {
      const result = children.map((child) => stylish(child, depth + 1));
      return `${makeIndent(depth)}  ${name}: {\n${result.join('\n')}\n${makeIndent(depth)}  }`;
    }
    case 'added':
      return `${makeIndent(depth)}+ ${name}: ${valueFormate(value, stylish, depth)}`;
    case 'deleted':
      return `${makeIndent(depth)}- ${name}: ${valueFormate(value, stylish, depth)}`;
    case 'unchanged':
      return `${makeIndent(depth)}  ${name}: ${valueFormate(value, stylish, depth)}`;
    case 'changed': {
      const deleted = `${makeIndent(depth)}- ${name}: ${valueFormate(value1, stylish, depth)}`;
      const added = `${makeIndent(depth)}+ ${name}: ${valueFormate(value2, stylish, depth)}`;
      return `${deleted}\n${added}`;
    }
    default:
      throw new Error(`Type: ${type} is undefined`);
  }
};

export default stylish;
