import assert from 'node:assert/strict';
import test from 'node:test';


const wait = ms => new Promise(fnResolve => setTimeout(fnResolve, ms));

class TaskQueue {
  fullState = {}
  updateList = []
  fnTask
  logList = []
  cCallContinueQueue = 0

  promise = Promise.resolve(0)
  fnResolve
  fnReject

  constructor(fnTask) {
    this.fnTask = fnTask
  }
  log(obj) {
    this.logList.push(obj)
  }
  async continueQueue() {
    await this.promise.catch()

    this.cCallContinueQueue += 1
    this.log(`in continueQueue ${this.cCallContinueQueue}`)

    this.promise = new Promise((fnResolve, fnReject) => {
      this.fnResolve = fnResolve;
      this.fnReject = fnReject;
    });

    let update = this.updateList.shift()

    if (update) {
      this.log(`start update ${update.name}`)
      this.fnTask(update.duration)
      this.log(`finish update ${update.name}`)
    }

    this.fnResolve()
  }
  addUpdate(update) {
    this.updateList.push(update)

    this.continueQueue()
  }
  getLog() {
    return this.logList
  }
}

function syncUpdateTask(ms) {
  const start = Date.now()
  let now = start
  let sum = 0

  while (now - start < ms) {
    let r = Math.random()
    sum += r
    now = Date.now();
  }
 } 

test('updateQueue', async (t) => {
  const updateQueue = new TaskQueue(syncUpdateTask)

  updateQueue.addUpdate({ name: 'update 1 100ms', duration: 100 })
  updateQueue.addUpdate({ name: 'update 2 100ms', duration: 100 })
  await wait(200)
  updateQueue.addUpdate({ name: 'update 3 100ms', duration: 100 })
  updateQueue.addUpdate({ name: 'update 4 200ms', duration: 200 })
  await wait(400)

  const result = updateQueue.getLog()
  assert.deepEqual(
    result,
    [
      'in continueQueue 1',
      'start update update 1 100ms',
      'finish update update 1 100ms',
      'in continueQueue 2',
      'start update update 2 100ms',
      'finish update update 2 100ms',
      'in continueQueue 3',
      'start update update 3 100ms',
      'finish update update 3 100ms',
      'in continueQueue 4',
      'start update update 4 200ms',
      'finish update update 4 200ms',
    ],
  );
});
