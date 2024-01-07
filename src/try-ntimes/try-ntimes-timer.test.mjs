import assert from 'node:assert/strict';
import test from 'node:test';

import { tryNTimes } from './try-ntimes-timer.mjs';

const makeCallFunctionFromArray = (callFunctionArray) => {
  let callIndex = -1;

  return async () => {
    callIndex += 1;
    
    return callFunctionArray[callIndex]();
  }
};

test('tryNTimes-timer. first success', async (t) => {
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

test('tryNTimes-timer. second success', async (t) => {
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

test('tryNTimes-timer. third success', async (t) => {
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

test('tryNTimes-timer. all failed', async (t) => {
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
