import { useContext, useState } from "react";
import { PlayerContext } from "../../PlayerContext";
import MenuButton from "./MenuButton";
import SettingsModal from "./menu-settings/SettingsModal";

export default function Menu() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const { newGame } = useContext(PlayerContext);

  return (
    <div className="flex flex-row gap-4">
      <MenuButton value="New game" onClick={newGame} />
      <MenuButton
        value="Settings"
        onClick={() => setIsSettingsModalOpen(true)}
      />
      <MenuButton value="Highscore" onClick={() => console.log("Highscore")} />
      <SettingsModal
        open={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
}
