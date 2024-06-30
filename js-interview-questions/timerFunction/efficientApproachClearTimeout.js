const MY_TIMERS = {
  timeoutIds: [], //global timeout id arrays
  //create a MY_TIMERS's timeout
  setTimeout: function (fn, delay) {
    let id = setTimeout(fn, delay);
    this.timeoutIds.push(id);
    return id;
  },
  //MY_TIMERS's clearAllTimeout
  clearAllTimeout: function () {
    while (this.timeoutIds.length) {
      clearTimeout(this.timeoutIds.pop());
    }
  },
};

// Input:
const id1 = MY_TIMERS.setTimeout(() => {
  console.log("hello 1");
}, 1000);
console.log("id1 : ", id1._idleTimeout);

const id2 = MY_TIMERS.setTimeout(() => {
  console.log("hello 2");
}, 2000);
console.log("id2 : ", id2._idleTimeout);

const id3 = MY_TIMERS.setTimeout(() => {
  console.log("hello 3");
}, 3000);
console.log("id3 : ", id3._idleTimeout);

MY_TIMERS.clearAllTimeout();

// Output:
// 13 //timeoutId
