import { useEffect, useState } from "react";
import Tile from "./Tile";

export default function Board() {
  const name = "KLOPP";
  const nameArray = name.toLowerCase().split("");

  function colorWord(word: string) {
    const guessArray = word.toLowerCase().split("");

    const nameLetterCount = new Map<string, number>();
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

  interface Guess {
    guess: string;
    submitted: boolean;
  }
  const [allGuesses, setAllGuesses] = useState<Guess[]>([]);
  const guessAmount = 5;

  // Will move these two later, just here for testing purposes

  // Renders the board with empty tiles
  useEffect(() => {
    setAllGuesses([]);
    for (let i = 0; i < guessAmount; i++) {
      setAllGuesses((prevGuesses) => [
        ...prevGuesses,
        { guess: "empty", submitted: false },
      ]);
    }
  }, []);

  // Renders the board with the first guess
  useEffect(() => {
    setAllGuesses((allGuesses) => {
      const newGuesses = [...allGuesses];

      // How you render out when typing
      newGuesses[0].guess = "salah";

      // How you render out when submitted
      newGuesses[1].guess = "lopus";
      newGuesses[1].submitted = true;
      return newGuesses;
    });
  }, []);

  return (
    <>
      <div className="justify-center items-center flex gap-1 flex-col">
        <div className="flex w-full justify-center gap-1 border-b-2 border-red-500">
          {nameArray.map((letter, index) => (
            <Tile key={index} letter={letter} />
          ))}
        </div>{" "}
        <div className="flex w-full gap-1 flex-col">
          {allGuesses.map((guess, index) => {
            const results = colorWord(guess.guess);
            return (
              <div key={index} className="flex gap-1">
                {guess.guess === "empty"
                  ? Array.from({ length: guessAmount }, (_, i) => (
                      <Tile key={i} letter="" />
                    ))
                  : guess.guess
                      .split("")
                      .map((letter, letterIndex) => (
                        <Tile
                          key={letterIndex}
                          letter={letter}
                          place={
                            guess.submitted ? results[letterIndex] : undefined
                          }
                        />
                      ))}
              </div>
            );
          })}
          <div className="flex gap-1"></div>
        </div>
      </div>
    </>
  );
}
