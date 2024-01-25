import { useEffect, useState } from "react";

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
    size === "letter"
      ? "w-7 h-7 xs:w-[2.2rem] xs:h-[2.2rem] sm:w-12 sm:h-12 "
      : "w-14 sm:w-16 sm:h-12 "
  } flex-grow`;

  const background = (place: string) => {
    switch (place) {
      case "right":
        return "bg-pc-green";
      case "wrong":
        return "bg-gray-400";
      case "close":
        return "bg-pc-yellow";
      default:
        return "bg-gray-50";
    }
  };

  const [animationClasses, setAnimationClasses] = useState("");

  useEffect(() => {
    setAnimationClasses("animate__animated animate__fadeIn animate__faster");

    setTimeout(() => {
      setAnimationClasses("");
    }, 1000);
  }, [color]);

  return (
    <button
      onClick={onClick}
      className={`font-bold text-lt-text hover:bg-gray-300 sm:text-xl${buttonClass} ${background(
        color
      )} ${animationClasses}`}
    >
      {" "}
      {value}
    </button>
  );
}
