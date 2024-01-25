import { Modal } from "@mui/material";
import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { PlayerContext } from "../../../PlayerContext";
import { leagueFlags } from "../../../data";

interface HighScoreModalProps {
  open: boolean;
  onClose: () => void;
}

export default function HighScoreModal({ open, onClose }: HighScoreModalProps) {
  const { highScore, leagueScores } = useContext(PlayerContext);
  const [animationClass, setAnimationClass] = useState("animate__fadeIn");

  const handleClose = () => {
    setAnimationClass("animate__fadeOut");

    setTimeout(() => {
      onClose();
      setAnimationClass("animate__fadeIn");
    }, 500);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="HighScore modal"
      aria-describedby="HighScore modal"
      className={`animate__animated ${animationClass} animate__faster`}
      slotProps={{
        backdrop: { style: { backgroundColor: "rgba(0, 0, 0, 0.4)" } },
      }}
    >
      <div className="absolute bg-primary-bg top-40 left-1/2 transform -translate-x-1/2 border border-primary-contrast w-80 sm:w-96">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row justify-center items-center relative p-1">
            <p className="text-lg font-bold">Highscore</p>
            <button
              onClick={handleClose}
              className="absolute right-1"
              type="button"
              title="Close highscore modal"
            >
              <IoClose size={30} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-3 w-80 m-auto px-3 py-1">
            <div className="flex flex-col gap-3">
              <p>Number of wins: {highScore}</p>
              <div className="flex flex-col gap-1">
                <p className="font-bold">League statistics</p>
                {Object.entries(leagueScores).map(([league, score]) => (
                  <div key={league} className="flex items-center gap-2">
                    {league !== "All leagues" && (
                      <img src={leagueFlags[league]} alt={`${league} flag`} />
                    )}
                    <p>
                      {league}: {score}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center py-1">
              <button onClick={handleClose} className="font-bold">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
