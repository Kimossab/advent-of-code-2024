import { getPuzzleInput } from "../getPuzzleInput";

interface Game {
  prize: Pos;
  buttonAMove: Pos;
  buttonBMove: Pos;
}

const alternative = (game: Game) => {
  const ax = BigInt(game.buttonAMove.x);
  const ay = BigInt(game.buttonAMove.y);
  const bx = BigInt(game.buttonBMove.x);
  const by = BigInt(game.buttonBMove.y);
  const px = BigInt(game.prize.x);
  const py = BigInt(game.prize.y);

  // ax * bta + bx * btb = px
  // ay * bta + by * btb = py

  // bta = (px - bx*btb) / ax

  // ay * ((px - bx * btb) / ax) + by * btb = py
  // (ay * px- ay * bx * btb + ax * by * btb) / ax = py
  // ay * px + (ax*by - ay * bx) * btb = py * ax
  // (ax*by - ay*bx) * btb = py * ax - ay * px

  const btb = (py * ax - ay * px) / (ax * by - ay * bx);

  const bta = (px - bx * btb) / ax;

  if ((py * ax - ay * px) % (ax * by - ay * bx) !== BigInt(0) || (px - bx * btb) % ax !== BigInt(0)) {
    return BigInt(0);
  }

  return btb + BigInt(3) * bta;
};

export const day13: Problem = async () => {
  const start = performance.now();
  const input = (await getPuzzleInput(13)).split("\n");

  let part1 = BigInt(0);
  let part2 = BigInt(0);

  for (let i = 0; i < input.length; i += 4) {
    const { x: aX, y: aY } = /X(?<x>[+-]\d*),\sY(?<y>[+-]\d*)/gm.exec(input[i])?.groups!;
    const { x: bX, y: bY } = /X(?<x>[+-]\d*),\sY(?<y>[+-]\d*)/gm.exec(input[i + 1])?.groups!;
    const { x: pX, y: pY } = /X=(?<x>\d*),\sY=(?<y>\d*)/gm.exec(input[i + 2])?.groups!;

    part1 += alternative({
      prize: { x: Number(pX), y: Number(pY) },
      buttonAMove: { x: Number(aX), y: Number(aY) },
      buttonBMove: { x: Number(bX), y: Number(bY) },
    });
    part2 += alternative({
      prize: { x: Number(pX) + 10000000000000, y: Number(pY) + 10000000000000 },
      buttonAMove: { x: Number(aX), y: Number(aY) },
      buttonBMove: { x: Number(bX), y: Number(bY) },
    });
  }

  const end = performance.now();
  return { part1: part1.toString(), part2: part2.toString(), time: end - start };
};
