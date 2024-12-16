import { getPuzzleInput } from "../getPuzzleInput";

enum Direction {
  North = "N",
  East = "E",
  South = "S",
  West = "W",
}

const sides = {
  [Direction.North]: [Direction.West, Direction.East],
  [Direction.East]: [Direction.North, Direction.South],
  [Direction.South]: [Direction.East, Direction.West],
  [Direction.West]: [Direction.South, Direction.North],
};
const posDiff = (width: number, dir: Direction): number => {
  switch (dir) {
    case Direction.North: return -width;
    case Direction.East: return 1;
    case Direction.South: return width;
    case Direction.West: return -1;
  }
};

const nPos = (width: number, pos: number, dir: Direction): [[number, Direction], [number, Direction], [number, Direction]] => {
  const forward = pos + posDiff(width, dir);
  const [lD, rD] = sides[dir];
  const left = pos + posDiff(width, lD);
  const right = pos + posDiff(width, rD);

  return [[forward, dir], [left, lD], [right, rD]];
};

const cheapestPath = (size: Pos, walls: Set<number>, pos: number, dir: Direction, target: number): [number, number] => {
  const moves: { pos: number; dir: Direction; cost: number; history: number[] }[] = [
    { pos, dir, cost: 0, history: [] },
  ];
  const cheapestCost: Record<string, number> = {};

  let cheapest = Infinity;
  let pathSpots = new Set<number>();

  while (moves.length) {
    const { pos, dir, cost, history } = moves.shift()!;
    const idx = `${pos}-${dir}`;

    if (walls.has(pos)) {
      continue;
    }
    if ((!!cheapestCost[idx] && cheapestCost[idx] < cost) || history.includes(pos)) {
      continue;
    }
    cheapestCost[idx] = cost;
    history.push(pos);

    if (pos === target) {
      if (cost < cheapest) {
        pathSpots.clear();
        cheapest = cost;
      }

      if (cost === cheapest) {
        history.forEach(pos => pathSpots.add(pos));
      }

      continue;
    }

    const [[forward, fD], [left, lD], [right, rD]] = nPos(size.x, pos, dir);

    moves.push(...[
      { pos: forward, dir, cost: cost + 1, history: [...history] },
      { pos: left, dir: lD, cost: cost + 1001, history: [...history] },
      { pos: right, dir: rD, cost: cost + 1001, history: [...history] },
    ]);
    moves.sort((a, b) => a.cost - b.cost);
  }

  return [cheapest, pathSpots.size];
};

export const day16: Problem = async () => {
  const start = performance.now();
  const input = (await getPuzzleInput(16)).split("\n");

  const width = input[0].length;
  const height = input.length - 1;

  const walls = new Set<number>();

  let startPos = 0;
  let endPos = 0;

  for (const [y, line] of input.entries()) {
    for (const [x, char] of line.split("").entries()) {
      if (char === "#") {
        walls.add(y * width + x);
      }
      else if (char === "S") {
        startPos = y * width + x;
      }
      else if (char === "E") {
        endPos = y * width + x;
      }
    }
  }

  const [part1, part2] = cheapestPath({ x: width, y: height }, walls, startPos, Direction.East, endPos);

  const end = performance.now();
  return { part1, part2, time: end - start };
};
