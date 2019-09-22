const {MaxHeap} = require('../chapter1-data_structure/heap');

function main(input) {
  const heap = new MaxHeap();
  input.forEach(elem => {
    heap.push(elem);
  });

  let result = [];
  while(heap.binaryTree.length > 0) {
    result = [heap.pop()].concat(result);
  }
  return result;
}

const target = [1, 5, 6, 1, 7, 6, 2, 3];
console.log(`<< ${target}`);
console.log(`>> ${main(target)}`);
