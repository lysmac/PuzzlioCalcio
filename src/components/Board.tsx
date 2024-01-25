import "animate.css";
import { getCountryCode, getEmojiFlag } from "countries-list";
import { useContext, useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { PlayerContext } from "../PlayerContext";
import Rules from "./Rules";
import RulesModal from "./RulesModal";
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
    const code = getCountryCode(nation);
    let flag;
    if (code) {
      flag = getEmojiFlag(code);
    }

    if (!flag) {
      switch (nation) {
        case "England":
          flag = "🏴󠁧󠁢󠁥󠁮󠁧󠁿";
          break;
        case "Scotland":
          flag = "🏴󠁧󠁢󠁳󠁣󠁴󠁿";
          break;
        case "Wales":
          flag = "🏴󠁧󠁢󠁷󠁬󠁳󠁿";
          break;
        case "Northern Ireland":
          flag = "🏴󠁧󠁢󠁮󠁩󠁲󠁿";
          break;
        case "Cote d'Ivoire":
          flag = "🇨🇮";
          break;
        case "Korea, South":
          flag = "🇰🇷";
          break;
        case "The Gambia":
          flag = "🇬🇲";
          break;
        case "DR Congo":
          flag = "🇨🇩";
          break;
        default:
          flag = "🏳️";
      }
    }
    return flag;
  }

  const [error, setError] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  return (
    <>
      <div
        className="relative justify-center items-center flex gap-1 flex-col min-h-60 min-w-60 sm:min-h-80 sm:min-w-80 "
        id="mainBoard"
      >
        {player && (
          <div className="flex justify-end w-full">
            <FaInfoCircle
              color="primary-contrast"
              size={20}
              onClick={() => setIsRulesModalOpen(true)}
              className="cursor-pointer"
            />
            <RulesModal
              open={isRulesModalOpen}
              onClose={() => setIsRulesModalOpen(false)}
            />
          </div>
        )}
        <div id="clues" className=" flex justify-around w-full items-center">
          <div className="gap-2 flex">
            {player?.nationality?.map((nation) => {
              const flag = flagGenerator(nation);

              return (
                <div className="text-3xl" title={nation}>
                  {flag}
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
