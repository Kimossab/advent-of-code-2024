import { getPuzzleInput } from "../getPuzzleInput";

interface Region {
  area: number;
  perimeter: number;
  sides: number;
}

const getRegion = (x: number, y: number, map: string[][], region: Region, visited: Record<number, [boolean, boolean, boolean, boolean]>) => {
  const index = y * map[0].length + x;
  if (visited[index] !== undefined) {
    return;
  }

  const hasFenceUp = map[y - 1]?.[x] !== map[y][x];
  const hasFenceLeft = map[y]?.[x - 1] !== map[y][x];
  const hasFenceDown = map[y + 1]?.[x] !== map[y][x];
  const hasFenceRight = map[y]?.[x + 1] !== map[y][x];

  visited[index] = [hasFenceUp, hasFenceRight, hasFenceDown, hasFenceLeft];

  const leftIdx = index - 1;
  const rightIdx = index + 1;
  const upIdx = index - map[0].length;
  const downIdx = index + map[0].length;

  region.area++;
  if (hasFenceUp) {
    region.perimeter++;
    if (
      (hasFenceLeft && hasFenceRight)
      || (!hasFenceLeft && hasFenceRight && !visited[leftIdx]?.[0])
      || (!hasFenceRight && hasFenceLeft && !visited[rightIdx]?.[0])
      || (!hasFenceRight && !hasFenceLeft && !visited[leftIdx]?.[0] && !visited[rightIdx]?.[0])
    ) {
      region.sides++;
    }
  }

  if (hasFenceDown) {
    region.perimeter++;
    if (
      (hasFenceLeft && hasFenceRight)
      || (!hasFenceLeft && hasFenceRight && !visited[leftIdx]?.[2])
      || (!hasFenceRight && hasFenceLeft && !visited[rightIdx]?.[2])
      || (!hasFenceRight && !hasFenceLeft && !visited[leftIdx]?.[2] && !visited[rightIdx]?.[2])
    ) {
      region.sides++;
    }
  }

  if (hasFenceRight) {
    region.perimeter++;
    if (
      (hasFenceUp && hasFenceDown)
      || (!hasFenceUp && hasFenceDown && !visited[upIdx]?.[1])
      || (!hasFenceDown && hasFenceUp && !visited[downIdx]?.[1])
      || (!hasFenceDown && !hasFenceUp && !visited[upIdx]?.[1] && !visited[downIdx]?.[1])
    ) {
      region.sides++;
    }
  }
  if (hasFenceLeft) {
    region.perimeter++;
    if (
      (hasFenceUp && hasFenceDown)
      || (!hasFenceUp && hasFenceDown && !visited[upIdx]?.[3])
      || (!hasFenceDown && hasFenceUp && !visited[downIdx]?.[3])
      || (!hasFenceDown && !hasFenceUp && !visited[upIdx]?.[3] && !visited[downIdx]?.[3])
    ) {
      region.sides++;
    }
  }

  if (hasFenceUp && !hasFenceLeft && !hasFenceRight && visited[leftIdx]?.[0] && visited[rightIdx]?.[0]) {
    region.sides--;
  }

  if (hasFenceDown && !hasFenceLeft && !hasFenceRight && visited[leftIdx]?.[2] && visited[rightIdx]?.[2]) {
    region.sides--;
  }

  if (hasFenceRight && !hasFenceUp && !hasFenceDown && visited[upIdx]?.[1] && visited[downIdx]?.[1]) {
    region.sides--;
  }

  if (hasFenceLeft && !hasFenceUp && !hasFenceDown && visited[upIdx]?.[3] && visited[downIdx]?.[3]) {
    region.sides--;
  }

  if (!hasFenceUp) {
    getRegion(x, y - 1, map, region, visited);
  }
  if (!hasFenceDown) {
    getRegion(x, y + 1, map, region, visited);
  }
  if (!hasFenceRight) {
    getRegion(x + 1, y, map, region, visited);
  }
  if (!hasFenceLeft) {
    getRegion(x - 1, y, map, region, visited);
  }
};

export const day12: Problem = async () => {
  const start = performance.now();
  const input = (await getPuzzleInput(12)).split("\n").filter(l => l != "").map(l => l.split(""));

  const width = input[0].length;

  const visited: Record<number, [boolean, boolean, boolean, boolean]> = {};
  const regions: Region[] = [];

  for (const [y, line] of input.entries()) {
    for (const [x, char] of line.entries()) {
      const index = y * width + x;
      if (visited[index] !== undefined) {
        continue;
      }
      const region: Region = {
        perimeter: 0,
        area: 0,
        sides: 0,
      };
      getRegion(x, y, input, region, visited);

      regions.push(region);
    }
  }

  const end = performance.now();
  return { part1: regions.reduce((acc, r) => acc + r.area * r.perimeter, 0), part2: regions.reduce((acc, r) => acc + r.area * r.sides, 0), time: end - start };
};
