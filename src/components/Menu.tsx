import MenuButton from "./MenuButton";

export default function Menu() {
  return (
    <div className="flex flex-row gap-8">
      <MenuButton value="New game" onClick={() => console.log("New game")} />
      <MenuButton value="Settings" onClick={() => console.log("Settings")} />
      <MenuButton value="Highscore" onClick={() => console.log("Highscore")} />
    </div>
  );
}