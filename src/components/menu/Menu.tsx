import { useContext, useState } from "react";
import { PlayerContext } from "../../PlayerContext";
import MenuButton from "./MenuButton";
import SettingsModal from "./SettingsModal";

export default function Menu() {
  const { fetchPlayer } = useContext(PlayerContext);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(true);
  };

  return (
    <div className="flex flex-row gap-4 relative">
      <MenuButton value="New game" onClick={fetchPlayer} />
      <MenuButton value="Settings" onClick={handleSettingsClick} />
      <MenuButton value="Highscore" onClick={() => console.log("Highscore")} />
      <SettingsModal open={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
    </div>
  );
}
