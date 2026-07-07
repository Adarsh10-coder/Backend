const math = require("./math");

//todo ....require("./---") ---> mean search in current directory
//todo ....require("--") ---> mean search in buildin package or in any external install package

console.log("Math value is:", math.add(2,5));
// console.log("Math value is:", math.sub(2,5));

//+++++++++ OR +++++++++
/*
 const {add, sub} = require("./math");
 
 console.log("Math value is:", add(2,5));
 console.log("Math value is:", sub(2,5));
*/