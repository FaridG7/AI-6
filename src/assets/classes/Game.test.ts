import { describe, test, expect } from "vitest";
import { Game } from "./Game";
import { Playground } from "../types/Playground";

describe("Game", () => {
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
  test("calculateBestAction should work properly (1)", () => {
    const playground2: Playground = [
      [
        { score: 0, captured: 1 },
        { score: 5, captured: null },
        { score: 4, captured: null },
        { score: 3, captured: null },
      ],
      [
        { score: 0, captured: null },
        { score: 0, captured: null },
        { score: 0, captured: null },
        { score: 0, captured: null },
      ],
      [
        { score: 0, captured: null },
        { score: 0, captured: null },
        { score: 0, captured: null },
        { score: 0, captured: null },
      ],
      [
        { score: 3, captured: null },
        { score: 4, captured: null },
        { score: 5, captured: null },
        { score: 0, captured: 2 },
      ],
    ];

    const game = new Game(playground2);
    expect(game.calculateBestAction()).toBe("Right");
    game.move("Right");
    expect(game.calculateBestAction()).toBe("Left");
    game.move("Left");
    expect(game.calculateBestAction()).toBe("Right");
    game.move("Right");
    expect(game.calculateBestAction()).toBe("Left");
    game.move("Left");
    expect(game.calculateBestAction()).toBe("Right");
    game.move("Right");
    expect(game.calculateBestAction()).toBe("Left");
    game.move("Left");
  });

  test("calculateBestAction should work properly (1)", () => {
    const playground3: Playground = [
      [
        { score: 0, captured: 1 },
        { score: 0, captured: null },
        { score: 5, captured: null },
        { score: 0, captured: null },
      ],
      [
        { score: 1, captured: null },
        { score: 2, captured: null },
        { score: 3, captured: null },
        { score: 0, captured: null },
      ],
      [
        { score: 1, captured: null },
        { score: 0, captured: null },
        { score: 0, captured: null },
        { score: 0, captured: null },
      ],
      [
        { score: 3, captured: null },
        { score: 4, captured: null },
        { score: 5, captured: null },
        { score: 0, captured: 2 },
      ],
    ];

    const game = new Game(playground3);
    expect(game.calculateBestAction()).toBe("Down");
    game.move("Down");
    expect(game.calculateBestAction()).toBe("Left");
    game.move("Left");
    expect(game.calculateBestAction()).toBe("Right");
    game.move("Right");
    expect(game.calculateBestAction()).toBe("Left");
    game.move("Left");
    expect(game.calculateBestAction()).toBe("Right");
    game.move("Right");
    expect(game.calculateBestAction()).toBe("Left");
    game.move("Left");
    expect(game.calculateBestAction()).toBe("Up");
    game.move("Up");
    expect(game.calculateBestAction()).toBe("Up");
    game.move("Up");
  });
});
