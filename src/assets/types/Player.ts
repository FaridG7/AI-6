import { Action } from "../classes/Game";
import { Coordinate } from "./Playground";


export type Player = {
  name: string;
  score: number;
  steps: Action[];
  currentTile: Coordinate;
};
