const mapLimit = (arr, limit, fn) => {
  // return a new promise
  return new Promise((resolve, reject) => {
    // chop the input array into the subarray of limit
    // [[1, 2, 3], [1, 2, 3]]
    let chopped = arr.chop(limit);
    console.log(" chopped array => ", chopped);

    // for all the subarrays of chopped
    // run it in series
    // that is one after another
    // initially it will take an empty array to resolve
    // merge the output of the subarray and pass it on to the next
    const final = chopped.reduce((a, b) => {
      return a.then((val) => {
        console.log(" b => ", b);
        // run the sub-array values in parallel
        // pass each input to the iteratee function
        // and store their outputs
        // after all the tasks are executed
        // merge the output with the previous one and resolve
        return new Promise((resolve, reject) => {
          const results = [];
          let tasksCompleted = 0;
          b.forEach((e) => {
            fn(e, (error, value) => {
              if (error) {
                reject(error);
              } else {
                results.push(value);
                tasksCompleted++;
                if (tasksCompleted >= b.length) {
                  resolve([...val, ...results]);
                }
              }
            });
          });
        });
      });
    }, Promise.resolve([]));

    // based on final promise state
    // invoke the final promise.
    final
      .then((result) => {
        resolve(result);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

let numPromise = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);
    callback(null, num);
  }, 2000);
});

numPromise
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));

// helper function to chop array in chunks of given size
Array.prototype.chop = function (size) {
  //temp array
  // const temp = [...this];
  const temp = this;
  console.log(" temp ->", temp);

  //if the size is not defined
  if (!size) {
    return temp;
  }

  //output
  const output = [];
  let i = 0;

  //iterate the array
  while (i < temp.length) {
    //slice the sub-array of a given size
    //and push them in output array
    output.push(temp.slice(i, i + size));
    i = i + size;
  }

  return output;
};

let numPromise1 = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);
    callback(null, num);
  }, 2000);
});

numPromise1
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));

// first batch
Output: 2;
4;
6;
// second batch
8;
10;
("success:2,4,6,8,10");

console.log("Chop ===> ", [5, 10, 15, 20, 30].chop(2));
