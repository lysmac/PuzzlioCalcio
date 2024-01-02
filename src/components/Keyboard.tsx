import { keyboardButtons } from "../data"; // Importing the keyboard buttons data
import KeyboardButton from "./KeyboardButton";

export default function Keyboard() {
  return (
    <div className="flex flex-col my-2.5">
      {/* First row of buttons */}
      <div className="my-0.5 flex">
        {keyboardButtons.slice(0, 10).map((button) => (
          <KeyboardButton
            key={button.value}
            value={button.value}
            onClick={button.onClick} // Placeholders for the onClick function
            size={
              button.value === "Del" || button.value === "Enter"
                ? "special"
                : "letter"
            }
            className="font-bold mx-0.5 bg-gray-50 hover:bg-gray-300"
          />
        ))}
      </div>
      {/* Second row of buttons */}
      <div className="my-0.5 flex">
        {keyboardButtons.slice(10, 19).map((button) => (
          <KeyboardButton
            key={button.value}
            value={button.value}
            onClick={button.onClick} // Placeholders for the onClick function
            size={
              button.value === "Del" || button.value === "Enter"
                ? "special"
                : "letter"
            }
            className="font-bold mx-0.5 bg-gray-50 hover:bg-gray-300"
          />
        ))}
      </div>
      {/* Third row of buttons */}
      <div className="my-0.5 flex">
        {keyboardButtons.slice(19, 28).map((button) => (
          <KeyboardButton
            key={button.value}
            value={button.value}
            onClick={button.onClick} // Placeholders for the onClick function
            size={
              button.value === "Del" || button.value === "Enter"
                ? "special"
                : "letter"
            }
            className="font-bold mx-0.5 bg-gray-50 hover:bg-gray-300"
          />
        ))}
      </div>
    </div>
  );
}
