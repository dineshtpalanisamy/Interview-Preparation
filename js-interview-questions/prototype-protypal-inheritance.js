// whenever you create an object/array/function ,
// javascript will automatically allocates some hidden functionalities to
// that and attached to object

let array = [1, 2, 3];
// array.__proto__.reduce  by __proto__ we cana access the hidden properties and methods

console.log(" ---- Prototype chain ---------");

array.__proto__ == Array.prototype; // returns same thing

array.__proto__.__proto__; // returns a object

Object.prototype; // it also has prototype

array.__proto__.__proto__.__proto__; // returns null  this is prototype chaining

// whenever we createa an array , it has its prototype (array.__proto__)
// and array.prototype.prototype(array.__proto__.__proto__) has an object or return an object
// array.proto.proto.proto returns null this is the end of protype chain

// whether the prototype of array or functions prototype returns an object and returned object
// prototype is null because in JS everythong is Object after that there is nothing
// for humans ultimate is death last one , likewise in Javascript ultimate is Object after that nothing

const obj1 = {
  name: "Dinesh",
  city: "Coimbatore",
  getIntro: function () {
    console.log(`${this.name} from ${this.city} `);
  },
};
const obj2 = {
  name: "Ahsh",
};

obj2.__proto__ = obj1; // by doing this we are creating proto of obj1 in the object2 if we type obj2.__proto__ it will return obj1
console.log(obj2.__proto__);
console.log(" test ", obj2.name);
console.log(" test ", obj1.name);
console.log(" test ", obj2.city); //if we access the city which is not present in obj2 it will go
//  search for obj2.proto still not present it will search obj2.proto.proto after returns null
console.log(obj1.getIntro()); // output => Dinesh from Coimbatore
console.log(obj2.getIntro()); // output => Ahsh from Coimbatore

console.log(" Definition of prototypal inheritance");
// prototypal inheritance is that obj2 is accessing the properties and methods from proto of object1

console.log(" clear example ");

Function.__proto__.myLog = () => {
  console.log(" Dinesh is the boss");
};

function fun() {
  console.log(" Check Proto");
}

fun.myLog(); // o/p Dinesh is the boss => every function now has access to myLog()
