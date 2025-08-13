import assert from 'node:assert/strict';
import test from 'node:test';
import { Worker } from 'node:worker_threads';

test('worker: input string', async() => {
  const runWorker = (input) => new Promise((fnResolve) => {
    const worker = new Worker(new URL('string.worker.mjs', import.meta.url));
    worker.on('message', (result) => {
      fnResolve(result);
      worker.terminate();
    })
    worker.on('error', (err) => {
      worker.terminate();
    });
    worker.postMessage(input);
  });

  const testString = 'Test string';
  const output = await runWorker(testString);

  const expectedString = testString + testString.length;
  assert.equal(
    output,
    expectedString,
  );
});

test('worker: input typed array', async() => {
  const runWorker = (input) => new Promise((fnResolve) => {
    const worker = new Worker(new URL('typedArray.worker.mjs', import.meta.url));
    worker.on('message', (result) => {
      fnResolve(result);
      worker.terminate();
    })
    worker.on('error', (err) => {
      worker.terminate();
    });
    worker.postMessage(input);
  });

  const input = new Uint8Array([1,2,3,4,55]);
  const output = await runWorker(input)
    .catch((er) => {
      console.log('Error in', err)
    });
  const expectedOutput = new Uint8Array(input.length + 1)
  expectedOutput.set(input, 0);
  expectedOutput.set([input.length], input.length);

  assert.deepEqual(
    output,
    expectedOutput,
  );
});

test('worker: input object', async() => {
  const runWorker = (input) => new Promise((fnResolve) => {
    const worker = new Worker(new URL('object.worker.mjs', import.meta.url));
    worker.on('message', (result) => {
      fnResolve(result);
      worker.terminate();
    })
    worker.on('error', (err) => {
      worker.terminate();
    });
    worker.postMessage(input);
  });

  const inputString = new Uint8Array([1,2,3,4,55]);
  const inputTypedArray = new Uint8Array([1,2,3,4,55]);
  const input = {
    str: inputString,
    tarr: inputTypedArray,
  }
  const output = await runWorker(input)
    .catch((er) => {
      console.log('Error in', err)
    });

  const expectedString = inputString + inputString.length;

  const expectedTArray = new Uint8Array(inputTypedArray.length + 1)
  expectedTArray.set(inputTypedArray, 0);
  expectedTArray.set([inputTypedArray.length], inputTypedArray.length);

  const expectedOutput = {
    str: expectedString,
    tarr: expectedTArray,
  }

  assert.deepEqual(
    output,
    expectedOutput,
  );
});
