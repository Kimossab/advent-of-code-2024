import { day1 } from "./day1/day1";
import { day2 } from "./day2/day2";

export const days: Record<number, { problem: Problem; args?: any[] }> = {
  1: { problem: day1 },
  2: { problem: day2 },
};
