import assert from 'node:assert/strict';
import test from 'node:test';

import { tryNTimes } from './try-ntimes-loop.mjs';

const makeCallFunctionFromArray = (callFunctionArray) => {
  let callIndex = -1;

  return async () => {
    callIndex += 1;
    
    return callFunctionArray[callIndex]();
  }
};

test('tryNTimes-loop. first success', async () => {
  const callFunctionFromArray = makeCallFunctionFromArray([
    () => 1,
    () => 2,
    () => 3,
  ]);

  assert.equal(
    await tryNTimes(callFunctionFromArray, 3),
    1,
  );
});

test('tryNTimes-loop. second success', async () => {
  const callFunctionFromArray = makeCallFunctionFromArray([
    () => Promise.reject(-1),
    () => 2,
    () => 3,
  ]);

  assert.equal(
    await tryNTimes(callFunctionFromArray, 3),
    2,
  );
});

test('tryNTimes-loop. third success', async () => {
  const callFunctionFromArray = makeCallFunctionFromArray([
    () => Promise.reject(-1),
    () => Promise.reject(-2),
    () => 3,
  ]);

  assert.equal(
    await tryNTimes(callFunctionFromArray, 3),
    3,
  );
});

test('tryNTimes-loop. all failed', async () => {
  const callFunctionFromArray = makeCallFunctionFromArray([
    () => Promise.reject(-1),
    () => Promise.reject(-2),
    () => Promise.reject(-3),
  ]);

  await assert.rejects(
    async () => {
      await tryNTimes(callFunctionFromArray, 3);
    },
    (err) => {
      return err === -3;
    }
  )
});
