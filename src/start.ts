import "dotenv/config";
import { days } from "./days";

const main = async () => {
  for (const indx in days) {
    const day = days[indx];

    const { part1, part2, time } = await day.problem(day.args);

    console.log(`Day ${indx}: Part 1 (${part1}) | Part 2 (${part2}) | ${time}ms`);
  }
};

main();
