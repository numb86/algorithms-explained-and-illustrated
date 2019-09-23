function main(input) {
  function merge(left, right) {
    const result = [];
    while(left.length !== 0 || right.length !== 0) {
      if (left.length === 0) {
        result.push(right[0]);
        right.shift();
        continue;
      }
      if (right.length === 0) {
        result.push(left[0]);
        left.shift();
        continue;
      }      
      if (left[0] <= right[0]) {
        result.push(left[0]);
        left.shift();
        continue;
      }
      result.push(right[0]);
      right.shift();
    }
    return result;
  }

  function loop(container) {
    if (container.length === 0) return container;
    const processedContainer = [];
    for (let i = 0; i < container.length - 1; i += 2) {
      processedContainer.push(merge(container[i], container[i + 1]));
    }
    if (container.length % 2 === 1) {
      processedContainer.push(container[container.length - 1]);
    }

    if (processedContainer.length === 1) return processedContainer[0];
    return loop(processedContainer);
  }

  return loop(input.map(elem => [elem]));
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
