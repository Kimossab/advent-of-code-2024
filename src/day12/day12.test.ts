import {
  before,
  describe,
  it,
  mock,
} from "node:test";
import { getPuzzleInput } from "src/getPuzzleInput";
import assert from "node:assert/strict";

describe("Day 12: Garden Groups", { concurrency: true }, () => {
  let day: Problem;
  const getPuzzleInputMock = mock.fn<typeof getPuzzleInput>();

  before(async () => {
    mock.module("../getPuzzleInput", {
      namedExports: {
        getPuzzleInput: getPuzzleInputMock,
      },
    });
    ({ day12: day } = await import("./day12"));
  });

  describe("Part 1", () => {
    const input = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
`;
    it("should return 1930", async () => {
      getPuzzleInputMock.mock.mockImplementation(async () => input);
      const result = await day();

      assert.equal(result.part1, 1930);
    });
  });

  describe("Part 2", () => {
    it("should return 80", async () => {
      const input = `AAAA
BBCD
BBCC
EEEC
`;
      getPuzzleInputMock.mock.mockImplementation(async () => input);
      const result = await day();

      assert.equal(result.part2, 80);
    });
    it("should return 436", async () => {
      const input = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO
`;
      getPuzzleInputMock.mock.mockImplementation(async () => input);
      const result = await day();

      assert.equal(result.part2, 436);
    });
    it("should return 368", async () => {
      const input = `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA
`;
      getPuzzleInputMock.mock.mockImplementation(async () => input);
      const result = await day();

      assert.equal(result.part2, 368);
    });
    it("should return 1206", async () => {
      const input = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
`;
      getPuzzleInputMock.mock.mockImplementation(async () => input);
      const result = await day();

      assert.equal(result.part2, 1206);
    });
  });
});
