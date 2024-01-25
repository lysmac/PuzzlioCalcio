import "animate.css";
import { getCountryCode } from "countries-list";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../PlayerContext";
import Rules from "./Rules";
import Tile from "./Tile";
import MenuButton from "./menu/MenuButton";
import "/node_modules/flag-icons/css/flag-icons.min.css";

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

  const nameArray = player?.cleanedName?.toLowerCase().split("");

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

  function flagGenerator(nation: string) {
    const contryCode = getCountryCode(nation);
    let code = "";
    if (contryCode) {
      code = contryCode;
    }
    if (code === "") {
      switch (nation) {
        case "England":
          code = "gb-eng";
          break;
        case "Scotland":
          code = "gb-sct";
          break;
        case "Wales":
          code = "gb-wls";
          break;
        case "Northern Ireland":
          code = "gb-nir";
          break;
        case "Cote d'Ivoire":
          code = "ci";
          break;
        case "Korea, South":
          code = "kr";
          break;
        case "The Gambia":
          code = "gm";
          break;
        case "DR Congo":
          code = "cd";
          break;
        default:
          code = "";
      }
    }
    return code;
  }

  const [error, setError] = useState(false);
  return (
    <>
      <div
        className="relative justify-center items-center flex gap-1 flex-col min-h-60 min-w-60 sm:min-h-80 sm:min-w-80 "
        id="mainBoard"
      >
        <div id="clues" className=" flex justify-around w-full items-center">
          <div className="gap-2 flex">
            {player?.nationality?.map((nation) => {
              console.log(nation, "sending this in");
              const code = flagGenerator(nation).toLowerCase();
              console.log(code, "this i got from the function");

              return (
                <div className="text-2xl " title={nation}>
                  <span className={`fi fi-${code}`}></span>{" "}
                </div>
              );
            })}
          </div>
          <div className="font-bold">{player?.position}</div>
        </div>
        <div
          id="cover"
          className=" w-full h-full min-h-60 sm:min-h-72 flex align-middle items-center  bg-primary-bg absolute flex-col justify-center gap-2"
        >
          {error ? (
            <>
              <p className="text-lg sm:text-2xl font-bold text-white">
                Something went wrong 🤕
              </p>
              <MenuButton value="Try again!" onClick={newGame} />
            </>
          ) : (
            <></>
          )}
          {player === null && !error ? (
            <>
              <Rules />
            </>
          ) : (
            <></>
          )}
          {loadingPlayer && !error && player !== null ? (
            <div className="flex flex-col gap-6 items-center">
              <span className="text-2xl font-bold text-white">
                Searching for player
              </span>
              <span className="loader"></span>
            </div>
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
                  { length: player?.cleanedName?.length || 0 },
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
    </>
  );
}
