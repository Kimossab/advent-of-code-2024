import { getPuzzleInput } from "../getPuzzleInput";

export const day5: Problem = async () => {
  const start = performance.now();
  const input = (await getPuzzleInput(5)).split("\n");

  let part1 = 0;
  let part2 = 0;

  const before: Record<number, number[]> = {};

  const sortNum = (a: number, b: number): number => {
    if (!before[a]) {
      return 0;
    }
    return before[a].includes(b) ? -1 : 1;
  };

  const compareNumList = (a: number[], b: number[]): boolean => {
    for (const [index, num] of a.entries()) {
      if (num !== b[index]) {
        return false;
      }
    }
    return true;
  };

  for (const line of input) {
    if (line.includes("|")) {
      const [b, a] = line.split("|").map(Number);

      if (!!before[b]) {
        before[b].push(a);
      }
      else {
        before[b] = [a];
      }
    }
    else {
      if (line.includes(",")) {
        const num = line.split(",").map(Number);
        const sorted = num.toSorted(sortNum);
        if (compareNumList(num, sorted)) {
          part1 += num[Math.floor(num.length / 2)];
        }
        else {
          part2 += sorted[Math.floor(sorted.length / 2)];
        }
      }
    }
  }

  const end = performance.now();
  return { part1, part2, time: end - start };
};
