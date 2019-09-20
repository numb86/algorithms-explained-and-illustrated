function main(input) {
  function sortMinimumValue(array) {
    let minimumValue = Number.MAX_SAFE_INTEGER;
    let minimumValueIndex;
    for (let i = 0; i < array.length; i++) {
      if (array[i] >= minimumValue) continue;
      minimumValue = array[i];
      minimumValueIndex = i;
    }
    array[minimumValueIndex] = array[0];
    array[0] = minimumValue;
    return array;
  }

  function sort(decision, rest) {
    if (rest.length <= 1) return decision.concat(rest);

    const sortedArray = sortMinimumValue(rest);
    decision.push(sortedArray[0]);
    sortedArray.shift();
    return sort(decision, sortedArray);
  }

  return sort([], input);
}

const target = [1, 5, 6, 1, 7, 6, 2, 3];
console.log(`<< ${target}`);
console.log(`>> ${main(target)}`);
