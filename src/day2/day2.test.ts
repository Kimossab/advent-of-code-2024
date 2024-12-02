import {
  before,
  describe,
  it,
  mock,
} from "node:test";
import assert from "node:assert/strict";

describe("Day 2: Red-Nosed Reports", { concurrency: true }, () => {
  let day: Problem;
  const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

  before(async () => {
    mock.module("../getPuzzleInput", {
      namedExports: {
        getPuzzleInput: async () => input,
      },
    });
    ({ day2: day } = await import("./day2"));
  });

  describe("Part 1", () => {
    it("should return 2", async () => {
      const result = await day();

      assert.equal(result.part1, 2);
    });
  });

  describe("Part 2", () => {
    it("should return 4", async () => {
      const result = await day();

      assert.equal(result.part2, 4);
    });
  });
});
