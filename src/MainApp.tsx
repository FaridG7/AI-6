import { FC, useRef, useState } from "react";
import { Action, Game, State } from "./assets/classes/Game";
import { Playground } from "./assets/types/Playground";

const winMessages = [
  "Congratulations! You Win",
  "How Dare You Beat My AI?!",
  "You Got Me!",
  "Well Done",
  "Say Congrats to AI Bully",
  "AI: この敗北を復讐するつもりだ",
  "Let Me Guess, You Tried This 100 Times",
  "Easy Huh? Why Don't You Play Sekiro",
  "GG",
];
const loseMessages = [
  "Guess What, You Lose",
  "Aww, You lost",
  "Huh, My AI is Smarter!",
  "My AI is Just Better!",
  "You Lost, Please Don't Cry",
  "You Lost, as Usual",
  "You Lost, Just Like You Do in Life",
  "You Lost, Just Like in Real Life",
  "Try Harder Next Time",
  "AI: This was easy, I might tust try world dominance",
  "AI: EZ",
  "Nice Try",
];
const tieMessages = [
  "It's a Tie",
  "Does This Mean thatYou're Just as Good as My AI?",
  "Congratulations! You're as Smart as an AI",
  "GG",
];
const MainApp: FC<{
  playground: Playground;
  difficulty: "Dumb" | "Average" | "Smart";
}> = ({ playground, difficulty }) => {
  const { current: game } = useRef(
    new Game(
      playground,
      difficulty === "Dumb" ? 4 : difficulty === "Average" ? 8 : 14
    )
  );
  const [
    { player1, player2, turn, playground: state, possibleActions },
    setState,
  ] = useState<State>(game.getState());

  const handleP1Action = (action: Action) => {
    game.move(action, true);
    setState(() => {
      return game.getState();
    });
    handleAIAction();
  };

  const handleAIAction = () => {
    const bestAIAction = game.calculateBestAction();
    if (bestAIAction) game.move(bestAIAction, true);
    setState(() => {
      return game.getState();
    });
  };

  const scoreboard = (
    <div id="scoreboard" className="my-10">
      <span className="text-center block text-xl m-3">
        Player: {player1.score}
      </span>
      <span className="text-center block text-xl m-3">AI: {player2.score}</span>
    </div>
  );

  const board = (
    <table className="border border-separate border-slate-200 text-3xl">
      <tbody>
        {state.map((row, y) => {
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
        <h1 className="text-9xl mb-24 text-center">
          {winMessages[Math.floor(Math.random() * winMessages.length)]}
        </h1>
        {board}
        {scoreboard}
      </div>
    );

  if (game.isFinished() && player1.score < player2.score)
    return (
      <div className="w-screen h-screen bg-red-700 flex flex-col items-center justify-center">
        <h1 className="text-9xl mb-24 text-center">
          {loseMessages[Math.floor(Math.random() * loseMessages.length)]}
        </h1>
        {board}
        {scoreboard}
      </div>
    );

  if (game.isFinished() && player1.score === player2.score)
    return (
      <div className="w-screen h-screen bg-gray-600 flex flex-col items-center justify-center">
        <h1 className="text-9xl mb-24 text-center">
          {tieMessages[Math.floor(Math.random() * tieMessages.length)]}
        </h1>
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
        id="helpSection"
        className="flex flex-row justify-center items-center p-10"
      >
        {turn === 1 || (
          <div className="w-16 h-16 border-8 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>
      <div
        id="controller"
        className="grid grid-cols-9 grid-rows-3 gap-2 p-10 place-items-center"
      >
        {/* Up Button */}
        <button
          disabled={!possibleActions.includes("Up")}
          className="bg-red-600 hover:bg-red-800 disabled:bg-gray-700 row-start-1 col-start-5 text-center w-24 h-24 rounded-full flex items-center justify-center"
          onClick={() => handleP1Action("Up")}
        >
          <span className="text-7xl">&#8593;</span>
        </button>

        {/* Left Button */}
        <button
          disabled={!possibleActions.includes("Left")}
          className="bg-red-600 hover:bg-red-800 disabled:bg-gray-700 row-start-2 col-start-4 text-center w-24 h-24 rounded-full flex items-center justify-center"
          onClick={() => handleP1Action("Left")}
        >
          <span className="text-7xl pb-4">&#8592;</span>
        </button>

        {/* Right Button */}
        <button
          disabled={!possibleActions.includes("Right")}
          className="bg-red-600 hover:bg-red-800 disabled:bg-gray-700 row-start-2 col-start-6 text-center w-24 h-24 rounded-full flex items-center justify-center"
          onClick={() => handleP1Action("Right")}
        >
          <span className="text-7xl pb-4">&#8594;</span>
        </button>

        {/* Down Button */}
        <button
          disabled={!possibleActions.includes("Down")}
          className="bg-red-600 hover:bg-red-800 disabled:bg-gray-700 row-start-3 col-start-5 text-center w-24 h-24 rounded-full flex items-center justify-center"
          onClick={() => handleP1Action("Down")}
        >
          <span className="text-7xl">&#8595;</span>
        </button>
      </div>
    </>
  );
};

export default MainApp;
