import { FC, useRef, useState } from "react";
import { Action, Game, State } from "./assets/classes/Game";
import { getPlayground } from "./getPlayground";

const App: FC = () => {
  const { current: game } = useRef(new Game(getPlayground()));
  const [{ player1, player2, playground, possibleActions }, setState] =
    useState<State>(game.getState());

  const act = (action: Action) => {
    game.performAction(action);
    return game.getState();
  };

  const scoreboard = (
    <div id="scoreboard" className="my-10">
      <span className="text-center block text-xl m-3">
        {player1.name}: {player1.score}
      </span>
      <span className="text-center block text-xl m-3">
        {player2.name}: {player2.score}
      </span>
    </div>
  );

  const board = (
    <table className="border border-separate border-slate-200 text-3xl">
      <tbody>
        {playground.map((row, y) => {
          return (
            <tr key={y}>
              {row.map((tile, x) => {
                return (
                  <td
                    className={` w-20 h-20 text-center ${
                      tile.captured === 1
                        ? "bg-orange-600"
                        : tile.captured === 2
                        ? "bg-blue-600"
                        : null
                    }`}
                    key={`${x}${y}`}
                  >
                    {tile.captured == null
                      ? tile.score
                      : x === player1.currentTile.x &&
                        y === player1.currentTile.y
                      ? "P"
                      : x === player2.currentTile.x &&
                        y === player2.currentTile.y
                      ? "AI"
                      : null}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  if (game.isFinished() && player1.score > player2.score)
    return (
      <div className="w-screen h-screen bg-green-700 flex-col flex items-center justify-center">
        <h1 className="text-9xl mb-24">Congratulations! You Win</h1>
        {board}
        {scoreboard}
      </div>
    );

  if (game.isFinished() && player1.score < player2.score)
    return (
      <div className="w-screen h-screen bg-red-700 flex flex-col items-center justify-center">
        <h1 className="text-9xl mb-24">Too Bad! You Lose</h1>
        {board}
        {scoreboard}
      </div>
    );

  if (game.isFinished() && player1.score === player2.score)
    return (
      <div className="w-screen h-screen bg-gray-600 flex flex-col items-center justify-center">
        <h1 className="text-9xl mb-24">It's a Tie!</h1>
        {board}
        {scoreboard}
      </div>
    );

  return (
    <>
      <h1 className="bg-red-700 text-center text-4xl py-3">Beat the AI</h1>
      {scoreboard}
      <div id="board" className="flex items-center justify-center">
        {board}
      </div>
      <div
        id="controller"
        className="grid grid-cols-9 grid-rows-3 gap-2 p-10  place-items-center mt-10"
      >
        {/* Up Button */}
        <button
          disabled={!possibleActions.includes("Up")}
          className="bg-red-600 hover:bg-red-800 disabled:bg-gray-700 row-start-1 col-start-5 text-center w-24 h-24 rounded-full flex items-center justify-center"
          onClick={() => setState(act("Up"))}
        >
          <span className="text-7xl">&#8593;</span>
        </button>

        {/* Left Button */}
        <button
          disabled={!possibleActions.includes("Left")}
          className="bg-red-600 hover:bg-red-800 disabled:bg-gray-700 row-start-2 col-start-4 text-center w-24 h-24 rounded-full flex items-center justify-center"
          onClick={() => setState(act("Left"))}
        >
          <span className="text-7xl pb-4">&#8592;</span>
        </button>

        {/* Right Button */}
        <button
          disabled={!possibleActions.includes("Right")}
          className="bg-red-600 hover:bg-red-800 disabled:bg-gray-700 row-start-2 col-start-6 text-center w-24 h-24 rounded-full flex items-center justify-center"
          onClick={() => setState(act("Right"))}
        >
          <span className="text-7xl pb-4">&#8594;</span>
        </button>

        {/* Down Button */}
        <button
          disabled={!possibleActions.includes("Down")}
          className="bg-red-600 hover:bg-red-800 disabled:bg-gray-700 row-start-3 col-start-5 text-center w-24 h-24 rounded-full flex items-center justify-center"
          onClick={() => setState(act("Down"))}
        >
          <span className="text-7xl">&#8595;</span>
        </button>
      </div>
    </>
  );
};

export default App;
