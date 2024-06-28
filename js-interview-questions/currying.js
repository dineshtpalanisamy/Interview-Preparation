// infinite currying

function infiniteCurrying(a) {
  return function (b) {
    if (b !== (null || undefined)) {
      return infiniteCurrying(a + b);
    }
    return a;
  };
}

console.log("==", infiniteCurrying(1)(2)(3)(4)(5)());
