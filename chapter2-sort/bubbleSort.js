function main(input) {
  function compare(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const left = array[i - 1];
      const right = array[i];
      if (left <= right) continue;
      array[i] = left;
      array[i - 1] = right;
    }
    return array;
  }

  function sort(decision, rest) {
    if (rest.length <= 1) return decision.concat(rest);
    const comparedArray = compare(rest);
    decision.push(comparedArray[0]);
    comparedArray.shift();
    return sort(decision, comparedArray);
  }

  return sort([], input);
}

let target = [];
console.log(`<< ${target}`);
console.log(`>> ${main(target)}`);

target = [3];
console.log(`<< ${target}`);
console.log(`>> ${main(target)}`);

target = [3, 1, 2];
console.log(`<< ${target}`);
console.log(`>> ${main(target)}`);

target = [1, 5, 6, 1, 7, 6, 2, 3];
console.log(`<< ${target}`);
console.log(`>> ${main(target)}`);
