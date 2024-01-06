import assert from 'node:assert/strict';
import test from 'node:test';

import { runOperationsWithConcurrencyLimit } from './runOperationsWithConcurrencyLimit.mjs';

const isShowLog = false;

const log = (str) => {
  if (isShowLog) {
    console.log(str);
  }
};

const wait = ms => new Promise(fnResolve => setTimeout(fnResolve, ms));

const makeWaitAndReturn = () => {
  let finishOrder = 0;

  return async ({ msDelay, id }) => {
    log('started', id);
    await wait(msDelay);
    log('   finished', id);

    finishOrder += 1;

    return { msDelay, id, finishOrder };
  }
};

test('runOperationsWithConcurrencyLimit. 3 operations, limit 2', async (t) => {
  const arArguments = [
    { id: 1, msDelay: 600 },
    { id: 2, msDelay: 300 },
    { id: 3, msDelay: 200 },
  ];
  const waitAndReturn = makeWaitAndReturn();

  const results = await runOperationsWithConcurrencyLimit({
    arOperationArguments: arArguments,
    asyncOperation: waitAndReturn,
    concurrencyLimit: 2,
  });

  assert.deepEqual(
    results,
    [
      { id: 1, msDelay: 600, finishOrder: 3 },
      { id: 2, msDelay: 300, finishOrder: 1 },
      { id: 3, msDelay: 200, finishOrder: 2 },
    ],
  );
});

test('runOperationsWithConcurrencyLimit. 3 operations, no limit', async (t) => {
  const arArguments = [
    { id: 1, msDelay: 600 },
    { id: 2, msDelay: 300 },
    { id: 3, msDelay: 200 },
  ];
  const waitAndReturn = makeWaitAndReturn();

  const results = await runOperationsWithConcurrencyLimit({
    arOperationArguments: arArguments,
    asyncOperation: waitAndReturn,
  });

  assert.deepEqual(
    results,
    [
      { id: 1, msDelay: 600, finishOrder: 3 },
      { id: 2, msDelay: 300, finishOrder: 2 },
      { id: 3, msDelay: 200, finishOrder: 1 },
    ]
  );
});

test('runOperationsWithConcurrencyLimit. 3 operations, limit 1', async (t) => {
  const arArguments = [
    { id: 1, msDelay: 600 },
    { id: 2, msDelay: 300 },
    { id: 3, msDelay: 200 },
  ];
  const waitAndReturn = makeWaitAndReturn();

  const results = await runOperationsWithConcurrencyLimit({
    arOperationArguments: arArguments,
    asyncOperation: waitAndReturn,
    concurrencyLimit: 1,
  });

  assert.deepEqual(
    results, 
    [
      { id: 1, msDelay: 600, finishOrder: 1 },
      { id: 2, msDelay: 300, finishOrder: 2 },
      { id: 3, msDelay: 200, finishOrder: 3 },
    ],
  );
});
