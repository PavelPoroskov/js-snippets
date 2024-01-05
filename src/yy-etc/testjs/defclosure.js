function deferred(strId) {
	let arrThen = [];
  let iThen = 0;
  
  function nextStep(arg) {
    if (!(iThen < arrThen.length)) {
      return;
    }

    let fnNext = arrThen[iThen];
    iThen += 1;

    if ((arg === Object(arg)) && (arg.then instanceof Function)) {
      arg.then(argFrom => {
        res = fnNext(argFrom);
        nextStep(res);
      })
    }else{
      res = fnNext(arg);
      nextStep(res);
    }
  }

  const obj = {
		then: (fn) => { 
      arrThen.push(fn);
      return returnSelf();
    },
		resolve: (arg) => nextStep(arg),
  }

  function returnSelf() {
    return obj;
  }

  return obj
}

//let obj = deferred();
// console.log(typeof obj);
// console.log(typeof obj.then);

console.log(" **** test 1");
deferred()
.then(function(res) { console.log(200, res); return "lab"; })
.then(function(res) { console.log(100, res); })
.resolve("web")


console.log(" **** test 2");
deferred('deferred 1')
	.then(function(res) {
    const d = deferred('deferred 2');
    console.log(200, res);
    setTimeout(function() {d.resolve("lab");}, 3000);
    return d;
  })
	.then(function(res) { 
    console.log(100, res); 
  })
	.resolve("web")
