import { getPuzzleInput } from "../getPuzzleInput";

const test = (numbers: number[], target: number, curValue: number = 0): boolean => {
  if (curValue > target) {
    return false;
  }

  if (numbers.length === 0) {
    return curValue === target;
  }

  const sum = curValue + numbers[0];
  const mul = curValue * numbers[0];
  const slice = numbers.slice(1);

  return test(slice, target, sum) || test(slice, target, mul);
};
const test2 = (numbers: number[], target: number, curValue: number = 0): boolean => {
  if (curValue > target) {
    return false;
  }

  if (numbers.length === 0) {
    return curValue === target;
  }

  const sum = curValue + numbers[0];
  const mul = curValue * numbers[0];
  const concat = Number(`${curValue}${numbers[0]}`);
  const slice = numbers.slice(1);

  return test2(slice, target, concat) || test2(slice, target, sum) || test2(slice, target, mul);
};

export const day7: Problem = async () => {
  const start = performance.now();
  const input = (await getPuzzleInput(7)).split("\n").filter(l => l !== "");

  let part1 = 0;
  let part2 = 0;

  for (const line of input) {
    const [target, nums] = line.split(": ");
    const numList = nums.split(" ").map(Number);

    if (test(numList.slice(1), Number(target), numList[0])) {
      part1 += Number(target);
      part2 += Number(target);
    }
    else if (test2(numList.slice(1), Number(target), numList[0])) {
      part2 += Number(target);
    }
  }

  const end = performance.now();
  return { part1, part2, time: end - start };
};
