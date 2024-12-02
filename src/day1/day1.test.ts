import {
  before,
  describe,
  it,
  mock,
} from "node:test";
import assert from "node:assert/strict";

describe("Day 1: Historian Hysteria", () => {
  let day: Problem;
  const input = `3   4
4   3
2   5
1   3
3   9
3   3
`;

  before(async () => {
    mock.module("../getPuzzleInput", {
      namedExports: {
        getPuzzleInput: async () => input,
      },
    });
    ({ day1: day } = await import("./day1"));
  });

  describe("Part 1", () => {
    it("should return 11", async () => {
      const result = await day();
      assert.equal(result.part1, 11);
    });
  });

  describe("Part 2", () => {
    it("should return 31", async () => {
      const result = await day();
      assert.equal(result.part2, 31);
    });
  });
});
