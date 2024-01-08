const isObject = (value) => value !== null && typeof value === 'object';

const isArrayEqual = (arrayA, arrayB) => {
  if (Array.isArray(arrayA) && Array.isArray(arrayB)) {
    if (arrayA.length === arrayB.length) {
      return arrayA.every((itemA, indexA) => itemA === arrayB[indexA]);
    }

    return false;
  }

  return false;
};
