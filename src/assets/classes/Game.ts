import { Player } from "../types/Player";
import { Playground } from "../types/Playground";

export type Action = "Right" | "Left" | "Up" | "Down";
export type State = {
  player1: Player;
  player2: Player;
  turn: 1 | 2;
  playground: Playground;
  possibleActions: Action[];
};

export class Game {
  private playground: Playground;
  private uncapturedTiles: number;
  private player1: Player;
  private player2: Player;
  private turn: 1 | 2;
  private depthLimit: number;

  constructor(
    playground: Playground,
    depthLimit: number = 14,
    uncapturedTiles: number = 14,
    player1: Player = {
      score: 0,
      currentTile: { x: 0, y: 0 },
    },
    player2: Player = {
      score: 0,
      currentTile: { x: 3, y: 3 },
    },
    turn: 1 | 2 = 1
  ) {
    this.playground = playground;
    this.uncapturedTiles = uncapturedTiles;
    this.player1 = player1;
    this.player2 = player2;
    this.turn = turn;
    this.depthLimit = depthLimit;
  }

  getPlayer1() {
    return this.player1;
  }

  getPlayer2() {
    return this.player2;
  }

  getTurn() {
    return this.turn;
  }

  getThis() {
    return this;
  }

  move(action: Action, debug: boolean = false): void {
    if (debug) console.log("*");
    const player = this.turn === 1 ? this.player1 : this.player2;

    const to = {
      Right: { x: player.currentTile.x + 1, y: player.currentTile.y },
      Left: { x: player.currentTile.x - 1, y: player.currentTile.y },
      Up: { x: player.currentTile.x, y: player.currentTile.y - 1 },
      Down: { x: player.currentTile.x, y: player.currentTile.y + 1 },
    }[action];

    if (this.getPossibleActions().includes(action)) {
      player.currentTile = { ...to };
      if (!this.playground[to.y][to.x].captured) {
        player.score += this.playground[to.y][to.x].score;
        this.playground[to.y][to.x].captured = this.turn;
        this.uncapturedTiles--;
      }
      this.turn = this.turn === 1 ? 2 : 1;
    } else {
      throw new Error("move: impossible action requested");
    }
  }

  getChilds() {
    const possibleActions = this.getPossibleActions();

    return possibleActions.map((action) => {
      const child = new Game(
        this.playground.map((row) =>
          row.map((tile) => {
            return { ...tile };
          })
        ),
        this.depthLimit,
        this.uncapturedTiles,
        { ...this.player1 },
        { ...this.player2 },
        this.turn
      );

      child.move(action);

      return { action, child };
    });
  }

  getPossibleActions(): Action[] {
    const player = this.turn === 1 ? this.player1 : this.player2;
    const rival = this.turn === 1 ? this.player2 : this.player1;

    if (this.isTerminal()) return [];

    const consequenceTiles = {
      Right: { x: player.currentTile.x + 1, y: player.currentTile.y },
      Left: { x: player.currentTile.x - 1, y: player.currentTile.y },
      Up: { x: player.currentTile.x, y: player.currentTile.y - 1 },
      Down: { x: player.currentTile.x, y: player.currentTile.y + 1 },
    };

    const allActions: Action[] = ["Right", "Left", "Up", "Down"];
    return allActions.filter((action) => {
      if (
        consequenceTiles[action].x < 0 ||
        consequenceTiles[action].x > 3 ||
        consequenceTiles[action].y < 0 ||
        consequenceTiles[action].y > 3
      ) {
        return false;
      } else if (
        consequenceTiles[action].x === rival.currentTile.x &&
        consequenceTiles[action].y === rival.currentTile.y
      )
        return false;
      else return true;
    });
  }

  private isTerminal(): boolean {
    return this.uncapturedTiles === 0;
  }

  static minmax(
    playerNumber: 1 | 2,
    node: Game,
    isMaximizingPlayer: boolean,
    depthLimit: number,
    alpha: number,
    beta: number
  ): number {
    const player = playerNumber === 1 ? node.getPlayer1() : node.getPlayer2();
    const rival = playerNumber === 1 ? node.getPlayer2() : node.getPlayer1();

    if (node.isTerminal()) return player.score - rival.score;

    if (depthLimit < 0) {
      let heuristicValue = 0;
      if (player.currentTile.x === 1 || player.currentTile.x === 2)
        heuristicValue += isMaximizingPlayer ? 0.25 : -0.25;
      if (player.currentTile.y === 1 || player.currentTile.y === 2)
        heuristicValue += isMaximizingPlayer ? 0.25 : -0.25;

      return player.score - rival.score + heuristicValue;
    }

    if (isMaximizingPlayer) {
      let bestValue: number = Number.NEGATIVE_INFINITY;
      for (const { child } of node.getChilds()) {
        const value = Game.minmax(
          playerNumber,
          child,
          false,
          depthLimit - 1,
          alpha,
          beta
        );
        bestValue = Math.max(value, bestValue);
        alpha = Math.max(alpha, bestValue);
        if (beta <= bestValue) break;
      }
      return bestValue;
    } else {
      let bestValue: number = Number.POSITIVE_INFINITY;
      for (const { child } of node.getChilds()) {
        const value = Game.minmax(
          playerNumber,
          child,
          true,
          depthLimit - 1,
          alpha,
          beta
        );
        bestValue = Math.min(value, bestValue);
        beta = Math.min(beta, bestValue);
        if (bestValue <= alpha) break;
      }
      return bestValue;
    }
  }

  calculateBestAction(): Action | null {
    if (this.isTerminal()) return null;

    return this.getChilds()
      .map(({ action, child }) => {
        return {
          action: action,
          value: Game.minmax(
            this.turn,
            child,
            false,
            this.depthLimit,
            Number.NEGATIVE_INFINITY,
            Number.POSITIVE_INFINITY
          ),
        };
      })
      .reduce((pre, cur) => (pre.value < cur.value ? cur : pre)).action;
  }

  getState(): State {
    return {
      player1: this.player1,
      player2: this.player2,
      turn: this.turn,
      playground: this.playground,
      possibleActions: this.getPossibleActions(),
    };
  }

  isFinished() {
    return this.isTerminal();
  }
}
