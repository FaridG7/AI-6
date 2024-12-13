import { Player } from "../types/Player";
import { Playground } from "../types/Playground";

export class Game {
  platground: Playground;
  player1: Player;
  player2: Player;

  constructor(
    playground: Playground,
    player1StartingTile = { x: 0, y: 0 },
    player2StartingTile = { x: 3, y: 3 }
  ) {
    this.platground = playground;
    this.player1 = {
      name: "Player 1",
      totalScore: 0,
      steps: [],
      currentTile: player1StartingTile,
    };
    this.player2 = {
      name: "Player 2",
      totalScore: 0,
      steps: [],
      currentTile: player2StartingTile,
    };
  }
}
