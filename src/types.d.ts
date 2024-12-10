interface ProblemSolution {
  part1: number | string | undefined;
  part2: number | string | undefined;
  time: number;
}

type Problem = (...args: any[]) => Promise<ProblemSolution>;

interface Pos {
  x: number;
  y: number;
}
