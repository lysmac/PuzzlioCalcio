import { useContext, useState } from "react";
import { PlayerContext } from "../../PlayerContext";
import MenuButton from "./MenuButton";
import SettingsModal from "./menu-settings/SettingsModal";

export default function Menu() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  /*   function darkModeToggle() {
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
  }, []); */

  const { newGame } = useContext(PlayerContext);

  return (
    <div className="flex flex-row gap-4">
      <MenuButton value="New game" onClick={newGame} />
      <MenuButton
        value="Settings"
        onClick={() => setIsSettingsModalOpen(true)}
      />
      <MenuButton value="Highscore" onClick={() => console.log("Highscore")} />
      <SettingsModal
        open={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
}
