import { useContext, useEffect } from "react";
import { PlayerContext } from "../../PlayerContext";
import MenuButton from "./MenuButton";

export default function Menu() {
  function darkModeToggle() {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  }

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, []);

  const { fetchPlayer } = useContext(PlayerContext);

  return (
    <div className="flex flex-row gap-4">
      <MenuButton value="New game" onClick={fetchPlayer} />
      <MenuButton value="Settings" onClick={() => console.log("Settings")} />
      <MenuButton value="Highscore" onClick={() => console.log("Highscore")} />
      <MenuButton value="Darkmode" onClick={() => darkModeToggle()} />
    </div>
  );
}
