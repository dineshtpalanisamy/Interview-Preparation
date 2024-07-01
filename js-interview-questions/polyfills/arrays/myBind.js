let obj = {
  fname: "Dinesh",
  lastname: "Kumar",
};

let printFunction = function (hometown, state) {
  console.log(
    `firstName : ${this.fname} and lastName : ${this.lastname}  city : ${hometown}  state: ${state}`
  );
};

let fun = printFunction.bind(obj);
fun("coimbatore", "TamilNadu");

Function.__proto__.myBind = function (...args1) {
  let globalObject = this;
  params = args1.slice(1);
  console.log("params", params);
  return function (...args2) {
    globalObject.apply(args1[0], [...params, ...args2]);
  };
};
const printName = printFunction.myBind(obj);
printName("Karamadai", "Tamil");
