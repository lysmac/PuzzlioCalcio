import { useContext, useEffect } from "react";
import { PlayerContext } from "../../PlayerContext";
import { keyboardButtons } from "../../data";
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
  } = useContext(PlayerContext);

  // Rendered keyboard
  const handleKeyboardInput = (value: string) => {
    // Set a guard here so if the game is won or lost, the keyboard doesn't work

    setAllGuesses((prevGuesses) => {
      if (guessNumber > allGuesses.length - 1) {
        return prevGuesses;
      }

      const checkPlayerName = async () => {
        const validPlayerName = await searchPlayer(currentGuess.guess);

        if (validPlayerName) {
          currentGuess.submitted = true;
          setGuessNumber((prevGuessNumber) => prevGuessNumber + 1);
          if (currentGuess.guess === player?.name) {
            // Add a win condition here
            console.log("YOU WON!");
          }
        } else {
          console.log("Not a valid name");
        }
      };
      // Copy the previous guesses
      const newGuesses = [...prevGuesses];

      // Get the current guess object
      const currentGuess = newGuesses[guessNumber];
      if (value === "Enter") {
        if (player && currentGuess.guess.length === player.name.length) {
          checkPlayerName();
        }
      } else if (value === "Del") {
        // Remove the last letter if the "del" button is pressed
        currentGuess.guess = currentGuess.guess.slice(0, -1);
      } else {
        // Add the new value to the current guess

        if (player && currentGuess.guess.length < player.name.length) {
          currentGuess.guess += value;
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
      } else {
        handleKeyboardInput(e.key);
      }
    };

    window.addEventListener("keydown", handlePhysicalKeyboardInput);
    return () => {
      window.removeEventListener("keydown", handlePhysicalKeyboardInput);
    };
  }); // Add guessNumber to the dependency array

  return (
    <div className="flex flex-col my-2.5 gap-1">
      {/* First row of buttons */}
      <div className="flex gap-1">
        {keyboardButtons.slice(0, 10).map((button) => (
          <KeyboardButton
            key={button.value}
            value={button.value}
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
      <div className="flex gap-1">
        {keyboardButtons.slice(10, 19).map((button) => (
          <KeyboardButton
            key={button.value}
            value={button.value}
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
      <div className="flex gap-1">
        {keyboardButtons.slice(19, 28).map((button) => (
          <KeyboardButton
            key={button.value}
            value={button.value}
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
