import { getPuzzleInput } from "../getPuzzleInput";

enum Direction {
  UP,
  UP_RIGHT,
  RIGHT,
  DOWN_RIGHT,
  DOWN,
  DOWN_LEFT,
  LEFT,
  UP_LEFT,
}

interface Coord {
  x: number;
  y: number;
}

const allMatchesRegex = (regex: RegExp, input: string): number => {
  let start = 0;
  let matches = 0;
  while (start < input.length) {
    const res = input.substring(start).search(regex);
    if (res == -1) {
      break;
    }
    matches++;
    start = start + res + 1;
  }
  return matches;
};

export const day4: Problem = async () => {
  const start = performance.now();
  const input = (await getPuzzleInput(4));

  const length = input.search("\n");

  let part1 = 0;
  let part2 = 0;

  const right = allMatchesRegex(/xmas/gi, input);
  const left = allMatchesRegex(/samx/gi, input);
  const down = allMatchesRegex(RegExp(`(x)[xmas\\n]{${length}}(m)[xmas\\n]{${length}}(a)[xmas\\n]{${length}}(s)`, "gi"), input);
  const up = allMatchesRegex(RegExp(`(s)[xmas\\n]{${length}}(a)[xmas\\n]{${length}}(m)[xmas\\n]{${length}}(x)`, "gi"), input);
  const downLeft = allMatchesRegex(RegExp(`(x)[xmas\\n]{${length - 1}}(m)[xmas\\n]{${length - 1}}(a)[xmas\\n]{${length - 1}}(s)`, "gi"), input);
  const downRight = allMatchesRegex(RegExp(`(x)[xmas\\n]{${length + 1}}(m)[xmas\\n]{${length + 1}}(a)[xmas\\n]{${length + 1}}(s)`, "gi"), input);
  const upLeft = allMatchesRegex(RegExp(`(s)[xmas\\n]{${length - 1}}(a)[xmas\\n]{${length - 1}}(m)[xmas\\n]{${length - 1}}(x)`, "gi"), input);
  const upRight = allMatchesRegex(RegExp(`(s)[xmas\\n]{${length + 1}}(a)[xmas\\n]{${length + 1}}(m)[xmas\\n]{${length + 1}}(x)`, "gi"), input);

  part1 += right + left + down + up + downLeft + downRight + upLeft + upRight;
  const end = performance.now();

  part2 += allMatchesRegex(RegExp(`(m).(m)[xmas\\n]{${length - 1}}(a)[xmas\\n]{${length - 1}}(s).(s)`, "gi"), input);
  part2 += allMatchesRegex(RegExp(`(m).(s)[xmas\\n]{${length - 1}}(a)[xmas\\n]{${length - 1}}(m).(s)`, "gi"), input);
  part2 += allMatchesRegex(RegExp(`(s).(s)[xmas\\n]{${length - 1}}(a)[xmas\\n]{${length - 1}}(m).(m)`, "gi"), input);
  part2 += allMatchesRegex(RegExp(`(s).(m)[xmas\\n]{${length - 1}}(a)[xmas\\n]{${length - 1}}(s).(m)`, "gi"), input);
  return { part1, part2, time: end - start };
};
