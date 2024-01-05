const _ = require('lodash');

const error = new Error('Some error 12');

const result = _.reduce(error, (acc, item) => {
  acc.push(item.toString());
  return acc;
}, []);

console.log(' === result');
console.log(result);