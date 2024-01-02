import { keyboardButtons } from "../data";
import KeyboardButton from "./KeyboardButton";

export default function Keyboard() {
  return (
    <div className="flex flex-col my-2.5">
      <div className="my-0.5 flex">
        {keyboardButtons.slice(0, 10).map((button) => (
          <KeyboardButton
            key={button.value}
            value={button.value}
            onClick={button.onClick}
            size={
              button.value === "Del" || button.value === "Enter"
                ? "special"
                : "letter"
            }
            className="font-bold mx-0.5 bg-gray-50 hover:bg-gray-300"
          />
        ))}
      </div>
      <div className="my-0.5 flex">
        {keyboardButtons.slice(10, 19).map((button) => (
          <KeyboardButton
            key={button.value}
            value={button.value}
            onClick={button.onClick}
            size={
              button.value === "Del" || button.value === "Enter"
                ? "special"
                : "letter"
            }
            className="font-bold mx-0.5 bg-gray-50 hover:bg-gray-300"
          />
        ))}
      </div>
      <div className="my-0.5 flex">
        {keyboardButtons.slice(19, 28).map((button) => (
          <KeyboardButton
            key={button.value}
            value={button.value}
            onClick={button.onClick}
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
