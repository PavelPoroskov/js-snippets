import { returnFirstSuccess } from './promise-chain.mjs';

const arrAllReject = [
  () => Promise.reject(-1),
  () => Promise.reject(-2),
  () => Promise.reject(-3),
  () => Promise.reject(-4),
];

const arrAllSuccess = [
  () => 1,
  () => 2,
  () => 3,
  () => 4,
];

const arrLastSuccess = [
  () => Promise.reject(-1),
  () => Promise.reject(-2),
  () => Promise.reject(-3),
  () => 4,
];

const arrThirdSuccess = [
  () => Promise.reject(-1),
  () => Promise.reject(-2),
  () => 3,
  () => Promise.reject(-4),
];

const testReturnFirstSuccess = async (arr, message ) => {
  try {
    const result = await returnFirstSuccess(arr)
    console.log(`testReturnFirstSuccess (SUCCESS): ${message}, result ${result}`);  
    return result;
  } catch (err) {
    console.log(`testReturnFirstSuccess (FAILED): ${message}, error ${err}`);  
  }
}

const test = async () => {
  // const result = await Promise.reject(-1)
  // .catch(err => {
  //   console.log('second fn');
  //   return Promise.reject(-2);
  // })
  // .catch(err => {
  //   console.log('third fn');
  //   return Promise.resolve(3);
  // });

  // console.log(result);


  // await testReturnFirstSuccess( arrAllReject, 'arrAllReject'); // must be error
  // await testReturnFirstSuccess( arrAllSuccess, 'arrAllSuccess'); // must be first
  await testReturnFirstSuccess( arrThirdSuccess, 'arrThirdSuccess'); // must be third
  // await testReturnFirstSuccess( arrLastSuccess, 'arrLastSuccess'); // must be last
}

test();
