import assert from 'node:assert/strict';
import test from 'node:test';

import {
  groupValues,
} from './group.mjs';

test('groupValues()', () => {
  assert.deepEqual(
    groupValues([1, 1]),
    [1],
  );

  assert.deepEqual(
    groupValues([2, 2, 3, 4, 4, 8, 8]),
    [2, 3, 4, 8],
  );
});

