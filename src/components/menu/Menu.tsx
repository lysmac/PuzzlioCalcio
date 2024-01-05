import MenuButton from "./MenuButton";

export default function Menu() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  return (
    <div className="flex flex-row gap-4">
      <MenuButton value="New game" onClick={() => console.log("New game")} />
      <MenuButton value="Settings" onClick={() => console.log("Settings")} />
      <MenuButton value="Highscore" onClick={() => console.log("Highscore")} />
      <MenuButton
        value="Darkmode"
        onClick={() => document.documentElement.classList.add("dark")}
      />
      <h1 className="text-white dark:text-emerald-500">HEJSAN</h1>
    </div>
  );
}
