import {
  before,
  describe,
  it,
  mock,
} from "node:test";
import { getPuzzleInput } from "src/getPuzzleInput";
import assert from "node:assert/strict";

describe("Day 10: Hoof It", { concurrency: true }, () => {
  let day: Problem;
  const getPuzzleInputMock = mock.fn<typeof getPuzzleInput>();

  before(async () => {
    mock.module("../getPuzzleInput", {
      namedExports: {
        getPuzzleInput: getPuzzleInputMock,
      },
    });
    ({ day10: day } = await import("./day10"));
  });

  describe("Part 1", () => {
    const input = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`;
    it("should return 36", async () => {
      getPuzzleInputMock.mock.mockImplementation(async () => input);
      const result = await day();

      assert.equal(result.part1, 36);
    });
  });

  describe("Part 2", () => {
    const input = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`;
    it("should return 81", async () => {
      getPuzzleInputMock.mock.mockImplementation(async () => input);
      const result = await day();

      assert.equal(result.part2, 81);
    });
  });
});
