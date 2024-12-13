export type step = {
  from: { x: number; y: number };
  to: { x: number; y: number };
};

export type Player = { name: string; totalScore: number; steps: step[] };
