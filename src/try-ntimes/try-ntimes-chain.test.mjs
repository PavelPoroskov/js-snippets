import assert from 'node:assert/strict';
import test from 'node:test';

import { tryNTimes } from './try-ntimes-chain.mjs';

const makeCallFunctionFromArray = (callFunctionArray) => {
  let callIndex = -1;

  return async () => {
    callIndex += 1;
    
    // ??why not return resultArray[callIndex]: get error on third and fourth test
    //  async () => Promise.reject(-2) have error
    //  async () => (() => Promise.reject(-2))() does not have error
    return callFunctionArray[callIndex]();
  }
};

test('tryNTimes-chain. first success', async (t) => {
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

test('tryNTimes-chain. second success', async (t) => {
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

test('tryNTimes-chain. third success', async (t) => {
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

test('tryNTimes-chain. all failed', async (t) => {
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
