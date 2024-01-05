const parser = require('lambda-multipart-parser');

const event = {
  headers: {
      "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryDP6Z1qHQSzB6Pf8c"
  },
  body: [
      '------WebKitFormBoundaryDP6Z1qHQSzB6Pf8c',
      'Content-Disposition: form-data; name="uploadFile1"; filename="test.txt"',
      'Content-Type: text/plain',
      '',
      'Hello World!',
      '------WebKitFormBoundaryDP6Z1qHQSzB6Pf8c',
      'Content-Disposition: form-data; name="type__v"',
      '',
      'Multichannel Slide',
      '------WebKitFormBoundaryDP6Z1qHQSzB6Pf8c--'
  ].join('\r\n'),
  isBase64Encoded: false
};

// WHEN
const asyncTest = async () => {
  const result = await parser.parse(event);

  console.log('parts');
  console.log(result);
};

asyncTest();