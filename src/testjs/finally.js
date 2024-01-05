// try {
//   console.log('try begin');
//   console.log('try end');
// } catch (err) {
//   console.log('catch begin');
//   console.log('catch end');
// } finally {
//   console.log('finally begin');
//   console.log('finally end');
// }

// try {
//   console.log('try begin');
//   throw new Error('Test error from try');
//   console.log('try end');
// } catch (err) {
//   console.log('catch begin');
//   console.log('catch end');
// } finally {
//   console.log('finally begin');
//   console.log('finally end');
// }

// try {
//   console.log('try begin');
//   throw new Error('Test error from try');
//   console.log('try end');
// } catch (err) {
//   console.log('catch begin');
//   throw err;
//   console.log('catch end');
// } finally {
//   console.log('finally begin');
//   console.log('finally end');
// }

function test() {
  try {
    console.log('try begin');
    return; //+ finally
    //throw new Error('Test error from try');
    console.log('try end');
  } catch (err) {
    console.log('catch begin');
    throw err;
    console.log('catch end');
  } finally {
    console.log('finally begin');
    console.log('finally end');
  }

  //return //1
}

test();