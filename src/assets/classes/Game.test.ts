import { describe, test, expect } from "vitest";
import { Game } from "./Game";
import { Playground } from "../types/Playground";

describe("Game.max", () => {
  test("Game.max should return an action for example 1", () => {
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

    expect(Game.max(1, game, 3).action).not.toBeNull();
    expect(Game.max(2, game, 3).action).not.toBeNull();
  });
  test("Game.max should return the best action example 1", () => {
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

    expect(Game.max(1, game, 1).action).toBe("Down");
    expect(Game.max(2, game, 1).action).toBe("Up");
  });

  test("Game.max should return null for terminal states", () => {
    const playground2: Playground = [
      [
        { score: 0, captured: 1 },
        { score: 1, captured: 1 },
        { score: 5, captured: 1 },
        { score: 3, captured: 1 },
      ],
      [
        { score: 4, captured: 1 },
        { score: 2, captured: 1 },
        { score: 1, captured: 1 },
        { score: 2, captured: 1 },
      ],
      [
        { score: 1, captured: 2 },
        { score: 3, captured: 2 },
        { score: 2, captured: 2 },
        { score: 5, captured: 2 },
      ],
      [
        { score: 5, captured: 2 },
        { score: 2, captured: 2 },
        { score: 1, captured: 2 },
        { score: 0, captured: 2 },
      ],
    ];

    const game = new Game(playground2, 0);

    expect(Game.max(1, game, 1).action).toBeNull();
    expect(Game.max(2, game, 1).action).toBeNull();
  });
});
