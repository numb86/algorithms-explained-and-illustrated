function main(a, b) {
  if (a === b) return a;

  const large = a > b ? a : b;
  const small = large === b ? a : b;
  const mod = large % small;
  if (mod === 0) return small;
  
  return main(small, mod);
}

const a = 695;
const b = 1112;

console.log(`G.C.D. of ${a} and ${b} is ${main(a, b)}.`)
