import { getPuzzleInput } from "../getPuzzleInput";

enum Direction {
  Up = "^",
  Right = ">",
  Down = "v",
  Left = "<",
}

interface Pos {
  x: number;
  y: number;
}

interface Guard {
  pos: Pos;
  direction: Direction;
}

const nextObstacle = (guard: Guard, obstacles: Pos[]): Pos | null => {
  switch (guard.direction) {
    case Direction.Up: {
      const obstaclesInTheWay = obstacles.filter(o => o.x === guard.pos.x && o.y < guard.pos.y).map(o => o.y);
      if (obstaclesInTheWay.length === 0) {
        return null;
      }
      const y = Math.max(...obstaclesInTheWay);

      return { x: guard.pos.x, y };
    }
    case Direction.Right: {
      const obstaclesInTheWay = obstacles.filter(o => o.y === guard.pos.y && o.x > guard.pos.x).map(o => o.x);
      if (obstaclesInTheWay.length === 0) {
        return null;
      }
      const x = Math.min(...obstaclesInTheWay);
      return { x: x, y: guard.pos.y };
    }
    case Direction.Down: {
      const obstaclesInTheWay = obstacles.filter(o => o.x === guard.pos.x && o.y > guard.pos.y).map(o => o.y);
      if (obstaclesInTheWay.length === 0) {
        return null;
      }
      const y = Math.min(...obstaclesInTheWay);

      return { x: guard.pos.x, y };
    }
    case Direction.Left: {
      const obstaclesInTheWay = obstacles.filter(o => o.y === guard.pos.y && o.x < guard.pos.x).map(o => o.x);
      if (obstaclesInTheWay.length === 0) {
        return null;
      }
      const x = Math.max(...obstaclesInTheWay);
      return { x: x, y: guard.pos.y };
    }
  }
  return null;
};

const nextPos = (guard: Guard, obstacles: Pos[]): Guard | null => {
  const g = { ...guard };
  const n = nextObstacle(guard, obstacles);
  if (!n) {
    return null;
  }

  switch (g.direction) {
    case Direction.Up:
      g.pos = { x: n.x, y: n.y + 1 };
      g.direction = Direction.Right;
      break;
    case Direction.Right:
      g.pos = { x: n.x - 1, y: n.y };
      g.direction = Direction.Down;
      break;
    case Direction.Down:
      g.pos = { x: n.x, y: n.y - 1 };
      g.direction = Direction.Left;
      break;
    case Direction.Left:
      g.pos = { x: n.x + 1, y: n.y };
      g.direction = Direction.Up;
      break;
  }
  return g;
};

const doesLoop = (guard: Guard, obstacles: Pos[]): boolean => {
  let g = { ...guard };
  const history = new Set<string>();

  while (true) {
    const gString = `${g.pos.x}-${g.pos.y}-${g.direction}`;
    if (history.has(gString)) {
      return true;
    }

    history.add(gString);

    const ng = nextPos(g, obstacles);
    if (!ng) {
      return false;
    }
    g = ng;
  }
};

export const day6: Problem = async () => {
  const start = performance.now();
  const input = (await getPuzzleInput(6)).split("\n").filter(l => l !== "");

  let part2 = 0;

  const obstacles: Pos[] = [];
  const visitedPositions = new Set<string>();
  let originalGuard: Guard = {
    pos: { x: 0, y: 0 },
    direction: Direction.Up,
  };

  for (const [y, line] of input.entries()) {
    for (const [x, char] of line.split("").entries()) {
      if (char === "#") {
        obstacles.push({ x, y });
      }
      else if (char !== ".") {
        originalGuard = { pos: { x, y }, direction: char as Direction };
      }
    }
  }

  const guard = { ...originalGuard };
  let notFound = true;
  while (notFound) {
    switch (guard.direction) {
      case Direction.Up: {
        const obstaclesInTheWay = obstacles.filter(o => o.x === guard.pos.x && o.y < guard.pos.y).map(o => o.y);
        if (obstaclesInTheWay.length === 0) {
          notFound = false;
        }
        const endY = Math.max(...obstaclesInTheWay, -1) + 1;

        for (let y = guard.pos.y; y >= endY; y--) {
          visitedPositions.add(`${guard.pos.x}-${y}`);
        }

        guard.direction = Direction.Right;
        guard.pos = { x: guard.pos.x, y: endY };
        break;
      }
      case Direction.Right: {
        const obstaclesInTheWay = obstacles.filter(o => o.y === guard.pos.y && o.x > guard.pos.x).map(o => o.x);
        if (obstaclesInTheWay.length === 0) {
          notFound = false;
        }
        const endX = Math.min(...obstaclesInTheWay, input[0].length) - 1;

        for (let x = guard.pos.x; x <= endX; x++) {
          visitedPositions.add(`${x}-${guard.pos.y}`);
        }

        guard.direction = Direction.Down;
        guard.pos = { x: endX, y: guard.pos.y };
        break;
      }
      case Direction.Down: {
        const obstaclesInTheWay = obstacles.filter(o => o.x === guard.pos.x && o.y > guard.pos.y).map(o => o.y);
        if (obstaclesInTheWay.length === 0) {
          notFound = false;
        }
        const endY = Math.min(...obstaclesInTheWay, input.length) - 1;

        for (let y = guard.pos.y; y <= endY; y++) {
          visitedPositions.add(`${guard.pos.x}-${y}`);
        }

        guard.direction = Direction.Left;
        guard.pos = { x: guard.pos.x, y: endY };
        break;
      }
      case Direction.Left: {
        const obstaclesInTheWay = obstacles.filter(o => o.y === guard.pos.y && o.x < guard.pos.x).map(o => o.x);
        if (obstaclesInTheWay.length === 0) {
          notFound = false;
        }
        const endX = Math.max(...obstaclesInTheWay, -1) + 1;

        for (let x = guard.pos.x; x >= endX; x--) {
          visitedPositions.add(`${x}-${guard.pos.y}`);
        }
        guard.direction = Direction.Up;
        guard.pos = { x: endX, y: guard.pos.y };
        break;
      }
    }
  }

  for (const position of visitedPositions) {
    const [x, y] = position.split("-").map(Number);
    if (originalGuard.pos.x === x && originalGuard.pos.y === y) {
      continue;
    }
    const loops = doesLoop(originalGuard, [...obstacles, { x, y }]);

    if (loops) {
      part2++;
    }
  }

  const end = performance.now();
  return { part1: visitedPositions.size, part2, time: end - start };
};
