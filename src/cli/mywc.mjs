#!/usr/bin/env node

// https://nodejs.org/en/learn/command-line/run-nodejs-scripts-from-the-command-line
// chmod u+x mywc.mjs
// console.log('process.stdin', process.stdin) // read stream

const bufferList = []
for await (const chunk of process.stdin) {
  //console.log('echot from input:', chunk.toString())
  bufferList.push(chunk)
}
const fullText = Buffer.concat(bufferList).toString();

const regexpWords = /\b\w+\b/g
const matchResult = fullText.match(regexpWords)

const wordCount = matchResult 
  ? matchResult.length
  : 0

console.log('words: ', wordCount)

// ./mywc.mjs
//    should end but blocked. wc is blocked alsow
//
// ./mywc.mjs file
//    should show result from file
//
// cat test-input.txt | ./mywc.mjs
//    should show word count. DONE