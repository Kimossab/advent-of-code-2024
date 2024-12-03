import { day1 } from "./day1/day1";
import { day2 } from "./day2/day2";
import { day3 } from "./day3/day3";

export const days: Record<number, { problem: Problem; args?: any[] }> = {
  1: { problem: day1 },
  2: { problem: day2 },
  3: { problem: day3 },
};
