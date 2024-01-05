import { useContext } from "react";
import {PlayerContext} from "../../PlayerContext";
import MenuButton from "./MenuButton";

export default function Menu() {
  const { fetchPlayer } = useContext(PlayerContext);

  return (
    <div className="flex flex-row gap-4">
      <MenuButton value="New game" onClick={fetchPlayer} />
      <MenuButton value="Settings" onClick={() => console.log("Settings")} />
      <MenuButton value="Highscore" onClick={() => console.log("Highscore")} />
    </div>
  );
}
