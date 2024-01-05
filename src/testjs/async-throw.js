const wait = ms => new Promise( (fnResolve, fnReject) => setTimeout(fnReject, ms) );

const testNonAsync = (mes) => {
  try {
    return wait(200);
  }catch (e) {
    console.log(`catch testNonAsync ${mes}`);
  }
}

const testAsync = async (mes) => {
  try {
    return wait(200);
  }catch (e) {
    console.log(`catch testAsync ${mes}`);
  }
}

const testAsyncAwaitReturn = async (mes) => {
  try {
    return await wait(200);
  }catch (e) {
    console.log(`catch testAsyncAwaitReturn ${mes}`);
  }
}

testNonAsync(1);
testAsync(2);
testAsyncAwaitReturn(3);

// const testAllAsync = async () => {
//   testNonAsync(11);
//   await testAsync(22);
//   await testAsyncAwaitReturn(33);
// }

// testAllAsync();
