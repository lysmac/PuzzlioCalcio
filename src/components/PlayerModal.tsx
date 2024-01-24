import { Modal } from "@mui/material";
import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { PlayerContext } from "../PlayerContext";

interface PlayerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PlayerModal({ open, onClose }: PlayerModalProps) {
  const { player } = useContext(PlayerContext);
  const playerName = player?.name.replace(/ /g, "-").toLowerCase();
  const playerUrl = `https://www.transfermarkt.co.uk/${playerName}/profil/spieler/${player?.id}`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="Player modal"
      aria-describedby="Player modal"
    >
      <div className="absolute bg-primary-bg top-40 left-1/2 transform -translate-x-1/2 border border-primary-contrast w-80 sm:w-96">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row justify-center items-center relative p-1">
            <p className="text-lg font-bold">Player</p>
            <button onClick={onClose} className="absolute right-1">
              <IoClose size={30} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div>
              <p>{player?.name}</p>
              <p>{player?.position}</p>
              <p>{player?.nationality?.join(", ")}</p>
              <p>{player?.club}</p>
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
          <div className="flex justify-center items-center py-1">
            <button onClick={onClose} className="font-bold">
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
