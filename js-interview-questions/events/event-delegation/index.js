// instead of returning a callBack function to each eventListener
// instead we can add a callBack function on the parent div
// (i.e) bubbling the event to the callBack present in the parent div

// document.querySelector("#category").addEventListener(
//   "click",
//   (e) => {
//     console.log(" target ", e.target.id);
//     // only redirect when it is a li element
//     // otherwise it call the callBack whenever something clicked on to the
//     // child div
//     if (e.target.tagName === "LI") {
//       window.location.href = "/" + e.target.id;
//     }
//   },
//   false
// );

document.querySelector("#form").addEventListener(
  "keyup",
  (e) => {
    if (e.target.dataset.uppercase != undefined) {
      // this is only done on name example for behavioural pattern
      e.target.value = e.target.value.toUpperCase();
    }
    if (e.target.dataset != undefined) {
      e.target.value = e.target.value;
    }
  },
  false
);

//Pros
// memory: only single eventhandler so memory saved // performance bottleneck
// writing less code
//DOM manipulation if we add a category we need to write a seperate eventHandler for that category
// not all events are bubbled up => blur, resize etc
// stopPropagation( ) stops bubbling
