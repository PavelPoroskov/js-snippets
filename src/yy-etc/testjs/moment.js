const moment = require('moment');

const now = moment();
console.log('now', now);

const cur = now.clone();
console.log('cur', cur);

console.log();
console.log('utcOffset');
console.log('cur', cur.utcOffset());
cur.utcOffset(0);
console.log('cur', cur);
console.log('cur', cur.utcOffset());

console.log();
console.log('startOf');
cur.startOf('day');
console.log('cur', cur);

const res = cur.unix();

console.log();
console.log('restore');
console.log(moment.unix(res).utcOffset(0));
