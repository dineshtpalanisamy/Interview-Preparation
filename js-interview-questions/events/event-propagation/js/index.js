document.querySelector("#grandparent").addEventListener(
  "click",
  () => {
    console.log(" Grandparent clicked");
  },
  // false
  true
);

document.querySelector("#parent").addEventListener(
  "click",
  () => {
    console.log(" parent clicked");
  },
  // false
  true
);

document.querySelector("#child").addEventListener(
  "click",
  () => {
    console.log(" child clicked");
  },
  // false
  true
);

// op => when click child =>  when false
// => event bubbles from child -> parent -> grandparent
// event bubbling is passed by default , bcoz no third argument is passed in t
// the addEventListener function
// op > 3rd argument true =>
// => event trickles (i.e) => goes downwards from Grandparent -> parent -> child

document.querySelector("#grandparent").addEventListener(
  "click",
  () => {
    console.log(" Grandparent clicked");
  },
  // false
  true // capturing/trickling
);

document.querySelector("#parent").addEventListener(
  "click",
  () => {
    console.log(" parent clicked");
  },
  // false
  true // bubbling
);

document.querySelector("#child").addEventListener(
  "click",
  () => {
    console.log(" child clicked");
  },
  // false
  true // capturing/trickling
);

// op for the above scenario will be
// grandparent -> child -> parent because capturing is false in parent
// so event is passed to child and then captured and bubbled to parent

document.querySelector("#grandparent").addEventListener(
  "click",
  () => {
    console.log(" Grandparent clicked");
  },
  // false
  true // capturing/trickling
);

document.querySelector("#parent").addEventListener(
  "click",
  () => {
    console.log(" parent clicked");
  },
  // false
  true // bubbling
);

document.querySelector("#child").addEventListener(
  "click",
  (e) => {
    console.log(" child clicked");
    e.stopPropagation(); // stops from bubbling and prevents the bubbling cycle
  },

  false
  // true // capturing/trickling
);

// prevent trickling propagation

document.querySelector("#grandparent").addEventListener(
  "click",
  (e) => {
    console.log(" Grandparent clicked");
    e.stopPropagation(); // stops trickling downwards and stops trickling/capturing cycle
  },
  // false
  false // capturing/trickling
);

document.querySelector("#parent").addEventListener(
  "click",
  () => {
    console.log(" parent clicked");
  },
  // false
  true // bubbling
);

document.querySelector("#child").addEventListener(
  "click",
  (e) => {
    console.log(" child clicked");
    e.stopPropagation(); // stops from bubbling and prevents the bubbling cycle
  },

  false
  // true // capturing/trickling
);
