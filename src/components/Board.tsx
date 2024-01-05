import { useEffect, useState } from "react";
import Tile from "./Tile";

export default function Board() {
  const name = "KLOPP";
  const nameArray = name.split("");

  const guess = "KPPKP";
  const guessArray = guess.split("");

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

  const [allGuesses, setAllGuesses] = useState<string[]>([]);
  const guessAmount = 5;

  useEffect(() => {
    setAllGuesses([]);
    for (let i = 0; i < guessAmount; i++) {
      setAllGuesses((allGuesses) => [...allGuesses, "empty"]);
    }
  }, []);

  console.log(allGuesses);
  return (
    <>
      Board:
      <div className="justify-center items-center flex gap-1 flex-col">
        <div className="flex w-full justify-center gap-1">
          {nameArray.map((letter, index) => (
            <Tile key={index} letter={letter} />
          ))}
        </div>{" "}
        <div className="flex w-full gap-1 flex-col">
          {allGuesses.map((guess, index) => (
            <div key={index} className="flex gap-1">
              {guess.split("").map((letter, letterIndex) => (
                <Tile key={letterIndex} letter={letter} />
              ))}
            </div>
          ))}
          {/* {guessArray.map((letter, index) => (
            <Tile key={index} letter={letter} place={results[index]} />
          ))} */}
        </div>
      </div>
    </>
  );
}
