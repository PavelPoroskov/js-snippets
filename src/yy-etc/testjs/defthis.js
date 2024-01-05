function Deferred() {
  this.arrThen = []
  this.iThen = 0
}

Deferred.prototype.then = function (fn) {
  this.arrThen.push(fn);
  return this;
}

Deferred.prototype.nextStep = function (arg) {
  if (!(this.iThen < this.arrThen.length)) {
    return;
  };

  var fnNext = this.arrThen[this.iThen];
  this.iThen += 1;

  var that = this;
  if (arg instanceof Deferred) {
    arg.then(function(argFrom) {
      res = fnNext(argFrom);
      that.nextStep(res);
    })
  }else{
    res = fnNext(arg);
    this.nextStep(res);
  }
}

Deferred.prototype.resolve = function (arg) {
  // var res = arg;
  // while (this.iThen < this.arrThen.length) {
  //   var fnNext = this.arrThen[this.iThen];
  //   res = fnNext(res);
  //   this.iThen += 1;
  // }
  this.nextStep(arg)
}
function deferred() {
  return new Deferred();
}

// var obj = deferred();
// for (let prop in obj) {
//   console.log('prop ', prop);
// }
// console.log('  Object.keys');
// console.log(Object.keys(obj));
// console.log('  getOwnPropertyNames');
// console.log(Object.getOwnPropertyNames(obj));

console.log('**** test 1')
deferred()
.then(function(res) { console.log(200, res); return "lab"; })
.then(function(res) { console.log(100, res); })
.resolve("web")

// var obj = deferred();
// console.log('obj instanceof Deferred ', obj instanceof Deferred );

console.log('**** test 2')
deferred()
	.then(function(res) {
    const d = deferred();
    console.log(200, res);
    setTimeout(function() {d.resolve("lab");}, 3000);
    return d;
  })
	.then(function(res) { console.log(100, res); })
	.resolve("web")