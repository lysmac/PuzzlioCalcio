import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../PlayerContext";
import MenuButton from "./MenuButton";
import HighScoreModal from "./menu-high/HighScoreModal";
import SettingsModal from "./menu-settings/SettingsModal";

export default function Menu() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isHighScoreModalOpen, setIsHighScoreModalOpen] = useState(false);
  const [disableNewGame, setDisableNewGame] = useState(false);
  const { newGame, player, loadingPlayer } = useContext(PlayerContext);

  useEffect(() => {
    if (player === null) {
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
      <MenuButton
        value="Highscore"
        onClick={() => setIsHighScoreModalOpen(true)}
      />
      <SettingsModal
        open={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
      <HighScoreModal
        open={isHighScoreModalOpen}
        onClose={() => setIsHighScoreModalOpen(false)}
      />
    </div>
  );
}
