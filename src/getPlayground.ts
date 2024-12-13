import { Playground } from "./types/pleayground";

const testPlayground: Playground = [
  [
    { score: 0, captured: false },
    { score: 1, captured: false },
    { score: 5, captured: false },
    { score: 3, captured: false },
  ],
  [
    { score: 4, captured: false },
    { score: 2, captured: false },
    { score: 1, captured: false },
    { score: 2, captured: false },
  ],
  [
    { score: 1, captured: false },
    { score: 3, captured: false },
    { score: 2, captured: false },
    { score: 5, captured: false },
  ],
  [
    { score: 5, captured: false },
    { score: 2, captured: false },
    { score: 1, captured: false },
    { score: 0, captured: false },
  ],
];

export function getPlayground(): Playground {
  return testPlayground;
}