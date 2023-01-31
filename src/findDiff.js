/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const findDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        name: key,
        children: findDiff(obj1[key], obj2[key]),
        type: 'nested',
      };
    }
    if (!Object.hasOwn(obj1, key)) {
      return {
        name: key,
        value: obj2[key],
        type: 'added',
      };
    }
    if (!Object.hasOwn(obj2, key)) {
      return {
        name: key,
        value: obj1[key],
        type: 'deleted',
      };
    }
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] !== obj2[key]) {
        return {
          name: key,
          value1: obj1[key],
          value2: obj2[key],
          type: 'changed',
        };
      }
      return {
        name: key,
        value: obj1[key],
        type: 'unchanged',
      };
    }
  });

  return result;
};

const makeDiffTree = (file1, file2) => ({ type: 'tree', children: findDiff(file1, file2) });

export default makeDiffTree;
