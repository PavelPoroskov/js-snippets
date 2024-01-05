const fetch = require('node-fetch');

const body = {
  "base64": "data:image/png;base64,AAAFBfj42Pj4"
}

const bodys = JSON.stringify(body);
// console.log(bodys);

async function runTest() {
  // fd = new FormData();
  // fd.append("base64", "data:image/png;base64,AAAFBfj42Pj4");

  try {
    const result = await fetch( "https://admin.lmndev.ml/api/public/file/base64", {
      method: "POST",
      body: JSON.stringify({
        "base64": "data:image/png;base64,AAAFBfj42Pj4"
      }),
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },      // body: fd,
    });
    const json = await result.json();
  
    console.log('result');
    console.log(json);
    console.log(json.error.exception);
  } catch(e) {
    console.log('ERROR');
    console.log(e);
    // console.log(e.exception);
  };
}

runTest();