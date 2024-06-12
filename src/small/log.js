import { inspect } from 'node:util';

export const logObject = (obj) => {
  inspect(obj, { showHidden: false, depth: null });
};

// %o format a variable as an object
// console.log('%o', Number);

// console.trace()

// do something, and measure the time it takes
// console.time('doSomething()');
// doSomething();
// console.timeEnd('doSomething()')

// const chalk = require('chalk');
// console.log(chalk.yellow('hi!'));