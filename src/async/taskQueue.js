class TaskQueue {
    queue = []
    nRunningTask = 0
    concurrencyLimit = 1

    constructor() {}

    _run() {
      if (this.nRunningTask >= this.concurrencyLimit || this.queue.length === 0) {
        return;
      }

      this.nRunningTask++;
      const task = this.queue.shift();
      if (task) {
        task();
      }
      this.nRunningTask--;

      this._run();
    }

    enqueue(task) {
      this.queue.push(task);
      this._run();
    }
  }
