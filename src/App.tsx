import { useContext, useEffect } from "react";
import { PlayerContext } from "./PlayerContext";
import Board from "./components/Board";
import Confetti from "./components/Confetti";
import Header from "./components/Header";
import PlayerModal from "./components/PlayerModal";
import Keyboard from "./components/keyboard/Keyboard";
import "./index.css";

export default function App() {
  const { isGameWon, fetchPlayer, isGameOver, setIsGameOver } =
    useContext(PlayerContext);

  useEffect(() => {
    fetchPlayer();
  }, []);

  const handleClose = () => {
    setIsGameOver(false);
  };

  return (
    <>
      {isGameWon && <Confetti />}
      {isGameOver && <PlayerModal open={isGameOver} onClose={handleClose} />}
      <header>
        <Header />
      </header>
      <main className="flex flex-col justify-center items-center w-full">
        <Board />
        <Keyboard />
      </main>
      <footer>footer test</footer>
    </>
  );
}

// <h1 className="text-5xl font-bold underline text-red-500">App.tsx</h1>
// <Link to="/test">Linking to test to test react router </Link>
