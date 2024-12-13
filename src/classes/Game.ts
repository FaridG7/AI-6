import { Player } from "../types/Player";
import { Coordinate, Playground } from "../types/Playground";

type Action = "Right" | "Left" | "Up" | "Down";

export class Game {
  private playground: Playground;
  private player1: Player;
  private player2: Player;

  constructor(
    playground: Playground,
    player1StartingTile = { x: 0, y: 0 },
    player2StartingTile = { x: 3, y: 3 }
  ) {
    this.playground = playground;
    this.player1 = {
      name: "Player",
      totalScore: 0,
      steps: [],
      currentTile: player1StartingTile,
    };
    this.player2 = {
      name: "AI",
      totalScore: 0,
      steps: [],
      currentTile: player2StartingTile,
    };
  }

  private P1move(action: Action) {
    const to: Coordinate = this._getConsequences(this.player1.currentTile)[
      action
    ];

    if (to.x < 0 || to.y < 0 || to.x > 3 || to.y > 3)
      throw new Error("P1move: impossible action");
    else if (
      to.x === this.player2.currentTile.x &&
      to.y === this.player2.currentTile.y
    )
      throw new Error("P1move: P2 is blocking you");
    else if (
      to.x === this.player1.currentTile.x &&
      to.y === this.player1.currentTile.y
    )
      throw new Error("P1move: you can't stay still");
    else {
      this.player1.currentTile = { ...to };
    }
  }

  private P2move(action: Action) {
    const to: Coordinate = this._getConsequences(this.player2.currentTile)[
      action
    ];

    if (to.x < 0 || to.y < 0 || to.x > 3 || to.y > 3)
      throw new Error("P2move: impossible action");
    else if (
      to.x === this.player1.currentTile.x &&
      to.y === this.player1.currentTile.y
    )
      throw new Error("P2move: P1 is blocking you");
    else if (
      to.x === this.player2.currentTile.x &&
      to.y === this.player2.currentTile.y
    )
      throw new Error("P2move: you can't stay still");
    else {
      this.player2.currentTile = { ...to };
    }
  }

  private _getConsequences(from: Coordinate) {
    return {
      Right: { x: from.x + 1, y: from.y },
      Left: { x: from.x - 1, y: from.y },
      Up: { x: from.x, y: from.y - 1 },
      Down: { x: from.x, y: from.y + 1 },
    };
  }

  getPossibleActions() {
    const consequences = this._getConsequences(this.player1.currentTile);

    return ["Right", "Left", "Up", "Down"].filter(
      (action) =>
        consequences[action].x >= 0 &&
        consequences[action].x <= 3 &&
        consequences[action].y >= 0 &&
        consequences[action].y <= 3 &&
        consequences[action].x !== this.player2.currentTile.x &&
        consequences[action].y !== this.player2.currentTile.y
    );
  }

  
}
