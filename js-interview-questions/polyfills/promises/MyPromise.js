const STATE = {
  FULFILLED: "fulfilled",
  PENDING: "pending",
  REJECTED: "rejected",
};

class MyPromise {
  #state = STATE.PENDING;
  #value;
  #onSuccessCallbacks = [];
  #onFailCallbacks = [];
  #onSuccessBind = this.#onSuccess.bind(this); // handling "this " because it becomes a issue when dealing with chaining
  #onFailBind = this.#onFail.bind(this);
  constructor(cb) {
    try {
      cb(this.#onSuccessBind, this.#onFailBind);
    } catch (err) {
      this.#onFail(err);
    }
  }

  #runCallBacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#onSuccessCallbacks.forEach((callBack) => callBack(this.#value));
      // once promise fulfilled we can return
      // if not empty it will run again and again
      this.#onSuccessCallbacks = [];
    }
    if (this.#state === STATE.REJECTED) {
      this.#onFailCallbacks.forEach((callBack) => callBack(this.#value));
      // once promise rejected we can return
      // if not empty it will run again and again
      this.#onFailCallbacks = [];
    }
  }
  //# because private methods
  #onSuccess(val) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;
      if (val instanceof MyPromise) {
        val.then(this.#onSuccessBind, this.#onFailBind);
        return;
      }
      this.#value = val;
      this.#state = STATE.FULFILLED;
      this.#runCallBacks();
    });
  }
  //# because private methods
  #onFail(val) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;
      if (val instanceof MyPromise) {
        val.then(this.#onSuccessBind, this.#onFailBind);
        return;
      }
      // new Promise(dfghjkk).then() what if we forgot to add code catch the error if we explicitly didn't use catch()
      if (this.#onFailCallbacks.length === 0) {
        throw new UncaughtPromiseError();
      }
      this.#value = val;
      this.#state = STATE.REJECTED;
      this.#runCallBacks();
    });
  }
  // then has two callbacks because they may pass two callbacks to a function
  // Promise.then(cb1() => {}, cb2() => {}) one for success and one for fail for our easy understanding
  then(thenCallback, catchCallBack) {
    // returning new promise to handle the chaining
    //  returning a promise for chaining Promise.then().then().then().catch()
    return new MyPromise((resolve, reject) => {
      //resolve("Hi") // this is the result variable
      this.#onSuccessCallbacks.push((result) => {
        if (thenCallback == null) {
          // result is the "Hi" variable in then cb
          resolve(result);
          return;
        }

        // Promise.then().catch().then()
        // for the above scenario if error happens after then we should call the the
        // catch function inside then
        try {
          // resolve new Promise that we created with result of the previous
          // promise that we called
          // this happens in promise chaining
          // we pass in the result of previous promise to the next promise in the chain
          // eg: =>  Promise.then(" Hi ").then() => Hi is passed to the next then or the new promise in the chain
          resolve(thenCallback(result));
        } catch (error) {
          reject(error);
        }
      });

      this.#onFailCallbacks.push((result) => {
        if (catchCallBack == null) {
          reject(result);
          return;
        }

        try {
          resolve(catchCallBack(result));
        } catch (error) {
          reject(error);
        }
      });
      if (thenCallback !== null && typeof thenCallback === "function")
        this.#onSuccessCallbacks.push(thenCallback); // success or resolve callback
      if (catchCallBack !== null && typeof thenCallback === "function")
        this.#onFailCallbacks.push(thenCallback);

      this.#runCallBacks();
    });
  }

  catch(cb) {
    return this.then(undefined, cb); // for fail there will be no resolve callback
  }

  finally(cb) {
    // this.#runCallBacks();
    // Promise.then().finally().then()
    // above promise the result from the 1st then is never passed to finally
    // it skips the finally and directly passes the result to thr next then
    // dont pass the result to callback skip and insteaad return the result which means
    //result will get passed to next then/ callback in line
    return this.then(
      (result) => {
        cb();
        return result;
      },
      (result) => {
        cb();
        throw result;
      }
    );
  }

  static resolve(value) {
    return new Promise((resolve) => {
      resolve(value);
    });
  }
  static reject(value) {
    return new Promise((resolve, reject) => {
      reject(value);
    });
  }
  static all(promises) {
    const results = [];
    let completedPromises = 0;
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        promise
          .then((value) => {
            completedPromises++;
            results[i] = value;
            if (completedPromises === promises.length) {
              resolve(results);
            }
          })
          .catch(reject);
      }
    });
  }

  static allSettled(promises) {
    const results = [];
    let completedPromises = 0;
    return new MyPromise((resolve) => {
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        promise
          .then((value) => {
            results[i] = { status: STATE.FULFILLED, value };
          })
          .catch((reason) => {
            results[i] = { status: STATE.REJECTED, reason };
          })
          .finally(() => {
            completedPromises++;
            if (completedPromises === promises.length) {
              resolve(results);
            }
          });
      }
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve).catch(reject);
      });
    });
  }
  static any(promises) {
    const errors = [];
    let rejectedPromises = 0;
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        promise.then(resolve).catch((value) => {
          rejectedPromises++;
          errors[i] = value;
          if (rejectedPromises === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
      }
    });
  }
}

const p1 = new MyPromise((resolve, reject) => {
  if (Math.random() > 0.3) {
    resolve(" Promise resolved successfully");
  } else {
    reject(" Promise is rejected");
  }
});

// Promise.then(() => {
//   return new Promise() we need to handle for both cases
//   return "Hi"            case: 1 =>  when a promise returns a new Promise
// case : 2 => when it returns a value like Hi
// }).then(() => {})

class UncaughtPromiseError extends Error {
  constructor(error) {
    super(error);

    this.stack = `(in promise) ${error.stack}`;
  }
}

const Promsie = new MyPromise((resolve, reject) => {
  if (Math.random() > 0.1) {
    resolve(" success");
  }
  reject(" failed");
});
console.log(
  "Promise result ",
  Promsie.then((res) => console.log(res))
);
// Promise.then((res) => {
//   console.log(" res : ", res);
// }).catch((err) => console.log(" error ", err));
