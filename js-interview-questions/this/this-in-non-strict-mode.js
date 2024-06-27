// crush  = window
// bewafa-GF = function internally having reference to this
// BF1  = any object in general
//BF2 = any object in general

// Non-strict-mode
// global scope it points to crush === window
// strict-mode
// global scope it points to crush === window

// console.log(this); point to an object or undefined
//console.log(this); // =>  points to window/ global

// called without bf
function gfFunction() {
  // what is the value of this ? gf- respnds about her bf
  console.log(this); // whenever a gf asked about something
  // she always talks about his boyfriend
  // when there is no object/bf she calls out other stuff
}
gfFunction(); // here she takes the crush name , prints the window("crush name ") because no boyfriend
// if bf present shows output (" bf name")
// else output crush name which is window
// if you have bf (this) along with you , you take bf name , here she has a bf name which is window we assinged the window as bf

// next line runs on browser only so commenting
// window.gfFunction();

// called with BF
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

console.log("\n \n");
console.log(
  "\n \n-------- Parents worried about the daughter(gf) about daily she is changing the boyfriends what are the actions that she can take ---------- "
);
console.log(
  " whether you are with your boyfriend or crush after getting married you will always belong to the husband"
);
console.log("\n \n -----BIND-------- ");
const wifeFunction = bfObj1.gfFunction.bind(bfObj1); // married with respective to the bf always talk about the husband
wifeFunction();

console.log(" -------Advance level --------");
console.log(
  " what will happen if it is present inside a callback or async methods "
);

const object = {
  value: 50,

  regularMethod: function () {
    // at this level "this" will point object {value:50,...}
    setTimeout(
      // but at this level we are having async method setTimeout and it has a
      // callback and that call back is going to access this.value
      function () {
        console.log(" Regular methods this : ", this.value); // crush or undefined
      },
      1000
    );
  },
  // arrow functions helps to get child marriage done
  // at the time of creation itself it binds with object husbanmd or boyfriend
  // not at the time of execution/
  // regular method will say I don't know im getting executed at the global level
  arrowMethod: function () {
    setTimeout(() => {
      console.log(" Arrow method this : ", this);
    }, 1000);
  },
};

// async callback get executed with respective to global object or window ==crush on non strict mode
// undefined on strict mode

object.regularMethod();
console.log(
  "\n\n --- what happens when we use arrow functions on same method "
);
object.arrowMethod();
a = 100;
const obj2 = {
  a: 1,
  print: function () {
    function innerPrint() {
      console.log(" a > : ", this.a); // points to the global scope
    }
    innerPrint();
  },
};
obj2.print(); // executed with respective to global scope
// thre is no a in global scope so undefined

const obj3 = {
  a: 1,
  print: function () {
    a = 10; // it is not present in the space of the first normal function
    // instead it is placed inside the first normal function
    let innerPrint = () => {
      console.log(" a > : ", this.a); // points to the scope of the first normal function
      // points to reference where the first normal function is placed
      // in this the first normal function is placed inside scope of obj3
      // so this => points to values inside the scope of obj3
      // this gets binded during the creation phase itself example child marriage
    };
    innerPrint();
  },
};

obj3.print();
named = "Ganesh";
const TestObject = {
  named: "Dinesh",
  Normalfunc: function () {
    function inner() {
      function innerMost() {
        console.log(" name ::::: ", this.named);
      }
      innerMost();
    }
    inner();
  },
  ArrowFunction: function () {
    let inner = () => {
      let innermost = () => {
        console.log(" named : => ", this.named);
      };
      innermost();
    };
    inner();
  },
  complexFunctionTest: function () {
    named = " TestName";
    function normalInnerFunction() {
      let innerMost = () => {
        console.log(" Test complex function : =>", this.named);
      };
      innerMost();
    }
    normalInnerFunction();
  },
};

TestObject.Normalfunc();
TestObject.ArrowFunction();
TestObject.complexFunctionTest();
