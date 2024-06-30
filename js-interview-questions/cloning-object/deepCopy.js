// Shallow object
// const userDetails = {
//   name: "John Doe",
//   age: 14,
//   verified: false,
// };

// Deep object
const userDetails = {
  name: "John Doe",
  age: 14,
  status: {
    verified: false,
  },
};

// In deep copy , while doing deep copy on nested object , it will become reference
// so it will change the original object value, when using spredoperator and Object.assign()
// Cloning the Object with Spread Operator
let cloneUser = { ...userDetails };

// Changing the value of cloneUser
cloneUser.status.verified = true;

console.log(cloneUser); // {name: 'John Doe', age: 14, status: {verified: true}}
console.log(userDetails); // {name: 'John Doe', age: 14, status: {verified: true}}

// to overcome this we use
let cloneUser_1 = JSON.parse(JSON.stringify(userDetails));

// Changing the value of cloneUser
cloneUser_1.status.verified = true;

console.log(cloneUser_1); // {name: 'John Doe', age: 14, status: {verified: true}}
console.log(userDetails); // {name: 'John Doe', age: 14, status: {verified: false}}

// JSON.stringify() works very well with primitive data types
// like numbers, strings, or Booleans, and
// that is what you have seen in our previous examples.
//  But sometimes, JSON.stringify() is unpredictable if you are not aware of
// some values and how it handles them.

// For example, it does not work with functions, symbols, or undefined
//  values. It also changes other values like Nan and Infinity to
//  null, breaking your code. When you have a function, symbol, or
//  undefined value, it will return an empty key-value pair and skip it.

const userDetailss = {
  name: "John Doe",
  age: 14,
  status: {
    verified: false,
    method: Symbol(),
    title: undefined,
  },
};

// Cloning the Object with Spread Operator
let cloneUser_2 = JSON.parse(JSON.stringify(userDetailss));

console.log(cloneUser_2);

// Everything seems to work fine, but for the new object,
//  JSON.stringify() will return no key-value pair for the
// undefined and symbol values.

// Output
// {
//   name: "John Doe",
//   age: 14,
//   status: {
//     verified: false
//   }
// };

// This means you need to be careful. The best option to implement deep cloning will be to use Lodash. You can then be sure that none of your data will be lost.

// const userDetails = {
//   name: "John Doe",
//   age: 14,
//   status: {
//     verified: false,
//     method: Symbol(),
//     title: undefined
//   }
// };

// console.log(_.cloneDeep(userDetails));
// (_) => loadash lib
