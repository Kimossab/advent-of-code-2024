import {
  before,
  describe,
  it,
  mock,
} from "node:test";
import { getPuzzleInput } from "src/getPuzzleInput";
import assert from "node:assert/strict";

describe("Day 13: Claw Contraption", { concurrency: true }, () => {
  let day: Problem;
  const getPuzzleInputMock = mock.fn<typeof getPuzzleInput>();

  before(async () => {
    mock.module("../getPuzzleInput", {
      namedExports: {
        getPuzzleInput: getPuzzleInputMock,
      },
    });
    ({ day13: day } = await import("./day13"));
  });

  describe("Part 1", () => {
    const input = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
`;
    it("should return 480", async () => {
      getPuzzleInputMock.mock.mockImplementation(async () => input);
      const result = await day();

      assert.equal(result.part1, "480");
    });
  });

  describe("Part 2", () => {
    const input = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
`;

    it("should return 875318608908", async () => {
      getPuzzleInputMock.mock.mockImplementation(async () => input);
      const result = await day();

      assert.equal(result.part2, "875318608908");
    });
  });
});
