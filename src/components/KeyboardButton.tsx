interface KeyboardButtonProps {
  value: string;
  onClick: () => void;
  size: "letter" | "special";
  className: string;
}

export default function KeyboardButton({
  value,
  onClick,
  size,
  className,
}: KeyboardButtonProps) {
  // The buttonClass variable is used to set the width and height of the button
  const buttonClass = `${className} ${
    size === "letter" ? "w-10 h-10" : "w-16 h-10"
  } flex-grow`;

  return (
    <button onClick={onClick} className={buttonClass}>
      {value}
    </button>
  );
}
