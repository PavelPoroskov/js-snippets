const { createClient } = require('./proxy-with');

const client = createClient(58);

// client.post('book');

const fn = client.post;
// console.log(fn);
console.log('   after get');

fn('book');
