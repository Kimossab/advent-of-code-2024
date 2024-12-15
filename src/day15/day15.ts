import { getPuzzleInput } from "../getPuzzleInput";

interface Map {
  size: Pos;
  walls: Set<number>;
  boxes: Set<number>;
  robot: number;
}

enum Move {
  Up = "^",
  Right = ">",
  Down = "v",
  Left = "<",
}

const newPos = (pos: number, direction: Move): number => {
  let nPos = pos;

  switch (direction) {
    case Move.Up:
      nPos -= 100;
      break;
    case Move.Right:
      nPos += 1;
      break;
    case Move.Down:
      nPos += 100;
      break;
    case Move.Left:
      nPos -= 1;
      break;
  }
  return nPos;
};

const moveBox = (map: Map, pos: number, direction: Move): boolean => {
  const nPos = newPos(pos, direction);
  if (map.walls.has(nPos)) {
    return false;
  }
  if (map.boxes.has(nPos)) {
    const canMove = moveBox(map, nPos, direction);

    if (!canMove) {
      return false;
    }
  }

  map.boxes.delete(pos);
  map.boxes.add(nPos);
  return true;
};

const moveBox2 = (map: Map, pos: number, direction: Move): Record<number, number> | null => {
  const nPos = newPos(pos, direction);
  if (map.walls.has(nPos) || map.walls.has(nPos + 1) || map.walls.has(nPos - 1)) {
    return null;
  }

  if (direction === Move.Left && map.boxes.has(nPos - 1)) {
    const canMove = moveBox2(map, nPos - 1, direction);

    if (!canMove) {
      return null;
    }
    return {
      ...canMove,
      [pos]: nPos,
    };
  }

  if (direction === Move.Right && map.boxes.has(nPos + 1)) {
    const canMove = moveBox2(map, nPos + 1, direction);

    if (!canMove) {
      return null;
    }
    return {
      ...canMove,
      [pos]: nPos,
    };
  }

  if ((direction === Move.Up || direction === Move.Down)) {
    let moveSet = {
      [pos]: nPos,
    };

    if (map.boxes.has(nPos)) {
      const canMove = moveBox2(map, nPos, direction);

      if (!canMove) {
        return null;
      }
      moveSet = {
        ...canMove,
        ...moveSet,
      };
    }
    if (map.boxes.has(nPos + 1)) {
      const canMove = moveBox2(map, nPos + 1, direction);

      if (!canMove) {
        return null;
      }
      moveSet = {
        ...canMove,
        ...moveSet,
      };
    }

    if (map.boxes.has(nPos - 1)) {
      const canMove = moveBox2(map, nPos - 1, direction);

      if (!canMove) {
        return null;
      }
      moveSet = {
        ...canMove,
        ...moveSet,
      };
    }
    return moveSet;
  }
  return {
    [pos]: nPos,
  };
};

const move = (map: Map, direction: Move) => {
  let nPos = newPos(map.robot, direction);

  if (map.walls.has(nPos)) {
    return;
  }
  if (map.boxes.has(nPos)) {
    const canMove = moveBox(map, nPos, direction);
    if (!canMove) {
      return;
    }
  }
  map.robot = nPos;
};

const move2 = (map: Map, direction: Move) => {
  let nPos = newPos(map.robot, direction);

  if (map.walls.has(nPos) || map.walls.has(nPos - 1)) {
    return;
  }
  if (map.boxes.has(nPos)) {
    const canMove = moveBox2(map, nPos, direction);
    if (!canMove) {
      return;
    }

    for (const key of Object.keys(canMove).map(Number)) {
      map.boxes.delete(key);
    }
    for (const nPos of Object.values(canMove)) {
      map.boxes.add(nPos);
    }
  }
  else if (map.boxes.has(nPos - 1)) {
    const canMove = moveBox2(map, nPos - 1, direction);
    if (!canMove) {
      return;
    }
    for (const key of Object.keys(canMove).map(Number)) {
      map.boxes.delete(key);
    }
    for (const nPos of Object.values(canMove)) {
      map.boxes.add(nPos);
    }
  }
  map.robot = nPos;
};

const printMap2 = (map: Map) => {
  const lines: string[] = [];
  for (let y = 0; y < map.size.y; y++) {
    let string = "";
    for (let x = 0; x < map.size.x; x++) {
      const pos = y * 100 + x;
      if (map.walls.has(pos)) {
        string += "##";
        x++;
      }
      else if (map.boxes.has(pos)) {
        string += "[]";
        x++;
      }
      else if (map.robot === pos) {
        string += "@";
      }
      else {
        string += ".";
      }
    }
    lines.push(string);
  }

  console.log(lines.join("\n"));
};

export const day15: Problem = async () => {
  const start = performance.now();
  const input = (await getPuzzleInput(15)).split("\n");

  const map: Map = {
    size: { x: 100, y: 0 },
    walls: new Set(),
    boxes: new Set(),
    robot: 0,
  };

  const map2: Map = {
    size: { x: 100, y: 0 },
    walls: new Set(),
    boxes: new Set(),
    robot: 0,
  };

  for (const line of input) {
    if (line.startsWith("#")) {
      map.size.y++;
      map2.size.y++;

      for (const [x, char] of line.split("").entries()) {
        if (char === "#") {
          map.walls.add((map.size.y - 1) * 100 + x);
          map2.walls.add((map.size.y - 1) * 100 + x * 2);
        }
        if (char === "O") {
          map.boxes.add((map.size.y - 1) * 100 + x);
          map2.boxes.add((map2.size.y - 1) * 100 + x * 2);
        }
        if (char === "@") {
          map.robot = (map.size.y - 1) * 100 + x;
          map2.robot = (map2.size.y - 1) * 100 + x * 2;
        }
      }

      continue;
    }

    for (const char of line) {
      move(map, char as Move);
      move2(map2, char as Move);
    }
  }

  const end = performance.now();
  return { part1: map.boxes.values().reduce((acc, cur) => acc + cur, 0), part2: map2.boxes.values().reduce((acc, cur) => acc + cur, 0), time: end - start };
};
