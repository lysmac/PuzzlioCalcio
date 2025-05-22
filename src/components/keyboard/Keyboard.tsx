import { useContext, useEffect } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import KeyboardButton from "./KeyboardButton";

export default function Keyboard() {
  const {
    keyboardInput,
    guessNumber,
    setGuessNumber,
    setAllGuesses,
    allGuesses,
    player,
    searchPlayer,
    isGameWon,
    winGame,
    keyboardKeys,
    loseGame,
  } = useContext(PlayerContext);

  // Rendered keyboard
  const handleKeyboardInput = (value: string) => {
    // Set a guard here so if the game is won or lost, the keyboard doesn't work

    if (isGameWon) {
      return;
    }
    setAllGuesses((prevGuesses) => {
      if (guessNumber > allGuesses.length - 1) {
        return prevGuesses;
      }

      const checkPlayerName = async () => {
        // Now bypasses fotmob api check due to API changes. Can now guess on anything as a work around
        // const validPlayerName = await searchPlayer(currentGuess.guess);
        const validPlayerName = currentGuess.guess;

        const guessRow = document?.querySelector(`#guess-${guessNumber}`);

        if (validPlayerName) {
          if (currentGuess.guess === player?.cleanedName) {
            setTimeout(() => {
              winGame();
            }, 500);
            const winRow = document?.querySelector(`#guess-${guessNumber}`);

            winRow?.classList.add("animate__animated", "animate__tada");
            currentGuess.submitted = true;

            setTimeout(() => {
              winRow?.classList.remove("animate__animated", "animate__tada");
            }, 1000);
          } else {
            currentGuess.submitted = true;
            setGuessNumber((prevGuessNumber) => prevGuessNumber + 1);
            loseGame();
            const validGuessRow = document?.querySelector(
              `#guess-${guessNumber}`
            );

            validGuessRow?.classList.add(
              "animate__animated",
              "animate__flipInX"
            );
            setTimeout(() => {
              validGuessRow?.classList.remove(
                "animate__animated",
                "animate__flipInX"
              );
            }, 1000);
          }
        } else {
          guessRow?.classList.add("animate__animated", "animate__headShake");
          setTimeout(() => {
            guessRow?.classList.remove(
              "animate__animated",
              "animate__headShake"
            );
          }, 1000);
        }
      };
      // Copy the previous guesses
      const newGuesses = [...prevGuesses];

      // Get the current guess object
      const currentGuess = newGuesses[guessNumber];
      if (value === "Enter") {
        if (
          player &&
          currentGuess.guess.length === player?.cleanedName?.length
        ) {
          checkPlayerName();
        }
      } else if (value === "Del") {
        // Remove the last letter if the "del" button is pressed
        currentGuess.guess = currentGuess.guess.slice(0, -1);
      } else {
        // Add the new value to the current guess
        if (player?.cleanedName) {
          if (
            player &&
            currentGuess.guess.length < player?.cleanedName?.length
          ) {
            currentGuess.guess += value;
          }
        }
      }

      // Replace the guess object in the array
      newGuesses[guessNumber] = currentGuess;

      return newGuesses;
    });
  };

  // Physical keyboard
  useEffect(() => {
    const handlePhysicalKeyboardInput = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        handleKeyboardInput("Del");
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyboardInput(e.key);
      } else if (e.key === "Enter") {
        handleKeyboardInput("Enter");
      }
    };

    window.addEventListener("keydown", handlePhysicalKeyboardInput);
    return () => {
      window.removeEventListener("keydown", handlePhysicalKeyboardInput);
    };
  }); // Add guessNumber to the dependency array

  return (
    <div className="flex flex-col my-2.5 gap-1 xs:gap-0.5 sm:gap-1">
      {/* First row of buttons */}
      <div className="flex gap-1 xs:gap-0.5 sm:gap-1">
        {keyboardKeys.slice(0, 10).map((button) => (
          <KeyboardButton
            key={button.value}
            value={button.value}
            color={button.color}
            onClick={() => handleKeyboardInput(button.value)}
            size={
              button.value === "Del" || button.value === "Enter"
                ? "special"
                : "letter"
            }
          />
        ))}
      </div>
      {/* Second row of buttons */}
      <div className="flex gap-1 xs:gap-0.5 sm:gap-1">
        {keyboardKeys.slice(10, 19).map((button) => (
          <KeyboardButton
            key={button.value}
            value={button.value}
            color={button.color}
            onClick={() => handleKeyboardInput(button.value)}
            size={
              button.value === "Del" || button.value === "Enter"
                ? "special"
                : "letter"
            }
          />
        ))}
      </div>
      {/* Third row of buttons */}
      <div className="flex gap-1 xs:gap-0.5 sm:gap-1">
        {keyboardKeys.slice(19, 28).map((button) => (
          <KeyboardButton
            key={button.value}
            value={button.value}
            color={button.color}
            onClick={() => handleKeyboardInput(button.value)}
            size={
              button.value === "Del" || button.value === "Enter"
                ? "special"
                : "letter"
            }
          />
        ))}
      </div>
      <div>
        <p className="">{keyboardInput}</p>
      </div>
    </div>
  );
}
