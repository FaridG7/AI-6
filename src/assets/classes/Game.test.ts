import { describe, test, expect } from "vitest";
import { Game } from "./Game";
import { Playground } from "../types/Playground";

describe("Game.constructor", () => {
  test("should initialize with the correct properties", () => {
    const playground1: Playground = [
      [
        { score: 0, captured: 1 },
        { score: 1, captured: null },
        { score: 5, captured: null },
        { score: 3, captured: null },
      ],
      [
        { score: 4, captured: null },
        { score: 2, captured: null },
        { score: 1, captured: null },
        { score: 2, captured: null },
      ],
      [
        { score: 1, captured: null },
        { score: 3, captured: null },
        { score: 2, captured: null },
        { score: 5, captured: null },
      ],
      [
        { score: 5, captured: null },
        { score: 2, captured: null },
        { score: 1, captured: null },
        { score: 0, captured: 2 },
      ],
    ];

    const game = new Game(playground1);

    expect(game.getPlayer1().score).toBe(0);
    expect(game.getPlayer2().score).toBe(0);
    expect(game.getPossibleActions()).toBe(["Right", "Down"]);
  });
});
