import { getPuzzleInput } from "../getPuzzleInput";

const sameSignal = (num1: number, num2: number): boolean => {
  return (num1 > 0 && num2 > 0) || (num1 < 0 && num2 < 0);
};

const isSafe = (report?: number[]): number => {
  if (!report) {
    return 0;
  }
  const diff = report[1] - report[0];
  if (Math.abs(diff) > 3 || diff === 0) {
    return 0;
  }
  for (let i = 1; i < report.length - 1; i++) {
    const diff2 = report[i + 1] - report[i];
    if (Math.abs(diff2) > 3 || !sameSignal(diff, diff2)) {
      return i;
    }
  }

  return -1;
};

export const day2: Problem = async () => {
  const start = performance.now();
  const input = (await getPuzzleInput(2)).split("\n").filter(l => l !== "");

  const reports = input.map(r => r.split(" ").map(Number));
  const firstFail = reports.map(isSafe);

  let part1 = 0;
  let part2 = 0;

  for (const [index, failure] of firstFail.entries()) {
    if (failure === -1) {
      part1++;
      part2++;
      continue;
    }
    const alt1 = failure > 0 ? reports[index].toSpliced(failure - 1, 1) : undefined;
    const alt2 = reports[index].toSpliced(failure, 1);
    const alt3 = failure < reports[index].length - 1 ? reports[index].toSpliced(failure + 1, 1) : undefined;

    if (isSafe(alt1) === -1 || isSafe(alt2) === -1 || isSafe(alt3) === -1) {
      part2++;
    }
  }

  const end = performance.now();
  return { part1, part2, time: end - start };
};
