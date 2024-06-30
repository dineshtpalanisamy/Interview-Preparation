let timeoutIds = [];

// store the original method
const originalTimeoutFn = setTimeout;

//over-writing the original method
setTimeout = function (fn, delay) {
  const id = originalTimeoutFn(fn, delay);
  timeoutIds.push(id);

  //return the id so that it can be originally cleared
  return id;
};

clearAllTimeout = function () {
  //clear all timeouts
  while (timeoutIds.length) {
    clearTimeout(timeoutIds.pop());
  }
};

setTimeout(() => {
  console.log("hello");
}, 2000);
setTimeout(() => {
  console.log("hello1");
}, 3000);
setTimeout(() => {
  console.log("hello2");
}, 4000);
setTimeout(() => {
  console.log("hello3");
}, 5000);

clearAllTimeout();

// If you notice, here we have added a
// global variable timeoutIds which we
//  are using to store the ids of each
//  setTimeout and later to cancel all
//  of them, using the global variable is bad practice as it can be overridden.
