import { getPuzzleInput } from "../getPuzzleInput";

interface Robot {
  position: Pos;
  velocity: Pos;
}

const getPosition = (robot: Robot, time: number, size: Pos): number => {
  let x = (robot.position.x + time * robot.velocity.x) % size.x;
  let y = (robot.position.y + time * robot.velocity.y) % size.y;

  if (x < 0) {
    x = size.x + x;
  }
  if (y < 0) {
    y = size.y + y;
  }
  return y * size.x + x;
};

const readInput = (input: string[]): Robot[] => {
  const robots: Robot[] = [];

  for (const line of input) {
    if (line == "") {
      continue;
    }
    const match = /p=(?<px>\d+),(?<py>\d+)\sv=(?<vx>-?\d+),(?<vy>-?\d+)/gm.exec(line);
    const robot = {
      position: { x: Number(match?.groups!.px), y: Number(match?.groups!.py) },
      velocity: { x: Number(match?.groups!.vx), y: Number(match?.groups!.vy) },
    };

    robots.push(robot);
  }

  return robots;
};

const countQuadrant = (robots: number[], size: Pos) => {
  const quadrantCount = [0, 0, 0, 0];
  const halfX = Math.floor(size.x / 2);
  const halfY = Math.floor(size.y / 2);

  for (const pos100 of robots) {
    const y = Math.floor(pos100 / size.x);
    const x = pos100 % size.x;

    if (x < halfX) {
      if (y < halfY) {
        quadrantCount[0]++;
      }
      if (y > halfY) {
        quadrantCount[1]++;
      }
    }
    if (x > halfX) {
      if (y < halfY) {
        quadrantCount[2]++;
      }
      if (y > halfY) {
        quadrantCount[3]++;
      }
    }
  }
  return quadrantCount;
};

export const day14: Problem = async (width = 101, height = 103, test = false) => {
  const start = performance.now();
  const input = (await getPuzzleInput(14)).split("\n");

  let part2 = 0;

  const robots: Robot[] = readInput(input);

  const robot100 = robots.map(r => getPosition(r, 100, { x: width, y: height }));

  const quadrantCount = countQuadrant(robot100, { x: width, y: height });

  /* This is what the tree looks like
1111111111111111111111111111111
1.............................1
1.............................1
1.............................1
1.............................1
1..............1..............1
1.............111.............1
1............11111............1
1...........1111111...........1
1..........111111111..........1
1............11111............1
1...........1111111...........1
1..........111111111..........1
1.........11111111111.........1
1........1111111111111........1
1..........111111111..........1
1.........11111111111.........1
1........1111111111111........1
1.......111111111111111.......1
1......11111111111111111......1
1........1111111111111........1
1.......111111111111111.......1
1......11111111111111111......1
1.....1111111111111111111.....1
1....111111111111111111111....1
1.............111.............1
1.............111.............1
1.............111.............1
1.............................1
1.............................1
1.............................1
1.............................1
1111111111111111111111111111111
 */

  let steps = 1;
  while (!test) {
    const nR = robots.reduce((acc, r) => acc.add(getPosition(r, steps, { x: width, y: height })), new Set<number>());

    for (const robot of nR) {
      let has = true;
      for (let i = robot + 1; i < robot + 10; i++) {
        if (!nR.has(i)) {
          has = false;
          break;
        }
      }
      if (has) {
        part2 = steps;
        break;
      }
    }

    if (part2 !== 0) {
      break;
    }

    steps++;
  }

  const end = performance.now();
  return { part1: quadrantCount.reduce((acc, q) => acc * q, 1), part2, time: end - start };
};
