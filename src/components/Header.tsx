import { useContext, useState } from "react";
import { PlayerContext } from "../PlayerContext";
import Logo from "./Logo";
import Menu from "./menu/Menu";

export default function Header() {
  const [name, setName] = useState("");
  const { searchPlayer } = useContext(PlayerContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    searchPlayer(name);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full py-8 sm:pt-20 pb-8">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search player"
        />
        <button type="submit">Search</button>
      </form>
      <Logo />
      <div>
        <p className="text-sm ">
          Guess the footballer in as few tries as possible{" "}
        </p>
      </div>
      <Menu />
    </div>
  );
}
