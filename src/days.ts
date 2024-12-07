import { day1 } from "./day1/day1";
import { day2 } from "./day2/day2";
import { day3 } from "./day3/day3";
import { day4 } from "./day4/day4";
import { day5 } from "./day5/day5";
import { day6 } from "./day6/day6";
import { day7 } from "./day7/day7";

export const days: Record<number, { problem: Problem; args?: any[] }> = {
  1: { problem: day1 },
  2: { problem: day2 },
  3: { problem: day3 },
  4: { problem: day4 },
  5: { problem: day5 },
  6: { problem: day6 },
  7: { problem: day7 },
};
