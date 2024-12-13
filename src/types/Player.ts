import { Coordinate } from "./pleayground";

export type step = {
  from: Coordinate;
  to: Coordinate;
};

export type Player = {
  name: string;
  totalScore: number;
  steps: step[];
  startTile: Coordinate;
};
