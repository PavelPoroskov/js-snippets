const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const bucket = process.env.BUCKET;
const key = 'sub/sub/key';

const test = async () => {
  const writable = fs.createWriteStream(path.join(__dirname, path.basename(key)));

  let [time, diff] = [Date.now(), 0];
  console.log(' === before send request: ', diff);
  const readable = s3.getObject({ Bucket: bucket, Key: key }).createReadStream();
  [time, diff] = [Date.now(), Date.now() - time];
  console.log(' === after send request: ', diff);

  readable.once('data', () => {
    [time, diff] = [Date.now(), Date.now() - time];
    console.log(' === received date: ', diff);
  });

  readable.pipe(writable);
};

test();
