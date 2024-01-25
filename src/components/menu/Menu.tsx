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

  function newGameBlur(event: React.MouseEvent<HTMLButtonElement>) {
    newGame();
    event.currentTarget.blur();
  }

  function openSettingsModal(event: React.MouseEvent<HTMLButtonElement>) {
    setIsSettingsModalOpen(true);
    event.currentTarget.blur();
  }
  function openHighScoreModal(event: React.MouseEvent<HTMLButtonElement>) {
    setIsHighScoreModalOpen(true);
    event.currentTarget.blur();
  }

  return (
    <div className="flex flex-row gap-4">
      <MenuButton
        value="New game"
        onClick={newGameBlur}
        disabled={disableNewGame}
      />
      <MenuButton value="Settings" onClick={openSettingsModal} />
      <MenuButton value="Highscore" onClick={openHighScoreModal} />
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
