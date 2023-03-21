import _ from 'lodash';

const makeIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);

const stringify = (data, formatStylish, depth = 1) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const output = Object.entries(data).map(([key, value]) => formatStylish({ key, value, type: 'unchanged' }, depth + 1));
  return `{\n${output.join('\n')}\n  ${makeIndent(depth)}}`;
};

const formatStylish = (node, depth = 0) => {
  switch (node.type) {
    case 'root': {
      const result = node.children.map((child) => formatStylish(child, depth + 1));
      return `{\n${result.join('\n')}\n}`;
    }
    case 'nested': {
      const result = node.children.map((child) => formatStylish(child, depth + 1));
      return `${makeIndent(depth)}  ${node.key}: {\n${result.join('\n')}\n${makeIndent(depth)}  }`;
    }
    case 'added': {
      return `${makeIndent(depth)}+ ${node.key}: ${stringify(node.value, formatStylish, depth)}`;
    }
    case 'deleted': {
      return `${makeIndent(depth)}- ${node.key}: ${stringify(node.value, formatStylish, depth)}`;
    }
    case 'unchanged': {
      return `${makeIndent(depth)}  ${node.key}: ${stringify(node.value, formatStylish, depth)}`;
    }
    case 'changed': {
      const deleted = `${makeIndent(depth)}- ${node.key}: ${stringify(node.value1, formatStylish, depth)}`;
      const added = `${makeIndent(depth)}+ ${node.key}: ${stringify(node.value2, formatStylish, depth)}`;
      return `${deleted}\n${added}`;
    }
    default:
      throw new Error(`Unknown type: ${node.type}!`);
  }
};

export default formatStylish;
