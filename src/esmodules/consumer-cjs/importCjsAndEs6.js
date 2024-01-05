const { hello } = require('hello-cjs');
const { requireESModule } = require('./requireESModule');
const { hello: helloES6 } = requireESModule('hello-es6');

hello();
helloES6();
