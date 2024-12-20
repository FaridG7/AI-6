import { Player } from "../types/Player";
import { Coordinate, Playground } from "../types/Playground";

export type Action = "Right" | "Left" | "Up" | "Down";
export type State = {
  player1: Player;
  player2: Player;
  playground: Playground;
  possibleActions: Action[];
};

export class Game {
  private playground: Playground;
  private uncapturedTiles: number;
  private player1: Player;
  private player2: Player;

  constructor(
    playground: Playground,
    uncapturedTiles: number = 14,
    player1: Player = {
      name: "Player",
      score: 0,
      steps: [],
      currentTile: { x: 0, y: 0 },
    },
    player2: Player = {
      name: "AI",
      score: 0,
      steps: [],
      currentTile: { x: 3, y: 3 },
    }
  ) {
    this.playground = playground;
    this.uncapturedTiles = uncapturedTiles;
    this.player1 = player1;
    this.player2 = player2;
  }

  copy() {
    return new Game(
      this.playground.map((row) =>
        row.map((tile) => {
          return { ...tile };
        })
      ),
      this.uncapturedTiles,
      { ...this.player1 },
      { ...this.player2 }
    );
  }

  private move(playerNumber: 1 | 2, action: Action): void {
    const player = playerNumber === 1 ? this.player1 : this.player2;
    const rival = playerNumber === 1 ? this.player2 : this.player1;

    const to: Coordinate = this.getConsequences(player.currentTile)[action];

    if (to.x < 0 || to.y < 0 || to.x > 3 || to.y > 3)
      throw new Error("P1move: impossible action");
    else if (to.x === rival.currentTile.x && to.y === rival.currentTile.y)
      throw new Error("P1move: P2 is blocking you");
    else if (to.x === player.currentTile.x && to.y === player.currentTile.y)
      throw new Error("P1move: you can't stay still");
    else {
      player.steps.push({ from: player.currentTile, to: to });
      player.currentTile = { ...to };
      if (!this.playground[to.y][to.x].captured) {
        player.score += this.playground[to.y][to.x].score;
        this.playground[to.y][to.x].captured = playerNumber;
        this.uncapturedTiles--;
      }
    }
  }

  private getConsequences(from: Coordinate) {
    return {
      Right: { x: from.x + 1, y: from.y },
      Left: { x: from.x - 1, y: from.y },
      Up: { x: from.x, y: from.y - 1 },
      Down: { x: from.x, y: from.y + 1 },
    };
  }

  getPossibleActions(playerNumber: 1 | 2 = 1): Action[] {
    const player = playerNumber === 1 ? this.player1 : this.player2;
    const rival = playerNumber === 1 ? this.player2 : this.player1;

    if (this.isTerminal()) return [];

    const consequenceTiles = this.getConsequences(player.currentTile);

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

  private calculateBestAction(player: 1 | 2): Action | null {
    return Game.max(player, this, 3).action;
  }

  // private static max(
  static max(
    player: 1 | 2,
    state: Game,
    depthLimit: number
    // alpha: number | "minusInfinit" = "minusInfinit",
    // beta: number | "plusInfinit" = "plusInfinit"
  ): { action: Action | null; value: number } {
    if (state.isTerminal())
      return {
        action: null,
        value: state[`player${player}`].score,
      };

    if (depthLimit < 0) {
      let extraPoints = 0;
      if (
        state[`player${player}`].currentTile.x === 1 ||
        state[`player${player}`].currentTile.x === 2
      )
        extraPoints += 0.25;
      if (
        state[`player${player}`].currentTile.y === 1 ||
        state[`player${player}`].currentTile.y === 2
      )
        extraPoints += 0.25;
      return {
        action: null,
        value: state[`player${player}`].score + extraPoints,
      };
    }

    const possibleActions = state.getPossibleActions(player);

    const branches = possibleActions.map((possibleAction) => {
      const tempState = state.copy();
      tempState.move(player, possibleAction);
      return Game.min(player, tempState, depthLimit - 1);
    });

    return branches.reduce((pre, cur) => (pre.value > cur.value ? pre : cur));
  }

  private static min(
    player: 1 | 2,
    state: Game,
    depthLimit: number
    // alpha: number | "minusInfinit" = "minusInfinit",
    // beta: number | "plusInfinit" = "plusInfinit"
  ): { action: Action | null; value: number } {
    if (state.isTerminal())
      return {
        action: null,
        value: state[`player${player}`].score,
      };

    if (depthLimit < 0) {
      let deducedPoints = 0;
      if (
        state[`player${player}`].currentTile.x === 1 ||
        state[`player${player}`].currentTile.x === 2
      )
        deducedPoints += 0.25;
      if (
        state[`player${player}`].currentTile.y === 1 ||
        state[`player${player}`].currentTile.y === 2
      )
        deducedPoints += 0.25;
      return {
        action: null,
        value: state[`player${player}`].score - deducedPoints,
      };
    }

    const possibleActions = state.getPossibleActions(player);

    const branches = possibleActions.map((possibleAction) => {
      const tempState = state.copy();
      tempState.move(player, possibleAction);
      return Game.max(player, tempState, depthLimit - 1);
    });

    return branches.reduce((pre, cur) => (pre.value < cur.value ? pre : cur));
  }

  performAction(action: Action) {
    if (this.isTerminal()) {
      throw new Error(
        "performAction: trying to perform an action while the game is finished"
      );
    }
    this.move(1, action);
    const bestP2Action = this.calculateBestAction(2);
    if (bestP2Action) this.move(2, bestP2Action);
  }
  getState(): State {
    return {
      player1: this.player1,
      player2: this.player2,
      playground: this.playground,
      possibleActions: this.getPossibleActions(),
    };
  }
  isFinished() {
    return this.isTerminal();
  }
}
