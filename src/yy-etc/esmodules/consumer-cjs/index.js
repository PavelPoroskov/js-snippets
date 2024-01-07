const { hello } = require('hello-cjs');
// not work
// const { hello: helloES6 } = require('hello-es6');

// work
// import('hello-es6').then(module => module.hello());

const test = async () => {
  let helloES6;

  await import('hello-es6').then(module => {
    helloES6 = module.hello;
  });

  hello();
  helloES6();
};

test();