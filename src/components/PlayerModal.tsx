import { Modal } from "@mui/material";
import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { PlayerContext } from "../PlayerContext";

interface PlayerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PlayerModal({ open, onClose }: PlayerModalProps) {
  const { player, isGameWon } = useContext(PlayerContext);
  const playerName = player?.name.replace(/ /g, "-").toLowerCase();
  const playerUrl = `https://www.transfermarkt.co.uk/${playerName}/profil/spieler/${player?.id}`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="Player modal"
      aria-describedby="Player modal"
    >
      <div className="absolute bg-primary-bg top-16 left-1/2 transform -translate-x-1/2 border border-primary-contrast w-80 sm:w-96">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row justify-center items-center relative p-1">
            <p className="text-lg font-bold">
              {isGameWon ? "You won!" : "You lost!"}
            </p>
            <button onClick={onClose} className="absolute right-1">
              <IoClose size={30} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div>
              <p>The answer was:</p>
            </div>
            <div className="flex flex-row gap-4">
              <p>{player?.name}</p>
              <p>{player?.club}</p>
            </div>
            <div className="pb-2">
              <a
                href={playerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold"
              >
                Read more about the player
              </a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
