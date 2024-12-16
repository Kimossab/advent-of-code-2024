import { day1 } from "./day1/day1";
import { day10 } from "./day10/day10";
import { day11 } from "./day11/day11";
import { day12 } from "./day12/day12";
import { day13 } from "./day13/day13";
import { day14 } from "./day14/day14";
import { day15 } from "./day15/day15";
import { day16 } from "./day16/day16";
import { day2 } from "./day2/day2";
import { day3 } from "./day3/day3";
import { day4 } from "./day4/day4";
import { day5 } from "./day5/day5";
import { day6 } from "./day6/day6";
import { day7 } from "./day7/day7";
import { day8 } from "./day8/day8";
import { day9 } from "./day9/day9";

export const days: Record<number, { problem: Problem; args?: any[] }> = {
  1: { problem: day1 },
  2: { problem: day2 },
  3: { problem: day3 },
  4: { problem: day4 },
  5: { problem: day5 },
  6: { problem: day6 },
  7: { problem: day7 },
  8: { problem: day8 },
  9: { problem: day9 },
  10: { problem: day10 },
  11: { problem: day11 },
  12: { problem: day12 },
  13: { problem: day13 },
  14: { problem: day14 },
  15: { problem: day15 },
  16: { problem: day16 },
};
