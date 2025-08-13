import { parentPort } from 'node:worker_threads';
// import { writeFileSync } from 'node:fs';

parentPort.on('message', (input) => {

  // const inputBuffer = Buffer.from(input);
  // const inString = inputBuffer.toString('utf8');

  // const inString = new TextDecoder('utf-8').decode(input);
  // const reversedString = Array.from(inString).toReversed().join('');
  // const outputBuffer = Buffer.from(reversedString, 'utf8');

  parentPort.postMessage(input.length);

  // const log = [];
  // log.push(`typeof input: ${typeof input}`) // object
  // // log.push(`input.__proto__': ${input.__proto__}`) //
  // // log.push(`input.constructor.prototype: ${input.constructor.prototype}`) // 
  // log.push(`input.constructor.__proto__': ${input.constructor.__proto__}`) // function TypedArray() { [native code] }
  // log.push(`input.constructor: ${input.constructor}`) // function Uint8Array() { [native code] }
  // log.push(`input.constructor.name: ${input.constructor.name}`) // Uint8Array
  // log.push(`input.length: ${input.length}`);
  // log.push(`inputBuffer.length: ${inputBuffer.length}`);
  // log.push(`inString: ${inString}`);
  // log.push(`reversedString: ${reversedString}`);
  // log.push(`outputBuffer.length: ${outputBuffer.length}`);
  // const logString = log.join('\n');
  // writeFileSync('./worker.log', logString);
});