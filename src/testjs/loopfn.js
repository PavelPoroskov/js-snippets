function makeFn(i) {
  return function() {console.log(i)}
}

function makeArrFn(n) {
  var arr = []
  // for (var i=0; i<n; i+=1) {
  //   arr.push(makeFn(i))
  for (let i=0; i<n; i+=1) {
    arr.push(function() {console.log(i)})
  }

  return arr;
}

console.log('begin')
var arFn = makeArrFn(10)
arFn[0]()
arFn[1]()