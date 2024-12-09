import { getPuzzleInput } from "../getPuzzleInput";

interface Block {
  id: number;
  size: number;
  idx: number;
}

const checkSum = (id: number, range: number, index: number): number => {
  let res = 0;
  for (let i = index; i < index + range; i++) {
    res += id * i;
  }
  return res;
};

const part1Move = (files: Block[], blanks: Block[]): number => {
  let res = 0;
  let idx = 0;
  while (files.length > 0) {
    const file = files.shift();
    res += checkSum(file!.id, file!.size, idx);
    idx += file!.size;

    const blank = blanks[file!.id];

    if (!blank) {
      continue;
    }

    while (blank.size > 0) {
      const file = files[files.length - 1];
      if (!file) {
        break;
      }
      if (blank.size >= file.size) {
        blank.size -= file.size;
        res += checkSum(file.id, file.size, idx);

        idx += file.size;
        files.pop();
      }
      else {
        file.size -= blank.size;
        res += checkSum(file.id, blank.size, idx);

        idx += blank.size;

        blank.size = 0;
      }
    }
  }
  return res;
};

const part2Move = (files: Block[], blanks: Block[]): number => {
  for (let f = files.length - 1; f >= 0; f--) {
    const file = files[f];

    const blank = blanks.find(b => b.size >= file.size && b.idx < file.idx);

    if (!blank) {
      continue;
    }

    blank.size -= file.size;
    file.idx = blank.idx;
    blank.idx += file.size;
  }

  return files.reduce((acc, file) => acc + checkSum(file.id, file.size, file.idx), 0);
};

export const day9: Problem = async () => {
  const start = performance.now();
  const input = (await getPuzzleInput(9)).split("\n");

  const files: Block[] = [];
  const blanks: Block[] = [];

  let id = 0;
  let idx = 0;

  for (const [index, len] of input[0].split("").map(Number).entries()) {
    if (index % 2 == 0) {
      files.push({ id, size: len, idx });
    }
    else {
      blanks.push({ id, size: len, idx });
      id++;
    }

    idx += len;
  }

  const part1 = part1Move(JSON.parse(JSON.stringify(files)), JSON.parse(JSON.stringify(blanks)));
  const part2 = part2Move(files, blanks);

  const end = performance.now();
  return { part1, part2, time: end - start };
};
