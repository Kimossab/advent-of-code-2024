import { getPuzzleInput } from "../getPuzzleInput";

const getRockLength = (number: string, steps: number, found: Record<string, number>): number => {
  const t = `${number}-${steps}`;
  if (found[t]) {
    return found[t];
  }
  if (steps === 1) {
    found[t] = number.length % 2 === 0 ? 2 : 1;
    return number.length % 2 === 0 ? 2 : 1;
  }

  if (number === "0") {
    const sum = getRockLength("1", steps - 1, found);
    found[t] = sum;
    return sum;
  }

  if (number.length % 2 === 0) {
    const sum = getRockLength(Number(number.slice(0, number.length / 2)).toString(), steps - 1, found) + getRockLength(Number(number.slice(number.length / 2)).toString(), steps - 1, found);
    found[t] = sum;
    return sum;
  }

  const sum = getRockLength((Number(number) * 2024).toString(), steps - 1, found);
  found[t] = sum;
  return sum;
};

export const day11: Problem = async () => {
  const start = performance.now();
  const input = (await getPuzzleInput(11)).split("\n")[0].split(" ");

  const found = {};

  let part1 = input.reduce((acc, cur) => acc + getRockLength(cur, 25, found), 0);
  let part2 = input.reduce((acc, cur) => acc + getRockLength(cur, 75, found), 0);

  const end = performance.now();
  return { part1, part2, time: end - start };
};
