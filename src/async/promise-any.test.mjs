import assert from 'node:assert/strict';
import test from 'node:test';

import { setTimeout as setTimeoutPromise } from  'node:timers/promises';

test('Promise.any does NOT wait all promises', async() => {
  const isShowLog = false;
  const log = (...str) => {
    if (isShowLog) {
      console.log(...str);
    }
  };

  const wait = ms => new Promise(fnResolve => setTimeout(fnResolve, ms));

  const startTime = performance.now();
  const result = await Promise.any([
    wait(200).then(() => {
      log('finished 200');
      return 200;
    }),
    wait(600).then(() => {
      log('finished 600');
      return 600;
    }),
  ]);
  const promiseAnyDurationMs = performance.now() - startTime;
  log('finished Promise.any()', { promiseAnyDurationMs });

  assert.equal(
    result,
    200,
    'result is first by time'
  );
  assert.ok(
    (200 <= promiseAnyDurationMs) && (promiseAnyDurationMs < 600),
    'Promise.any does not wait all promises'
  );
});

test('Promise.any. All promises are finished', async() => {
  const wait = ms => new Promise(fnResolve => setTimeout(fnResolve, ms));
  let isShortPromiseFinished = false;
  let isLongPromiseFinished = false;
  let longPromiseDurationMs;

  const startTime = performance.now();
  const result = await Promise.any([
    wait(200).then(() => {
      isShortPromiseFinished = true;
      return 200;
    }),
    wait(600).then(() => {
      isLongPromiseFinished = true;
      longPromiseDurationMs = performance.now() - startTime;
      return 600;
    }),
  ]);

  assert.equal(
    result,
    200,
    'result is first by time'
  );
  assert.ok(
    isShortPromiseFinished,
  );
  assert.ok(
    !isLongPromiseFinished,
  );

  await wait(500);
  assert.ok(
    600 <= longPromiseDurationMs,
  );
});

test('Promise.any. Abort long promise', async() => {
  const wait = (ms, abortSignal, result=ms) => setTimeoutPromise(ms, result, { signal: abortSignal });
  let isShortPromiseFinished = false;
  let isLongPromiseFinished = false;
  let isLongPromiseRejected = false;
  let longPromiseDurationMs;

  const ac = new AbortController();
  const signal = ac.signal;
  
  const startTime = performance.now();
  const result = await Promise.any([
    wait(200, signal).then((result) => {
      isShortPromiseFinished = true;
      ac.abort();

      return result;
    }),
    wait(600, signal)
      .then((result) => {
        isLongPromiseFinished = true;
        longPromiseDurationMs = performance.now() - startTime;
        ac.abort();

        return result;
      })
      .catch(() => {
        isLongPromiseRejected = true;        
        longPromiseDurationMs = performance.now() - startTime;
      }),
  ]);

  assert.equal(
    result,
    200,
    'result is first by time'
  );
  assert.ok(
    isShortPromiseFinished,
  );

  await wait(100);
  assert.ok(
    !isLongPromiseFinished,
  );
  assert.ok(
    isLongPromiseRejected,
  );
  assert.ok(
    longPromiseDurationMs < 600,
  );
});
