import { getPuzzleInput } from "../getPuzzleInput";

interface Pos {
  x: number;
  y: number;
}

export const day8: Problem = async () => {
  const start = performance.now();
  const input = (await getPuzzleInput(8)).split("\n").filter(l => l !== "");

  const antennas: Record<string, Pos[]> = {};

  const max: Pos = {
    x: input[0].length,
    y: input.length,
  };

  const antinodes = new Set<number>();
  const antinodes2 = new Set<number>();

  for (const [y, line] of input.entries()) {
    for (const [x, char] of line.split("").entries()) {
      if (char !== ".") {
        if (!antennas[char]) {
          antennas[char] = [{ x, y }];
        }
        else {
          for (const antenna of antennas[char]) {
            const xDiff = antenna.x - x;
            const yDiff = antenna.y - y;

            const a1 = { x: x - xDiff, y: y - yDiff };
            const a2 = { x: antenna.x + xDiff, y: antenna.y + yDiff };

            antinodes2.add(antenna.y * max.y + antenna.x);
            antinodes2.add(y * max.y + x);

            let part1 = false;
            while (a1.x >= 0 && a1.x < max.x && a1.y >= 0 && a1.y < max.y) {
              if (!part1) {
                antinodes.add(a1.y * max.y + a1.x);
                part1 = true;
              }
              antinodes2.add(a1.y * max.y + a1.x);
              a1.x -= xDiff;
              a1.y -= yDiff;
            }

            part1 = false;
            while (a2.x >= 0 && a2.x < max.x && a2.y >= 0 && a2.y < max.y) {
              if (!part1) {
                antinodes.add(a2.y * max.y + a2.x);
                part1 = true;
              }
              antinodes2.add(a2.y * max.y + a2.x);
              a2.x += xDiff;
              a2.y += yDiff;
            }
          }

          antennas[char].push({ x, y });
        }
      }
    }
  }

  const end = performance.now();
  return { part1: antinodes.size, part2: antinodes2.size, time: end - start };
};
