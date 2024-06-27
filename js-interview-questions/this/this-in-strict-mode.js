"use strict";
// global scope it points to crush === window

// in strict mode when the gf is called without bfinfo it shows undefined instead of crush(window)
// but non-strict shows crush name which is window

// called without bf
function gfFunction() {
  console.log(this); // here it dont show crush name instead shows undefined
  // no fallback to crush
}
gfFunction();

console.log("\n \n-------- called with bfInfo ---------- ");
let bfInfoObject = {
  name: " Ahash",
  age: 28,
  gfFunction: function () {
    console.log(this);
  },
};

bfInfoObject.gfFunction();
console.log("\n \n");

console.log(
  "\n \n-------- called with respective window by passing reference ---------- "
);
const gfReferenceFunction = bfInfoObject.gfFunction;
// we already know if the gf is called without bfObject inspite
// being reference it doesn't have bfInfo it points to the crush which is the window
// but in strict mode it doesn't fallback to crush instead shows undefined
gfReferenceFunction();

console.log("\n \n");
console.log("\n \n-------- what if she has multiple boyfriends ---------- ");
let bfObj1 = {
  name: "Rahul",
  age: 30,
  car: "Ola Auto",
  gfFunction: function (a, b) {
    console.log(a, b, this);
  },
};
let bfObj2 = {
  name: "Amit",
  age: 24,
  car: "MBW",
  gfFunction: function (a, b) {
    console.log(a, b, this);
  },
};

bfObj1.gfFunction(1, 2);
console.log("\n \n");
console.log(
  "\n \n-------- KALLA KADHAL gf talking about other guy instead of her own boyfriend  ---------- "
);
// kalla kadhal
bfObj1.gfFunction.call(bfObj2, 1, 2); // 1st argument is always address/reference of an object | this | undefined

console.log("\n \n");
console.log("\n \n-------- APPLY method for kalla kadhal ---------- ");

bfObj1.gfFunction.apply(bfObj2, [1, 2]);
