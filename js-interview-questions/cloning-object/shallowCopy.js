const userDetails = {
  name: "John Doe",
  age: 14,
  verified: false,
};

// Spread Method
// Cloning the Object with Spread Operator
let cloneUser = { ...userDetails };

// changing the value of cloneUser
cloneUser.name = "Jane Doe";

console.log(cloneUser.name); // 'Jane Doe'
console.log(cloneUser); //  {name: 'Jane Doe', age: 14, verified: false}
console.log(userDetails.name); // 'John Doe'
console.log(userDetails); // {name: 'John Doe', age: 14, verified: false}
// Object.assign() Method
// Cloning the Object with Object.assign() Method
let cloneUserAssign = Object.assign({}, userDetails);

// changing the value of cloneUser
cloneUserAssign.name = "Jane Doe";

console.log(cloneUserAssign.name); // 'Jane Doe'
console.log(cloneUserAssign); // {name: 'Jane Doe', age: 14, verified: false}

console.log(userDetails.name); // 'John Doe'
console.log(userDetails); // {name: 'John Doe', age: 14, verified: false}

// JSON.parse() Method
// Cloning the Object with JSON.parse() Method
let cloneUserParse = JSON.parse(JSON.stringify(userDetails));

// changing the value of cloneUser
cloneUserParse.name = "Jane Doe";

console.log(cloneUserParse.name); // 'Jane Doe'
console.log(cloneUserParse); // {name: 'Jane Doe', age: 14, verified: false}

console.log(userDetails.name); // 'John Doe'
console.log(userDetails); // {name: 'John Doe', age: 14, verified: false}
