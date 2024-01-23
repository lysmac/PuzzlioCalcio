import { Modal } from "@mui/material";
import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { PlayerContext } from "../../../PlayerContext";

interface HighScoreModalProps {
  open: boolean;
  onClose: () => void;
}

export default function HighScoreModal({ open, onClose }: HighScoreModalProps) {
  const { highScore, leagueScores } = useContext(PlayerContext);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="HighScore modal"
      aria-describedby="HighScore modal"
      hideBackdrop
    >
      <div className="absolute bg-primary-bg top-40 left-1/2 transform -translate-x-1/2 border border-primary-contrast w-80 sm:w-96">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row justify-center items-center relative p-1">
            <p className="text-lg font-bold">Highscore</p>
            <button onClick={onClose} className="absolute right-1">
              <IoClose size={30} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-8 w-80 m-auto px-3 py-1">
            <div className="flex">
              <p>Number of wins: {highScore}</p>
            </div>
            <div className="flex flex-col">
              <p>League statistics</p>
              <div className="flex flex-col gap-1">
                {Object.entries(leagueScores).map(([league, score]) => (
                  <p key={league}>
                    {league}: {score}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center py-1">
              <button onClick={onClose} className="font-bold">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
