import {
  before,
  describe,
  it,
  mock,
} from "node:test";
import { getPuzzleInput } from "src/getPuzzleInput";
import assert from "node:assert/strict";

describe("Day 11: Plutonian Pebbles", { concurrency: true }, () => {
  let day: Problem;
  const getPuzzleInputMock = mock.fn<typeof getPuzzleInput>();

  before(async () => {
    mock.module("../getPuzzleInput", {
      namedExports: {
        getPuzzleInput: getPuzzleInputMock,
      },
    });
    ({ day11: day } = await import("./day11"));
  });

  describe("Part 1", () => {
    const input = `125 17
`;
    it("should return 55312", async () => {
      getPuzzleInputMock.mock.mockImplementation(async () => input);
      const result = await day();

      assert.equal(result.part1, 55312);
    });
  });

  //   describe("Part 2", () => {
  //     const input = `125 17
  // `;
  //     it("should return 81", async () => {
  //       getPuzzleInputMock.mock.mockImplementation(async () => input);
  //       const result = await day();

//       assert.equal(result.part2, 81);
//     });
//   });
});
