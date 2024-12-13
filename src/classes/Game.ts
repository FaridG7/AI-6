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
      score: 0,
      steps: [],
      currentTile: player1StartingTile,
    };
    this.player2 = {
      name: "AI",
      score: 0,
      steps: [],
      currentTile: player2StartingTile,
    };
  }

  private move(playerNumber: 1 | 2, action: Action): void {
    const player = playerNumber === 1 ? this.player1 : this.player2;
    const rival = playerNumber === 1 ? this.player2 : this.player1;

    const to: Coordinate = this._getConsequences(player.currentTile)[action];

    if (to.x < 0 || to.y < 0 || to.x > 3 || to.y > 3)
      throw new Error("P1move: impossible action");
    else if (to.x === rival.currentTile.x && to.y === rival.currentTile.y)
      throw new Error("P1move: P2 is blocking you");
    else if (to.x === player.currentTile.x && to.y === player.currentTile.y)
      throw new Error("P1move: you can't stay still");
    else {
      player.steps.push({ from: player.currentTile, to: to });
      player.currentTile = { ...to };
      if (!this.playground[to.x][to.y].captured) {
        player.score += this.playground[to.x][to.y].score;
        this.playground[to.x][to.y].captured = true;
      }
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

  performAction(action: Action) {
    this.move(1,action);
  }
}
