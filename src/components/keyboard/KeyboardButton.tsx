interface KeyboardButtonProps {
  value: string;
  onClick: () => void;
  size: "letter" | "special";
}

export default function KeyboardButton({
  value,
  onClick,
  size,
}: KeyboardButtonProps) {
  // The buttonClass variable is used to set the width and height of the button
  const buttonClass = ` ${
    size === "letter" ? "w-7 h-7 sm:w-12 sm:h-12 " : "w-14 sm:w-16 sm:h-12 "
  } flex-grow`;

  return (
    <button
      onClick={onClick}
      className={`font-bold bg-gray-50 hover:bg-gray-300 sm:text-xl${buttonClass}`}
    >
      {" "}
      {value}
    </button>
  );
}
