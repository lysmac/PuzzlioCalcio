interface KeyboardButtonProps {
  value: string;
  onClick: () => void;
  size: "letter" | "special";
  color: string;
}

export default function KeyboardButton({
  value,
  onClick,
  size,
  color,
}: KeyboardButtonProps) {
  // The buttonClass variable is used to set the width and height of the button
  const buttonClass = ` ${
    size === "letter" ? "w-7 h-7 sm:w-12 sm:h-12 " : "w-14 sm:w-16 sm:h-12 "
  } flex-grow`;

  const background = (place: string) => {
    switch (place) {
      case "right":
        return "bg-pc-green";
      case "wrong":
        return "bg-gray-50";
      case "close":
        return "bg-pc-yellow";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`font-bold text-lt-text hover:bg-gray-300 sm:text-xl${buttonClass} ${background(
        color
      )}`}
    >
      {" "}
      {value}
    </button>
  );
}
