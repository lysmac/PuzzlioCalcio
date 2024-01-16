import { useContext, useEffect } from "react";
import { PlayerContext } from "../PlayerContext";

export default function Tile({
  letter,
  place,
}: {
  letter?: string;
  place?: "right" | "close" | "wrong" | null;
}) {
  const { setKeyboardKeys } = useContext(PlayerContext);

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

  function setKeyboardKeyColor(letter: string, place: string) {
    setKeyboardKeys((prevKeyboardKeys) => {
      return prevKeyboardKeys.map((key) => {
        if (key.value !== letter) {
          return key;
        }

        if (key.color === "right") {
          return key;
        }

        if (key.color === "close" && place !== "right") {
          return key;
        }

        return { ...key, color: place };
      });
    });
  }
  useEffect(() => {
    if (letter && place) {
      console.log("useeffect", letter, place);
      setKeyboardKeyColor(letter, place);
    }
  }, [letter, place]);
  return (
    <div
      className={` uppercase aspect-square w-8 sm:min-w-12  sm:text-3xl flex items-center justify-center font-bold text-2xl font-mono text-lt-text ${background(
        place || ""
      )}`}
    >
      {letter}
    </div>
  );
}
