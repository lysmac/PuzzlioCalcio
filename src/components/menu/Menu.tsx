import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../PlayerContext";
import MenuButton from "./MenuButton";
import SettingsModal from "./menu-settings/SettingsModal";

export default function Menu() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [disableNewGame, setDisableNewGame] = useState(false);
  const { newGame, player, loadingPlayer } = useContext(PlayerContext);

  useEffect(() => {
    if (player === "") {
      setDisableNewGame(false);
    } else {
      setDisableNewGame(loadingPlayer);
    }
  }),
    [player, loadingPlayer];

  return (
    <div className="flex flex-row gap-4">
      <MenuButton
        value="New game"
        onClick={newGame}
        disabled={disableNewGame}
      />
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
