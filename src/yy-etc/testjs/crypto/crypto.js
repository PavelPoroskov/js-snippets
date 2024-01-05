const crypto = require('crypto');
const uniqid = require('uniqid');

const salt = '12345';

const hash = text => crypto.createHash('sha256').update(`${salt}${text}`).digest('hex');


const id = uniqid();

console.log('=== id');
console.log(id);

console.log('=== hash');
console.log(hash(id));


const hashSha1 = text => crypto
  .createHash('sha1')
  .update(`${text}_${new Date().getTime()}`)
  .digest('hex');

console.log('=== hashSha1');
console.log(hashSha1(id));
