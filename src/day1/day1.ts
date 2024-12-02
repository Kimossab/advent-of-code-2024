import { getPuzzleInput } from "../getPuzzleInput";

export const day1: Problem = async () => {
  const start = performance.now();
  const input = (await getPuzzleInput(1)).split("\n");

  const lists = input.reduce<[number[], number[]]>((acc, cur) => {
    const result = /(?<n1>\d*)\s*(?<n2>\d*)/gm.exec(cur)?.groups;

    acc[0].push(Number(result?.n1));
    acc[1].push(Number(result?.n2));

    return acc;
  }, [[], []]);

  lists[0].sort((a, b) => a - b);
  lists[1].sort((a, b) => a - b);

  let part1 = 0;
  let part2 = 0;

  for (const i in lists[0]) {
    part1 += Math.abs(lists[0][i] - lists[1][i]);
    part2 += lists[0][i] * lists[1].filter(l => l === lists[0][i]).length;
  }
  const end = performance.now();
  return { part1, part2, time: end - start };
};
