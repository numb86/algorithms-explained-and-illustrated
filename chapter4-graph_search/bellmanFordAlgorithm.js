function main(input, start, end) {
  function initialize(nodes, start) {
    const nodeMap = new Map();
    nodes.forEach(node => {
      nodeMap.set(node.id, {
        ...node,
        cost: node.id === start.id ? 0 : Infinity,
        shortestPath: [],
      });
    })
    return nodeMap;
  }

  function updateCost(targetNode) {
    targetNode.neighborhoods.forEach(neighborhood => {
      const destination = nodes.get(neighborhood.id);
      const currentCost = destination.cost
      const calculatedCost = targetNode.cost + neighborhood.cost;
      if (calculatedCost < currentCost) {
        destination.cost = calculatedCost;
        destination.shortestPath = [...targetNode.shortestPath].concat(targetNode.id);
      }
    });
  }

  function updateAllNodeCost() {
    const prevCostList = Array.from(nodes.values()).map(node => node.cost);
    nodes.forEach(node => {
      updateCost(node);
    });
    const currentCostList = Array.from(nodes.values()).map(node => node.cost);
    if (prevCostList.some((cost, index) => cost !== currentCostList[index])) {
      updateAllNodeCost();
    }
  }

  const nodes = initialize(input, start);

  updateAllNodeCost();

  return nodes.get(end.id).shortestPath.map(id => nodes.get(id)).concat(nodes.get(end.id));
}


const a = {
  id: 'a',
  neighborhoods: [
    {id: 'b', cost: 2},
    {id: 'c', cost: 7},
  ],
};
const b = {
  id: 'b',
  neighborhoods: [
    {id: 'a', cost: 1},
    {id: 'd', cost: 2},
  ],
};
const c = {
  id: 'c',
  neighborhoods: [
    {id: 'a', cost: 1},
    {id: 'd', cost: 1},
    {id: 'f', cost: 8},
  ],
};
const d = {
  id: 'd',
  neighborhoods: [
    {id: 'b', cost: 2},
    {id: 'c', cost: 1},
    {id: 'e', cost: 3},
    {id: 'f', cost: 7},
  ],
};
const e = {
  id: 'e',
  neighborhoods: [
    {id: 'd', cost: 2},
    {id: 'f', cost: 2},
  ],
};
const f = {
  id: 'f',
  neighborhoods: [
    {id: 'c', cost: 2},
    {id: 'd', cost: 3},
    {id: 'e', cost: 4},
  ],
};

const start = a;
const end = f;

const result = main([a, e, f, c, b, d], start, end);
console.log('minimum cost:', result[result.length - 1].cost);
console.log('shortest path: ', result.map(node => node.id).join(' -> '));
