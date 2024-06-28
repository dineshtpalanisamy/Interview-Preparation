String.prototype.myRepeat = function (count) {
  count = Math.floor(count);

  if (this === null) {
    throw new TypeError(" cannot be null");
  }
  if (count < 0) {
    throw new RangeError(" cannot be negative number");
  }
  if (count === 0 && this.length === 0) {
    return "";
  }

  let result = "";
  while (count) {
    result += `${this}\n`;
    count--;
  }
  return result;
};

console.log("dinesh ".myRepeat(1));
