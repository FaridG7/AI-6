import { Coordinate } from "./Playground";

export type step = {
  from: Coordinate;
  to: Coordinate;
};

export type Player = {
  name: string;
  score: number;
  steps: step[];
  currentTile: Coordinate;
};
