let counter = 0;

const getData = () => {
  console.log(" Fetching data .....", counter++);
};

const doSomething = function (cb, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(this, arguments);
    }, delay);
  };
};

const betterFunction = doSomething(getData, 300);
// betterFunction();
