import assert from 'node:assert/strict';
import test from 'node:test';
import { Worker } from 'node:worker_threads';

test('worker: input binary, output binary', async() => {
  const runWorker = (input) => new Promise((fnResolve) => {
    const worker = new Worker(new URL('binary.worker.mjs', import.meta.url));
    worker.on('message', (result) => {
      fnResolve(result);
      console.log(' ### after fnResolve(result)');
      worker.terminate();
      console.log(' ### after worker.terminate()');
    })
    worker.on('error', (err) => {
      console.log(' ### ERROR in worker', err);
      worker.terminate();
    });
    worker.postMessage(input, [input.buffer]);
  });

  const testString = 'Test string';
  const input = Buffer.from(testString, 'utf8');
  const output = await runWorker(input);

  // console.log('typeof output', typeof output) // object
  // console.log('output.__proto__', output.__proto__) // TypedArray {}
  // console.log('output.constructor.prototype', output.constructor.prototype) // TypedArray {}
  // console.log('output.constructor.__proto__', output.constructor.__proto__) // [Function: TypedArray]
  // console.log('output.constructor', output.constructor) // [Function: Uint8Array]
  // console.log('output.constructor.name', output.constructor.name) // Uint8Array

  const reversedString = Array.from(testString).toReversed().join('');
  const outputBuffer = Buffer.from(reversedString, 'utf8');

  assert(
    Buffer.from(output).equals(outputBuffer),
  );
});

