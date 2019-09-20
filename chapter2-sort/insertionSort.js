function main(input) {
  function insertNewElement(array, newElement) {
    if (array.length === 0) return [newElement];

    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] < newElement) {
        array.splice(i + 1, 0, newElement);
        return array;
      }
    }
    return [newElement].concat(array);
  }

  function sort(leftSide, rightSide) {
    if (rightSide.length === 0) return leftSide;
    return sort(insertNewElement(leftSide, rightSide[0]), rightSide.slice(1));
  }

  return sort([], input);
}

const target = [1, 5, 6, 1, 7, 6, 2, 3];
console.log(`<< ${target}`);
console.log(`>> ${main(target)}`);
