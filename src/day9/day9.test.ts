import {
  before,
  describe,
  it,
  mock,
} from "node:test";
import { getPuzzleInput } from "src/getPuzzleInput";
import assert from "node:assert/strict";

describe("Day 9: Disk Fragmenter", { concurrency: true }, () => {
  let day: Problem;
  const getPuzzleInputMock = mock.fn<typeof getPuzzleInput>();

  before(async () => {
    mock.module("../getPuzzleInput", {
      namedExports: {
        getPuzzleInput: getPuzzleInputMock,
      },
    });
    ({ day9: day } = await import("./day9"));
  });

  describe("Part 1", () => {
    const input = `2333133121414131402
`;
    it("should return 1928", async () => {
      getPuzzleInputMock.mock.mockImplementation(async () => input);
      const result = await day();

      assert.equal(result.part1, 1928);
    });
  });

  describe("Part 2", () => {
    const input = `2333133121414131402
`;
    it("should return 2858", async () => {
      getPuzzleInputMock.mock.mockImplementation(async () => input);
      const result = await day();

      assert.equal(result.part2, 2858);
    });
  });
});
