// execute async functions parallel

function createAsyncTask() {
  const value = Math.floor(Math.random() * 10);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value > 4) {
        resolve(value * 1000);
      } else {
        reject(`Error : ${value * 1000}`);
      }
    }, 1000 * value);
  });
}

// createAsyncTask()
//   .then((res) => console.log(" resolved : ", res))
//   .catch((err) => console.log(err));

const tasks = [
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
];

// const executingAsynctasksParallel = (tasks, callBack) => {
//   let completed = 0;
//   const results = [];
//   const errors = [];
//   tasks.forEach((task) => {
//     task
//       .then((res) => results.push(res))
//       .catch((err) => errors.push(err))
//       .finally(() => {
//         completed++;
//         if (tasks.length <= completed) {
//           callBack(errors, results);
//         }
//       });
//   });
// };

// executingAsynctasksParallel(tasks, (error, result) => {
//   console.error(" Error : => ", error);
//   console.log(" resolved : => ", result);
// });

const executingAsynctasksParallel = (tasks, callBack) => {
  let completed = 0;
  let results = [];
  let errors = [];
  tasks.forEach((task) => {
    task
      .then((res) => results.push(res))
      .catch((err) => errors.push(err))
      .finally(() => {
        completed++;
        if (completed >= tasks.length) {
          callBack(errors, results);
        }
      });
  });
};
executingAsynctasksParallel(tasks, (errors, results) => {
  console.log(" results : ==> ", results);
  console.error(" erroros ===> ", errors);
});
