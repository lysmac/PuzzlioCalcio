import "animate.css";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../PlayerContext";
import Tile from "./Tile";
import MenuButton from "./menu/MenuButton";

export default function Board() {
  const {
    player,
    allGuesses,
    setAllGuesses,
    guessAmount,
    loadingPlayer,
    apiError,
    newGame,
  } = useContext(PlayerContext);

  const nameArray = player?.toLowerCase().split("");

  function colorWord(word: string) {
    const guessArray = word.toLowerCase().split("");

    const nameLetterCount = new Map<string, number>();

    if (!nameArray) {
      return [];
    }
    nameArray.forEach((letter) => {
      nameLetterCount.set(letter, (nameLetterCount.get(letter) || 0) + 1);
    });

    const decrementingMap = new Map(nameLetterCount);

    const results: ("right" | "close" | "wrong" | null)[] = guessArray.map(
      (letter, index) => {
        if (nameArray[index] === letter) {
          decrementingMap.set(letter, (decrementingMap.get(letter) || 0) - 1);
          return "right";
        }
        return null;
      }
    );

    guessArray.forEach((letter, index) => {
      if (results[index] === null) {
        if (
          nameArray.includes(letter) &&
          (decrementingMap.get(letter) || 0) > 0
        ) {
          decrementingMap.set(letter, (decrementingMap.get(letter) || 0) - 1);
          results[index] = "close";
        } else {
          results[index] = "wrong";
        }
      }
    });
    return results;
  }

  // Will move these two later, just here for testing purposes

  // Renders the board with empty tiles
  useEffect(() => {
    setAllGuesses([]);
    for (let i = 0; i < guessAmount; i++) {
      setAllGuesses((prevGuesses) => [
        ...prevGuesses,
        { guess: "", submitted: false },
      ]);
    }
  }, []);

  // Renders the board with the first guess
  useEffect(() => {
    setAllGuesses((allGuesses) => {
      const newGuesses = [...allGuesses];

      return newGuesses;
    });
  }, []);

  useEffect(() => {
    const cover = document.querySelector("#cover");

    if (apiError) {
      cover?.classList.remove("hidden");
      cover?.classList.add("animate__animated", "animate__fadeIn");
      setError(true);

      return;
    }
    setError(false);

    if (loadingPlayer) {
      cover?.classList.remove("hidden");

      cover?.classList.add("animate__animated", "animate__fadeIn");
    }
    if (!loadingPlayer) {
      cover?.classList.add("animate__animated", "animate__fadeOut");
      setTimeout(() => {
        cover?.classList.remove(
          "animate__animated",
          "animate__fadeOut",
          "animate__fadeIn"
        );
        cover?.classList.add("hidden");
      }, 1000);
    }
  }, [loadingPlayer, apiError]);

  const [error, setError] = useState(false);
  return (
    <>
      <div
        className="relative justify-center items-center flex gap-1 flex-col min-h-60 min-w-60 sm:min-h-80 sm:min-w-80"
        id="mainBoard"
      >
        <div
          id="cover"
          className=" w-full h-full min-h-60 sm:min-h-72 flex align-middle items-center  bg-primary-bg absolute flex-col justify-center gap-2"
        >
          {error ? (
            <>
              <p className="text-2xl font-bold text-white">
                Something went wrong 🤕
              </p>
              <MenuButton value="Try again!" onClick={newGame} />
            </>
          ) : (
            <></>
          )}
          {player === null && !error ? (
            <>
              <div>
                <p className="text-2xl font-bold text-white">PUZZLIO CALCIO</p>
                <span className="text-sm  text-white">
                  Guess the footballer in as few tries as possible
                </span>
              </div>
            </>
          ) : (
            <></>
          )}
          {loadingPlayer && !error ? (
            <>
              <span className="text-2xl font-bold text-white">
                Searching for player
              </span>
              <span className="loader"></span>
            </>
          ) : (
            <></>
          )}
        </div>
        <div
          id="tiles"
          className=" w-full gap-1 flex-col items-center justify-center flex"
        >
          {allGuesses.map((guess, index) => {
            const results = colorWord(guess.guess);
            return (
              <div key={index} className="flex gap-1" id={`guess-${index}`}>
                {" "}
                {Array.from(
                  { length: player?.length || 0 },
                  (_, letterIndex) => {
                    const letter = guess.guess[letterIndex] || "";
                    return (
                      <Tile
                        key={letterIndex}
                        letter={letter}
                        place={
                          guess.submitted && letter
                            ? results[letterIndex]
                            : undefined
                        }
                      />
                    );
                  }
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* {player} */}
    </>
  );
}
