import assert from 'node:assert/strict';
import test from 'node:test';
import { Readable, Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

import { CheckLimitStream } from './CheckLimitStream.mjs';

test('CheckLimitStream. limit exceeded', async () => {
  // common chunk in stream 64 Kb
  const LIMIT = 2 * 64 * 1024;
  const readable = Readable.from('A'.repeat(LIMIT + 1));

  const writableResult = [];
  const myWritable = new Writable({
    write(chunk, encoding, callback) {
      writableResult.push(chunk);
      callback();
    },
  }); 

  await assert.rejects(
    async () => {
      await pipeline(
        readable,
        new CheckLimitStream(LIMIT),
        myWritable,
      )
    },
    {
      name: 'LimitWasExceededError',
    }
  )
});

test('CheckLimitStream. limit not exceeded', async () => {
  // common chunk in stream 64 Kb
  const LIMIT = 2 * 64 * 1024;
  const testInputString = 'A'.repeat(LIMIT);
  const readable = Readable.from(
    Buffer.from(testInputString, 'utf8'),
  );

  const writableResult = [];
  const myWritable = new Writable({
    write(chunk, encoding, callback) {
      writableResult.push(chunk);
      callback();
    },
  }); 

  await assert.doesNotReject(
    async () => {
      await pipeline(
        readable,
        new CheckLimitStream(LIMIT),
        myWritable,
      )
    }
  );

  assert.equal(
    Buffer.concat(writableResult).toString('utf8'),
    testInputString,
  )
});
