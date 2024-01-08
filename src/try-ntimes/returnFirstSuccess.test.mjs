import assert from 'node:assert/strict';
import test from 'node:test';

import { returnFirstSuccess } from './try-ntimes-chain.mjs';

test('returnFirstSuccess. first success', async () => {
  const result = await returnFirstSuccess([
    () => 1,
    () => 2,
    () => 3,
  ]);

  assert.equal(result, 1);
});

test('returnFirstSuccess. second success', async () => {
  const result = await returnFirstSuccess([
    () => Promise.reject(-1),
    () => 2,
    () => 3,
  ]);

  assert.equal(result, 2);
});

test('returnFirstSuccess. third success', async () => {
  const result = await returnFirstSuccess([
    () => Promise.reject(-1),
    () => Promise.reject(-2),
    () => 3,
  ]);

  assert.equal(result, 3);
});

test('returnFirstSuccess. all failed', async () => {
  await assert.rejects(
    async () => {
      await returnFirstSuccess([
        () => Promise.reject(-1),
        () => Promise.reject(-2),
        () => Promise.reject(-3),
      ])
    },
    (err) => {
      return err === -3;
    }
  )
});
