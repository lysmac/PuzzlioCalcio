import { useContext, useEffect } from "react";
import { PlayerContext } from "../../PlayerContext";
import { keyboardButtons } from "../../data";
import KeyboardButton from "./KeyboardButton";

export default function Keyboard() {
  const {
    setKeyboardInput,
    keyboardInput,
    guessNumber,
    setGuessNumber,
    setAllGuesses,
    allGuesses,
  } = useContext(PlayerContext);

  // Rendered keyboard
  const handleKeyboardInput = (value: string) => {
    setAllGuesses((prevGuesses) => {
      // Copy the previous guesses
      const newGuesses = [...prevGuesses];

      // Get the current guess object
      const currentGuess = newGuesses[guessNumber];
      if (value === "Enter") {
        // Move to the next guess
        console.log("Enter");
        setGuessNumber((prevGuessNumber) => prevGuessNumber + 1);
      } else if (value === "Del") {
        // Remove the last letter if the "del" button is pressed
        currentGuess.guess = currentGuess.guess.slice(0, -1);
      } else {
        // Add the new value to the current guess
        currentGuess.guess += value;
      }

      // Replace the guess object in the array
      newGuesses[guessNumber] = currentGuess;

      return newGuesses;
    });
  };

  // Physical keyboard
  useEffect(() => {
    const handlePhysicalKeyboardInput = (e: KeyboardEvent) => {
      setAllGuesses((prevGuesses) => {
        // Copy the previous guesses
        const newGuesses = [...prevGuesses];

        // Get the current guess object
        const currentGuess = newGuesses[guessNumber];

        if (e.key === "Enter") {
          // Move to the next guess
          console.log("Enter");
          setGuessNumber((prevGuessNumber) => prevGuessNumber + 1);
        }

        if (/^[a-zA-Z]$/.test(e.key)) {
          // Add the new value to the current guess
          currentGuess.guess += e.key.toUpperCase();
        } else if (e.key === "Backspace") {
          // Remove the last letter if the backspace key is pressed
          currentGuess.guess = currentGuess.guess.slice(0, -1);
        }

        // Replace the guess object in the array
        newGuesses[guessNumber] = currentGuess;

        return newGuesses;
      });
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
