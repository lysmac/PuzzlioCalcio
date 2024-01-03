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
    size === "letter" ? "w-6 h-6 md:w-8 h-8 lg:w-10 h-10" : "w-14 h-6 md:w-16 h-8 lg:w-16 h-10"
  } flex-grow`;

  return (
    <button onClick={onClick} className={buttonClass}>
      {value}
    </button>
  );
}
