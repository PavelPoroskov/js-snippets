const { hello } = require('hello-cjs');
// not work
// const { hello: helloES6 } = require('hello-es6');

// not work
// const { helloES6 } = require('./proxy.mjs');

// work
// import('./proxy.mjs').then(module => module.helloES6());

// work
// import('hello-es6').then(module => module.hello());

hello();

// helloES6();

const test = async () => {
  let helloES6;

  await import('hello-es6').then(module => {
    helloES6 = module.hello;
  });

  hello();
  helloES6();
};

test();