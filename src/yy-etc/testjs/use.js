function DumbConstructor1() { }
DumbConstructor1.prototype.dumbMethod = function() { return 1 }

// 2
function DumbConstructor2() {
  this.dumbMethod = function() { return 2}
}

var d1 = new DumbConstructor1()
var d2 = new DumbConstructor2()

console.log(d1)
console.log(d1.dumbMethod())
console.log('')
console.log(d2)
console.log(d2.dumbMethod())

console.log('')
console.log('')
d11 = Object.create(d1)
d21 = Object.create(d2)

console.log(d11)
console.log(d11.dumbMethod())
console.log('')
console.log(d21)
console.log(d21.dumbMethod())
