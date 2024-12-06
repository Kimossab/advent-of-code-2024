import { getPuzzleInput } from "../getPuzzleInput";

type Instruction = {
  position: number;
} & ({
  instruction: | "do" | "dont";
} | {
  instruction: "mul";
  a: number;
  b: number;
});

export const day3: Problem = async () => {
  const start = performance.now();
  const input = (await getPuzzleInput(3));

  const regex = /(?<mul>mul\((?<a>\d+),(?<b>\d+)\))|(?<do>do\(\))|(?<dont>don't\(\))/g;

  let part1 = 0;
  let part2 = 0;

  const instructionList: Instruction[] = [];

  let m;
  while ((m = regex.exec(input)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    const mul = !!m.groups?.mul;
    const do_ = !!m.groups?.do;
    const a = Number(m.groups?.a);
    const b = Number(m.groups?.b);

    if (mul) {
      instructionList.push({
        instruction: "mul",
        a,
        b,
        position: m.index,
      });
    }
    else {
      instructionList.push({
        position: m.index,
        instruction: !!do_ ? "do" : "dont",
      });
    }
  }

  let active = true;
  for (const instruction of instructionList.toSorted((a, b) => a.position - b.position)) {
    switch (instruction.instruction) {
      case "do":
        active = true;
        break;
      case "dont":
        active = false;
        break;
      case "mul":
        if (active) {
          part2 += instruction.a * instruction.b;
        }
        part1 += instruction.a * instruction.b;
        break;
    }
  }

  const end = performance.now();
  return { part1, part2, time: end - start };
};
