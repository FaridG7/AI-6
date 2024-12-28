import { FC, useState } from "react";
import { Playground } from "./assets/types/Playground";
import { defaultPlayground } from "./assets/defaultPlayground";
import GetPlayGround from "./GetPlayground";
import MainApp from "./MainApp";

const App: FC = () => {
  const [playground, setPlayground] = useState<Playground>(defaultPlayground);
  const [isSet, setIsSet] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<"Dumb" | "Average" | "Smart">(
    "Dumb"
  );

  return isSet ? (
    <MainApp playground={playground} difficulty={difficulty} />
  ) : (
    <GetPlayGround
      playground={playground}
      setPlayground={setPlayground}
      setIsSet={setIsSet}
      difficulty={difficulty}
      setDifficulty={setDifficulty}
    />
  );
};

export default App;
