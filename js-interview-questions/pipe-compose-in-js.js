// pipe and compose are Highher order functions

const add = (x) => x + 2;
const subtract = (x) => x - 1;
const multi = (x) => x * 5;
// here the functions execute from right to left
console.log(multi(subtract(add(2))));

// above is not a Compose function, it is pipe function
// make our own compose

// note : Ramda.js and lodash libs have their own compose and pipe
// HOC = reduce => takes a list of values and applies a function to each of those values ,
// accumulating a single result

// to get the compose order from right to left as we see with nested
// function calls in our example above, we need reduceright

const compose =
  (...fns) =>
  (val) =>
    fns.reduceRight((prev, fn) => fn(prev), val);
console.log(compose(multi, subtract, add)(2));

// but to do the same from left to right we use pipe
const pipe =
  (...fns) =>
  (val) =>
    fns.reduce((prev, fn) => fn(prev), val);
console.log(pipe(add, subtract, multi)(2));

// above is a pointer free style technique where you do not see
// the unary parameter passed between each function

const divideBy = (divisor, num) => num / divisor;

//curring is doen to make it as unary function
const divBy = (divisor) => (num) => num / divisor;
const dividedBy = divBy(2);

const pipeResult = pipe(add, subtract, multi, (x) => divideBy(2, x))(10);

const pipeCurryDivideResult = pipe(add, subtract, multi, dividedBy)(10);
console.log(Math.floor(pipeCurryDivideResult));

const loreum =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const stringSplit = (str) => str.split(" ");
const count = (array) => array?.length;

const wordCount = pipe(stringSplit, count);
console.log(" wordcount : ", wordCount(loreum));

const split = (string) => string.split("");
const join = (string) => string.join("");
const lower = (string) => string.toLowerCase();
const reverse = (string) => string.reverse();

const fwd = pipe(split, join, lower);
const rev = pipe(fwd, split, reverse, join);

console.log(fwd("GrammarG") === rev("GrammarG"));
console.log(fwd("Malayalam") === rev("Malayalam"));
console.log(fwd("Mom") === rev("Dad"));

// clone/copy functions within a pipe or compose function

// 3 approches

// clone the object before an impure function mutates it
const scoreobj = { home: 0, away: 0 };
const shallowClone = (obj) => (Array.isArray(obj) ? [...obj] : { ...obj });

const incrementHome = (obj) => {
  obj.home += 1;
  return obj;
};

// pros: fewer function calls
// cons: create impure functions and testing difficulties
const homeScore = pipe(shallowClone, incrementHome);
console.log(homeScore(scoreobj));
console.log(scoreobj);
console.log(homeScore(scoreobj) === scoreobj);

// 2nd approch creating a curry function to create a partial that is unary

let incrementHomeB = (cloningFunction) => (parameterPassed) => {
  const newObjForming = cloningFunction(parameterPassed);
  newObjForming.home += 1;
  return newObjForming;
};

// Pros: Pure functions with clear dependencies
// cons: More calls to cloning functions
incrementHomeB = incrementHomeB(shallowClone);
const homeScoreSecondApproach = pipe(incrementHomeB);
console.log(homeScoreSecondApproach(scoreobj));
console.log(scoreobj);
console.log(homeScoreSecondApproach(scoreobj) === scoreobj);

// Approach 3 insert cloning function as dependency
const incrementHomeScoreC = (parameterPassed, cloneFunction) => {
  const newObjForming = cloneFunction(parameterPassed);
  newObjForming.home += 1;
  return newObjForming;
};
// Pros: Pure functions with clear dependencies
// cons: non unary functions in your pipe/ compose chain
const homeScoreC = pipe((x) => incrementHomeScoreC(x, shallowClone));
console.log(homeScoreC(scoreobj));
console.log(scoreobj);
