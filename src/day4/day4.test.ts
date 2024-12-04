import {
  before,
  describe,
  it,
  mock,
} from "node:test";
import { getPuzzleInput } from "src/getPuzzleInput";
import assert from "node:assert/strict";

describe("Day 4: Ceres Search", { concurrency: true }, () => {
  let day: Problem;
  const getPuzzleInputMock = mock.fn<typeof getPuzzleInput>();

  before(async () => {
    mock.module("../getPuzzleInput", {
      namedExports: {
        getPuzzleInput: getPuzzleInputMock,
      },
    });
    ({ day4: day } = await import("./day4"));
  });

  describe("Part 1", () => {
    const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;
    it("should return 18", async () => {
      getPuzzleInputMock.mock.mockImplementation(async () => input);
      const result = await day();

      assert.equal(result.part1, 18);
    });
    it("should return 7", async () => {
      getPuzzleInputMock.mock.mockImplementation(async () => `XMASAMX
MXMASAM
ASAMXXA
SXXXXXX
AXXXXXX
MXXXXXX
XXXXXXX
`);
      const result = await day();

      assert.equal(result.part1, 7);
    });
  });

  describe("Part 2", () => {
    const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;
    it("should return 9", async () => {
      getPuzzleInputMock.mock.mockImplementation(async () => input);
      const result = await day();

      assert.equal(result.part2, 9);
    });
  });
});
