import { Player } from "../types/Player";
import { Playground } from "../types/pleayground";

export class Game {
  platground: Playground;
  player1: Player;
  player2: Player;
  
  constructor(playground: Playground) {
    this.platground = playground;
    this.player1 = {
      name: "Player 1",
      totalScore: 0,
      steps: [],
      startTile: { x: 0, y: 0 },
    };
    this.player2 = {
      name: "Player 2",
      totalScore: 0,
      steps: [],
      startTile: { x: 3, y: 3 },
    };
  }

}
