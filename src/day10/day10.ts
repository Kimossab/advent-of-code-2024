import { getPuzzleInput } from "../getPuzzleInput";

const findPaths = (map: number[][], pos: Pos, target: number, history: Record<number, boolean>): number => {
  const idx = pos.y * map[0].length + pos.x;
  if (history[idx]) {
    return 0;
  }
  history[idx] = true;
  if (map[pos.y][pos.x] === target) {
    return 1;
  }

  let res = 0;

  if (map[pos.y - 1]?.[pos.x] === map[pos.y][pos.x] + 1) {
    res += findPaths(map, { y: pos.y - 1, x: pos.x }, target, history);
  }
  if (map[pos.y + 1]?.[pos.x] === map[pos.y][pos.x] + 1) {
    res += findPaths(map, { y: pos.y + 1, x: pos.x }, target, history);
  }
  if (map[pos.y][pos.x - 1] === map[pos.y][pos.x] + 1) {
    res += findPaths(map, { y: pos.y, x: pos.x - 1 }, target, history);
  }
  if (map[pos.y][pos.x + 1] === map[pos.y][pos.x] + 1) {
    res += findPaths(map, { y: pos.y, x: pos.x + 1 }, target, history);
  }

  return res;
};
const findAllPaths = (map: number[][], pos: Pos, target: number): number => {
  const idx = pos.y * map[0].length + pos.x;
  if (map[pos.y][pos.x] === target) {
    return 1;
  }

  let res = 0;

  if (map[pos.y - 1]?.[pos.x] === map[pos.y][pos.x] + 1) {
    res += findAllPaths(map, { y: pos.y - 1, x: pos.x }, target);
  }
  if (map[pos.y + 1]?.[pos.x] === map[pos.y][pos.x] + 1) {
    res += findAllPaths(map, { y: pos.y + 1, x: pos.x }, target);
  }
  if (map[pos.y][pos.x - 1] === map[pos.y][pos.x] + 1) {
    res += findAllPaths(map, { y: pos.y, x: pos.x - 1 }, target);
  }
  if (map[pos.y][pos.x + 1] === map[pos.y][pos.x] + 1) {
    res += findAllPaths(map, { y: pos.y, x: pos.x + 1 }, target);
  }

  return res;
};

export const day10: Problem = async () => {
  const start = performance.now();
  const input = (await getPuzzleInput(10)).split("\n").map(l => l.split("").map(Number));

  let part1 = 0;
  let part2 = 0;

  for (const [y, line] of input.entries()) {
    for (const [x, num] of line.entries()) {
      if (num === 0) {
        part1 += findPaths(input, { x, y }, 9, {});
        part2 += findAllPaths(input, { x, y }, 9);
      }
    }
  }

  const end = performance.now();
  return { part1, part2, time: end - start };
};
