const person = {
  name: "Ethan",
  age: 23,
  work: {
    job: "Driver",
    obj: {
      nestedName: "Dinesh",
    },
    check: "check",
  },
};

const {
  name,
  age,
  work: {
    job,
    obj: { nestedName = "Ahash loves Rajesh " }, // this wont work because it is already declared and present initially
    salary = "8Lpa", // this will work because it not present initially
    check = "N/A",
  },
} = person;

const obj = {
  names: "Ethan",
  agee: 23,
  workk: {
    jobb: "Driver",
    obj: {
      nestedName: "Dinesh",
    },
    check: "check",
  },
};

const {
  names,
  agee,
  workk: { jobb = "N/A", salaryy = "8LPA" },
} = obj;
console.log(" salaryy ", salaryy);

const complex = {
  namess: "Rajesh",
  ageee: 80,
  // workk: { jobb = "N/A", salaryy = "8LPA" },
};

const { namess, ageee, work: { salaries = "80LPA" } = {} } = complex;
console.log("salaries ", salaries);

// Now consider if the work property wasn’t available at all.
//  In that case, you’d need to write the above destructuring
//  expression in the following way:

const { work: { jjob = "NA", ssalary = "NA" } = {} } = person;
console.log(jjob);

console.log("-----------------------Array Destructuring -------------");
const arr = [1, 2, 3];
const [a, b] = arr;
console.log(" array destructuring ", a, b);

//skips the 2nd element
const [first, , third] = arr;
console.log(" array destructuring ", first, third);

const array = ["a", "b", "c", "d"];

const { 0: firstIndex, 3: fourthIndex } = array;

console.log("array : ", firstIndex, fourthIndex);

const { 0: firstIndexx, 3: fourthIndexx, 9: tenthIndexx = "z" } = array;
console.log(" array : => ", array);
console.log(" array 10 th index : => ", tenthIndexx);

const nestedArrayDestructuring = [a, [2, 3, 4, [5, 6, 7]]];
console.log(" nestedArray ", nestedArrayDestructuring);
const [fir, [two, three, four, [five, six, seven]]] = nestedArrayDestructuring;
console.log(" fir ", fir);
console.log(" two ", two);
console.log(" three ", three);
console.log(" four ", four);
console.log(" five ", five);
console.log(" six ", six);
console.log(" seven ", seven);

// omitting properties using rest operator
const arrString = ["Hello", "How", "are", "you"];
var [hello, ...remaining] = arrString;
console.log(remaining); // ["How" , "are", "you"]

const person1 = {
  named: "Ganesh",
  aged: 18,
  work: {
    job: "SDE",
    salary: "20lpa",
  },
};
const { named, ...remain } = person1;
console.log(" named : ", named);
console.log(" remain : ", remain);

// Using Computed Properties in Destructuring

const personObj = {
  namer: "Ethan",
  worker: {
    jober: "Driver",
  },
};
let namer = "namer";
let employee = "worker";
let kindAjob = "jober";
const {
  [namer]: username,
  [employee]: jobType,
  [employee]: { [kindAjob]: profession },
} = personObj;
console.log("username : ", username);
console.log("jobType : ", jobType);
console.log("profession : ", profession);
console.log("personObj : ", personObj);
