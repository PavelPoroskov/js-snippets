const { Readable } = require('stream');

const wait = ms => new Promise( fnResolve => setTimeout(fnResolve, ms, ms) );

// async function* asyncGenerator() {
//   wait(200).then((result) => {
//     console.log(' before yield: ', result);
//     // it does not work
//     yield ;
//     console.log(' after yield: ', result);
//   });

//   // await Promise.all([
//   //   wait(200).then((result) => {
//   //     console.log(' before yield: ', result);
//   //     yield result;
//   //     console.log(' after yield: ', result);
//   //   }),
//   //   wait(300).then((result) => {
//   //     console.log(' before yield: ', result);
//   //     yield result;
//   //     console.log(' after yield: ', result);
//   //   }),
//   //   wait(150).then((result) => {
//   //     console.log(' before yield: ', result);
//   //     yield result;
//   //     console.log(' after yield: ', result);
//   //   }),
//   // ]);
// }

// const makeAsyncIterable = () => {
//   const results = [];
//   const index = 0;

//   wait(200).then(result => results.push(result));
//   wait(300).then(result => results.push(result));
//   wait(150).then(result => results.push(result));

//   return {
//     [Symbol.asyncIterator]() {
//       return {
//         next() {
//           if (results.size < 3) {
//             if (index > results.size) {
//               await addEvent();
//             }
//             value = results[index];
//             index = index + 1;
//             return Promise.resolve({ value, done: false });
//           }

//           return Promise.resolve({ done: true });
//         }
//       };
//     }
//   }
// };

// async function* asyncGenWithQueue() {
//   const results = [];
//   const index = 0;

//   wait(200).then(result => results.push(result));
//   wait(300).then(result => results.push(result));
//   wait(150).then(result => results.push(result));

//   return {
//     [Symbol.asyncIterator]() {
//       return {
//         next() {
//           if (results.size < 3) {
//             if (index > results.size) {
//               await addEvent();
//             }
//             value = results[index];
//             index = index + 1;
//             return Promise.resolve({ value, done: false });
//           }

//           return Promise.resolve({ done: true });
//         }
//       };
//     }
//   }
// };

// // use readable stream
// // event on 'data'
// async function* asyncGenWithStream() {

//   // create stream
//   // start promises
//   // every promise.then( stream.push(result) )

//   yield* readableStream;
// }

const generateZipEntries = async ({ pushZipEntry }) => {
  pushZipEntry({ key: 1 });
  await wait(100);
  wait(200).then(result => {
    pushZipEntry({ key: result });
  });

  await Promise.all([
    wait(210).then(result => {
      pushZipEntry({ key: result });
    }),
    wait(300).then(result => {
      pushZipEntry({ key: result });
    }),
    wait(150).then(result => {
      [22, 33, 44].forEach(item => {
        pushZipEntry({ key: item });
      })
    }),
  ]);

  // readable.push(null);
}

const makeReadableStreamZipEntires = (generateZipEntries) => {
  const readable = new Readable({ objectMode: true });
  readable._read = () => {};

  generateZipEntries({
    pushZipEntry: (entry) => {
      readable.push(entry)
    },
  });

  return readable;
}

// const myAsyncIterable = {
//   async* [Symbol.asyncIterator]() {
//       yield "hello";
//       yield "async";
//       yield "iteration!";
//   }
// };

const test = async () => {
  for await (const i of makeReadableStreamZipEntires()) {
    console.log(' from generator: ', i);
  }
  console.log(' The end ');
}

test();