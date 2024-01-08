import assert from 'node:assert/strict';
import test from 'node:test';

import {
  convertNumbersToRanges,
  convertRangesToNumbers,
} from './ranges.mjs';

test('convertNumbersToRanges()', () => {
  assert.deepEqual(
    convertNumbersToRanges([2, 3, 4, 8]),
    [[2, 4], [8, 8]],
  );

  assert.deepEqual(
    convertNumbersToRanges([2, 2, 3, 4, 4, 8, 8]),
    [[2, 4], [8, 8]],
  );

  assert.deepEqual(
    convertNumbersToRanges([1]),
    [[1, 1]],
  );
});

test('convertRangesToNumbers()', () => {
  assert.deepEqual(
    convertRangesToNumbers([[1, 5]]),
    [1, 2, 3, 4, 5],
  );

  assert.deepEqual(
    convertRangesToNumbers([[1, 1]]),
    [1],
  );

  assert.deepEqual(
    convertRangesToNumbers([[2, 3], [7, 9]]),
    [2, 3, 7, 8, 9],
  );

  assert.deepEqual(
    convertRangesToNumbers([[4, 6], [5, 7]]),
    [4, 5, 6, 7],
  );
});

