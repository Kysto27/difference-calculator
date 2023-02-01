import _ from 'lodash';

const makeIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);

const getValue = (data, formatStylish, depth = 1) => {
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

const makeStylishOutput = (diffTree, depth = 0) => {
  const {
    type, name, children, value, value1, value2,
  } = diffTree;
  switch (type) {
    case 'tree': {
      const result = children.map((child) => makeStylishOutput(child, depth + 1));
      return `{\n${result.join('\n')}\n}`;
    }
    case 'nested': {
      const result = children.map((child) => makeStylishOutput(child, depth + 1));
      return `${makeIndent(depth)}  ${name}: {\n${result.join('\n')}\n${makeIndent(depth)}  }`;
    }
    case 'added':
      return `${makeIndent(depth)}+ ${name}: ${getValue(value, makeStylishOutput, depth)}`;
    case 'deleted':
      return `${makeIndent(depth)}- ${name}: ${getValue(value, makeStylishOutput, depth)}`;
    case 'unchanged':
      return `${makeIndent(depth)}  ${name}: ${getValue(value, makeStylishOutput, depth)}`;
    case 'changed': {
      const deleted = `${makeIndent(depth)}- ${name}: ${getValue(value1, makeStylishOutput, depth)}`;
      const added = `${makeIndent(depth)}+ ${name}: ${getValue(value2, makeStylishOutput, depth)}`;
      return `${deleted}\n${added}`;
    }
    default:
      throw new Error(`Unknown type: ${type}!`);
  }
};

export default makeStylishOutput;
