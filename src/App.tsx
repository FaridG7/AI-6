import { FC, useRef, useState } from "react";
import { Game, State } from "./assets/classes/Game";
import { getPlayground } from "./getPlayground";

const App: FC = () => {
  const { current: game } = useRef(new Game(getPlayground()));
  const [{ player1, player2, playground, possibleActions }, setState] =
    useState<State>(game.getState());
  return (
    <>
      <h1 className="">Title</h1>
      <div id="scoreboard">
        <span>
          {player1.name}: {player1.score}
        </span>
        <span>
          {player2.name}: {player2.score}
        </span>
      </div>
      <div id="board">
        <table>
          {playground.map((row) => {
            return (
              <tr>
                {row.map((tile) => (
                  <td className="">
                    {tile.captured == null ? tile.score : null}
                  </td>
                ))}
              </tr>
            );
          })}
        </table>
      </div>
      <div id="controller">
        <button disabled={!possibleActions.includes("Up")}>
          <span className="text-xl text-red-500">&#8593;</span>
          {/*Up*/}
        </button>
        <button disabled={!possibleActions.includes("Left")}>
          <span className="text-xl text-blue-500">&#8592;</span>
          {/*Left*/}
        </button>
        <button disabled={!possibleActions.includes("Right")}>
          <span className="text-xl text-green-500">&#8594;</span>
          {/*Right*/}
        </button>
        <button disabled={!possibleActions.includes("Down")}>
          <span className="text-xl text-yellow-500">&#8595;</span>
          {/*Down*/}
        </button>
      </div>
    </>
  );
};

export default App;
