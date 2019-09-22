class Heap {
  #binaryTree = [];

  constructor(initBinaryTree = []) {
    if (!this.validateHeapProperty(initBinaryTree)) throw new Error('Argument violates heap property.');
    this.#binaryTree = initBinaryTree;
  }

  validateHeapProperty() {
    throw new Error("Don't use Heap constructor. You must use MaxHeap constructor or MinHeap Constructor.");
  }

  isBubbleUpCase() {
    throw new Error("Don't use Heap constructor. You must use MaxHeap constructor or MinHeap Constructor.");
  }

  isBubbleDownCase() {
    throw new Error("Don't use Heap constructor. You must use MaxHeap constructor or MinHeap Constructor.");
  }

  getPreferredChildElementIndex() {
    throw new Error("Don't use Heap constructor. You must use MaxHeap constructor or MinHeap Constructor.");
  }

  get binaryTree() {
    return this.#binaryTree;
  }

  push(value) {
    this.#binaryTree.push(value);
    this.bubbleUp(this.#binaryTree.length - 1);
  }

  bubbleUp(targetElementIndex) {
    if (targetElementIndex === 0) return;

    const parentElementIndex = Math.floor((targetElementIndex - 1) / 2);
    const targetElementValue = this.#binaryTree[targetElementIndex];
    const parentElementValue = this.#binaryTree[parentElementIndex];

    if (this.isBubbleUpCase({targetElementValue, parentElementValue})) {
      [this.#binaryTree[targetElementIndex], this.#binaryTree[parentElementIndex]]
      = [parentElementValue, targetElementValue];
      this.bubbleUp(parentElementIndex);
    }
  }

  pop() {
    const rootValue = this.#binaryTree[0];
    this.#binaryTree[0] = this.#binaryTree[this.#binaryTree.length - 1];
    this.#binaryTree.splice(-1);
    this.bubbleDown(0);
    return rootValue;
  }
  
  bubbleDown(targetElementIndex) {
    const leftChildElementIndex = 2 * targetElementIndex + 1;
    const rightChildElementIndex = 2 * targetElementIndex + 2;
    const targetElementValue = this.#binaryTree[targetElementIndex];
    const leftChildElementValue = this.#binaryTree[leftChildElementIndex];
    const rightChildElementValue = this.#binaryTree[rightChildElementIndex];

    if (leftChildElementValue === undefined && rightChildElementValue === undefined) {
      return;
    }

    if (rightChildElementValue === undefined) {
      if (this.isBubbleDownCase({targetElementValue, childElementValue: leftChildElementValue})) {
        [this.#binaryTree[targetElementIndex], this.#binaryTree[leftChildElementIndex]]
          = [leftChildElementValue, targetElementValue];
        this.bubbleDown(leftChildElementIndex);
      }
    } else {
      const preferredChildElementIndex =
        this.getPreferredChildElementIndex({
          left: {index: leftChildElementIndex, value: leftChildElementValue},
          right: {index: rightChildElementIndex, value: rightChildElementValue},
        });
      const preferredChildElementValue = this.#binaryTree[preferredChildElementIndex];

      if (this.isBubbleDownCase({targetElementValue, childElementValue: preferredChildElementValue})) {
        [this.#binaryTree[targetElementIndex], this.#binaryTree[preferredChildElementIndex]]
          = [preferredChildElementValue, targetElementValue];
          this.bubbleDown(preferredChildElementIndex);
        }
      }
  }
}

class MaxHeap extends Heap {
  validateHeapProperty(binaryTree) {
    if (!Array.isArray(binaryTree)) return false;
    if (binaryTree.length <= 1) return true;

    const lastElementIndex = binaryTree.length - 1;
    const lastParentElementIndex = Math.floor((lastElementIndex - 1) / 2);
  
    if (binaryTree[lastParentElementIndex] < binaryTree[lastElementIndex]) return false;
    if (lastElementIndex % 2 === 0) {
      if (binaryTree[lastParentElementIndex] < binaryTree[lastElementIndex - 1]) return false;
    }
  
    for (let i = 0; i < lastParentElementIndex; i++) {
      const targetValue = binaryTree[i];
      const leftChildValue = binaryTree[2 * i + 1];
      const rightChildValue = binaryTree[2 * i + 2];
      if (binaryTree[i] < leftChildValue || binaryTree[i] < rightChildValue) return false;
    }

    return true;
  }

  isBubbleUpCase({targetElementValue, parentElementValue}) {
    return targetElementValue > parentElementValue
  }

  isBubbleDownCase({targetElementValue, childElementValue}) {
    return targetElementValue < childElementValue
  }

  getPreferredChildElementIndex({left, right}) {
    return left.value >= right.value ? left.index : right.index;
  }
}

class MinHeap extends Heap {
  validateHeapProperty(binaryTree) {
    if (!Array.isArray(binaryTree)) return false;
    if (binaryTree.length <= 1) return true;

    const lastElementIndex = binaryTree.length - 1;
    const lastParentElementIndex = Math.floor((lastElementIndex - 1) / 2);
  
    if (binaryTree[lastParentElementIndex] > binaryTree[lastElementIndex]) return false;
    if (lastElementIndex % 2 === 0) {
      if (binaryTree[lastParentElementIndex] > binaryTree[lastElementIndex - 1]) return false;
    }
  
    for (let i = 0; i < lastParentElementIndex; i++) {
      const targetValue = binaryTree[i];
      const leftChildValue = binaryTree[2 * i + 1];
      const rightChildValue = binaryTree[2 * i + 2];
      if (binaryTree[i] > leftChildValue || binaryTree[i] > rightChildValue) return false;
    }

    return true;
  }

  isBubbleUpCase({targetElementValue, parentElementValue}) {
    return targetElementValue < parentElementValue
  }

  isBubbleDownCase({targetElementValue, childElementValue}) {
    return targetElementValue > childElementValue
  }

  getPreferredChildElementIndex({left, right}) {
    return left.value <= right.value ? left.index : right.index;
  }
}

function testMaxHeap(maxHeapArray) {
  if (maxHeapArray.length <= 1) return;

  const lastElementIndex = maxHeapArray.length - 1;
  const lastParentElementIndex = Math.floor((lastElementIndex - 1) / 2);

  console.assert(maxHeapArray[lastParentElementIndex] >= maxHeapArray[lastElementIndex]);
  if (lastElementIndex % 2 === 0) {
    console.assert(maxHeapArray[lastParentElementIndex] >= maxHeapArray[lastElementIndex - 1]);
  }

  for (let i = 0; i < lastParentElementIndex; i++) {
    const targetValue = maxHeapArray[i];
    const leftChildValue = maxHeapArray[2 * i + 1];
    const rightChildValue = maxHeapArray[2 * i + 2];
    console.assert(maxHeapArray[i] >= leftChildValue && maxHeapArray[i] >= rightChildValue);
  }
}

function testMinHeap(maxHeapArray) {
  if (maxHeapArray.length <= 1) return;

  const lastElementIndex = maxHeapArray.length - 1;
  const lastParentElementIndex = Math.floor((lastElementIndex - 1) / 2);

  console.assert(maxHeapArray[lastParentElementIndex] <= maxHeapArray[lastElementIndex]);
  if (lastElementIndex % 2 === 0) {
    console.assert(maxHeapArray[lastParentElementIndex] <= maxHeapArray[lastElementIndex - 1]);
  }

  for (let i = 0; i < lastParentElementIndex; i++) {
    const targetValue = maxHeapArray[i];
    const leftChildValue = maxHeapArray[2 * i + 1];
    const rightChildValue = maxHeapArray[2 * i + 2];
    console.assert(maxHeapArray[i] <= leftChildValue && maxHeapArray[i] <= rightChildValue);
  }
}

module.exports.MaxHeap = MaxHeap;
module.exports.MinHeap = MinHeap;
