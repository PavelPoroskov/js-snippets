import assert from 'node:assert/strict';
import test from 'node:test';


const wait = ms => new Promise(fnResolve => setTimeout(fnResolve, ms));

// check code from book 'Nest.js: A Progressive Node.js Framework', page 88
// await comments.forEach(async comment => {
//   await this.commentsSrv.create(comment);
//   entry.comments.push(comment);
//   });
// result: it is error

test('await with array.forEach()', async (t) => {
  const result = [];

  const taskList = [
    { name: 'task 1 300ms', duration: 300 },
    { name: 'task 2 100ms', duration: 100 },
    { name: 'task 3 150ms', duration: 150 },
  ]

  result.push('before forEach')
  await taskList.forEach(async (task) => {
    result.push(`before task ${task.name}`)
    await wait(task.duration)
    result.push(`after task ${task.name}`)
  })
  result.push('after forEach')

  assert.deepEqual(
    result,
    [
      'before forEach',
      'before task task 1 300ms',
      'before task task 2 100ms',
      'before task task 3 150ms',
      'after forEach',
    ],
  );
});
