export const makeRange = (
  startValue: number,
  stopValue: number,
  cardinality: number
): number[] => {
  const arr = [];
  const step = (stopValue - startValue) / (cardinality - 1);

  for (let i = 0; i < cardinality; i++) {
    arr.push(startValue + step * i);
  }

  return arr;
};
