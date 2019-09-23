function main (input){
  const sortedArray = [...input];

  function recursiveSort (beginIndex, endIndex) {
    if (endIndex <= beginIndex) return;

    const pivotValue = sortedArray[endIndex];
    let splitIndex = beginIndex;

    for (let i = beginIndex; i < endIndex; i++) {
      if (sortedArray[i] < pivotValue) {
        if (splitIndex !== i) {
          [sortedArray[splitIndex], sortedArray[i]] = [sortedArray[i], sortedArray[splitIndex]];
        }
        splitIndex++;
      }
    }

    [sortedArray[endIndex], sortedArray[splitIndex]] = [sortedArray[splitIndex], pivotValue];

    recursiveSort(beginIndex, splitIndex - 1);
    recursiveSort(splitIndex + 1, endIndex);
  };

  recursiveSort(0, input.length - 1);
  return sortedArray;
};

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
