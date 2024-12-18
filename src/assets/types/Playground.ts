export type Coordinate = { x: number; y: number };

export type Tile = { score: number; captured: 1 | 2 | null };

export type Playground = Tile[][];
