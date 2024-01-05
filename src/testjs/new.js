export function parent() {
  var that = this;
  
  that.multiplier = 3;
  
  return [33, 77, 99, 81, 55].map(function(I) { return  I * that.multiplier});
  
  // function mult(I) { return  I * this.multiplier}
  // var boundMult = mult.bind(this);
  // return [33, 77, 99, 81, 55].map(boundMult(I));
}