import { Playground } from "./assets/types/Playground";

const testPlayground: Playground = [
  [
    { score: 0, captured: 1 },
    { score: 1, captured: null },
    { score: 5, captured: null },
    { score: 3, captured: null },
  ],
  [
    { score: 4, captured: null },
    { score: 2, captured: null },
    { score: 1, captured: null },
    { score: 2, captured: null },
  ],
  [
    { score: 1, captured: null },
    { score: 3, captured: null },
    { score: 2, captured: null },
    { score: 5, captured: null },
  ],
  [
    { score: 5, captured: null },
    { score: 2, captured: null },
    { score: 1, captured: null },
    { score: 0, captured: 2 },
  ],
];

export function getPlayground(): Playground {
  return testPlayground;
}
