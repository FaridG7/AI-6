import { FC } from "react";
import { Playground } from "./assets/types/Playground";

const GetPlayGround: FC<{
  playground: Playground;
  setPlayground: React.Dispatch<React.SetStateAction<Playground>>;
  setIsSet: React.Dispatch<React.SetStateAction<boolean>>;
  difficulty: "Dumb" | "Average" | "Smart";
  setDifficulty: React.Dispatch<
    React.SetStateAction<"Dumb" | "Average" | "Smart">
  >;
}> = ({ playground, setPlayground, setIsSet, difficulty, setDifficulty }) => {
  return (
    <>
      <h1 className="bg-red-700 text-center text-4xl py-3">
        Set The PlayGround
      </h1>
      <div
        id="board"
        className="flex flex-col items-center justify-center w-full h-full p-10"
      >
        <table className="border border-separate border-slate-200 text-3xl">
          <tbody>
            {playground.map((row, y) => {
              return (
                <tr key={y}>
                  {row.map((tile, x) => {
                    return (
                      <td
                        className={`w-20 h-20 text-center ${
                          tile.captured === 1
                            ? "bg-orange-600"
                            : tile.captured === 2
                            ? "bg-blue-600"
                            : null
                        }`}
                        key={`${x}${y}`}
                      >
                        {y === 0 && x === 0 ? (
                          "P"
                        ) : y === 3 && x === 3 ? (
                          "AI"
                        ) : (
                          <input
                            className="bg-transparent w-20 h-20 text-center"
                            type="number"
                            value={tile.score}
                            onChange={(e) => {
                              setPlayground((previousState) => {
                                const temp = previousState.map((row) =>
                                  row.map((tile) => ({ ...tile }))
                                );
                                temp[y][x].score = Number(e.target.value);
                                return temp;
                              });
                            }}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div id="difficulty" className="p-6">
          <h3 className="text-center text-3xl py-3">AI's IQ: </h3>
          <button
            disabled={difficulty === "Dumb"}
            onClick={() => {
              setDifficulty("Dumb");
            }}
            className="bg-red-600 hover:bg-red-800 disabled:bg-gray-700 p-5 m-10 text-xl"
          >
            Dumb
          </button>
          <button
            disabled={difficulty === "Average"}
            onClick={() => {
              setDifficulty("Average");
            }}
            className="bg-red-600 hover:bg-red-800 disabled:bg-gray-700 p-5 m-10 text-xl"
          >
            Average
          </button>
          <button
            disabled={difficulty === "Smart"}
            onClick={() => {
              setDifficulty("Smart");
            }}
            className="bg-red-600 hover:bg-red-800 disabled:bg-gray-700 p-5 m-10 text-xl"
          >
            Smart
          </button>
        </div>
        <button
          className="bg-red-600 text-3xl p-5 m-16"
          onClick={() => {
            setPlayground(
              playground.map((row) =>
                row.map((tile) => ({
                  ...tile,
                  score: Math.floor(Math.random() * 9 + 1),
                }))
              )
            );
            setIsSet(true);
          }}
        >
          Set Random
        </button>
        <button
          className="bg-red-600 text-3xl p-5"
          onClick={() => setIsSet(true)}
        >
          Got it
        </button>
      </div>
    </>
  );
};

export default GetPlayGround;
