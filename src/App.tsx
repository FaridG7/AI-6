import { FC, useState } from "react";
import { Playground } from "./assets/types/Playground";
import { defaultPlayground } from "./assets/defaultPlayground";
import GetPlayGround from "./GetPlayground";
import MainApp from "./MainApp";

const App: FC = () => {
  const [playground, setPlayground] = useState<Playground>(defaultPlayground);
  const [isSet, setIsSet] = useState<boolean>(false);

  return isSet ? (
    <MainApp playground={playground} />
  ) : (
    <GetPlayGround
      playground={playground}
      setPlayground={setPlayground}
      setIsSet={setIsSet}
    />
  );
};

export default App;
