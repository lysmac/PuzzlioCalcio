import { useEffect, useState } from "react";
import { keyboardButtons } from "../../data";
import KeyboardButton from "./KeyboardButton";

export default function Keyboard() {
  const [keyboardInput, setKeyboardInput] = useState("");

  // Function to handle the keyboard input
  const handleKeyboardInput = (value: string) => {
    setKeyboardInput((prev) => prev + value);
  };

  useEffect(() => {
    const handlePhysicalKeyboardInput = (e: KeyboardEvent) => {
      // Check if the key pressed is a letter
      if (/[a-zA-Z]/.test(e.key)) {
        setKeyboardInput((prev) => prev + e.key);
      } else {
        // If the key pressed is not a letter, prevent the default action
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handlePhysicalKeyboardInput);
    return () => {
      window.removeEventListener("keydown", handlePhysicalKeyboardInput);
    };
  }, []);

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
        <p className="text-white">{keyboardInput}</p>
      </div>
    </div>
  );
}
