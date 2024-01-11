import { createContext, useState } from "react";
import { clubIds } from "./data";

interface Player {
  id: number;
  name: string;
}

interface Guess {
  guess: string;
  submitted: boolean;
}

interface PlayerContextValue {
  searchPlayer: (name: string) => Promise<boolean>;
  fetchPlayer: () => void;
  player: string | null;
  allGuesses: Guess[];
  setAllGuesses: React.Dispatch<React.SetStateAction<Guess[]>>;
  guessAmount: number;
  setGuessAmount: React.Dispatch<React.SetStateAction<number>>;
  keyboardInput: string;
  setKeyboardInput: React.Dispatch<React.SetStateAction<string>>;
  guessNumber: number;
  setGuessNumber: React.Dispatch<React.SetStateAction<number>>;
  winGame: () => void;
  isGameWon: boolean;
}

export const PlayerContext = createContext<PlayerContextValue>({
  searchPlayer: () => new Promise(() => {}),
  fetchPlayer: () => {},
  player: null,
  allGuesses: [],
  setAllGuesses: () => {},
  guessAmount: 0,
  setGuessAmount: () => {},
  keyboardInput: "",
  setKeyboardInput: () => {},
  guessNumber: 0,
  setGuessNumber: () => {},
  winGame: () => {},
  isGameWon: false,
});

export interface ProviderProps {
  children: React.ReactNode;
}

export default function PlayerProvider({ children }: ProviderProps) {
  const [player, setPlayer] = useState<string | null>("klopp");
  const [allGuesses, setAllGuesses] = useState<Guess[]>([]);
  const [keyboardInput, setKeyboardInput] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);

  // Hardcoded for now, will be changed later with the new game function
  const [guessAmount, setGuessAmount] = useState(5);

  const [guessNumber, setGuessNumber] = useState(0);

  // This variable is used to prevent the fotmob api from being spammed.
  // It will be set to true when the api is called, and then set to false after a 1 second timeout.
  const [fotmobBlocked, setFotmobBlocked] = useState(false);

  const winGame = () => {
    console.log("You won the game!!");
    setIsGameWon(true);
  };

  const fetchPlayer = async () => {
    setIsGameWon(false);
    try {
      // Pick a random competition from the clubIds array
      const randomCompetition =
        clubIds[Math.floor(Math.random() * clubIds.length)];

      // Pick a random club from the clubs array of the random competition
      const randomClub =
        randomCompetition.clubs[
          Math.floor(Math.random() * randomCompetition.clubs.length)
        ];
      console.log(randomClub);

      // Fetch the players from the random club
      const playersResponse = await fetch(
        `/transfermarkt/clubs/${randomClub.id}/players`
      );
      if (playersResponse.ok) {
        const playersData = await playersResponse.json();
        // Access the players array and pick a random player
        const randomPlayer =
          playersData.players[
            Math.floor(Math.random() * playersData.players.length)
          ];

        const clean = cleanName(randomPlayer);
        setPlayer(clean);
        cleanGuesses();
      } else {
        throw new Error("Could not fetch players");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const cleanGuesses = () => {
    setAllGuesses([]);
    setGuessNumber(0);
    for (let i = 0; i < guessAmount; i++) {
      setAllGuesses((prevGuesses) => [
        ...prevGuesses,
        { guess: "", submitted: false },
      ]);
    }
  };

  const cleanName = (player: Player) => {
    const lastName = player.name.split(" ").slice(-1)[0];

    const cleanedName = lastName
      .normalize("NFD") // Decompose into base characters and diacritics
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritic marks
      .toLowerCase()
      .replace(/[^a-z\s]/g, "") // Keep only a-z and spaces
      .replace(/\s+/g, " ")
      .trim();

    return cleanedName;
  };

  const searchPlayer = async (name: string) => {
    if (fotmobBlocked) {
      return false;
    }
    try {
      const response = await fetch(
        `/.netlify/functions/fotmob-proxy?name=${encodeURIComponent(name)}`
      );

      if (response.ok) {
        setFotmobBlocked(true);
        setTimeout(() => {
          setFotmobBlocked(false);
        }, 1000);
        const data = await response.json();

        let allNames: string[] = [];

        data.squad.dataset.forEach((player: Player) => {
          const names = player.name.toLowerCase().split(" ");
          allNames = allNames.concat(names);
        });
        allNames = [...new Set(allNames)];

        if (allNames.includes(name.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      } else {
        throw new Error("Could not fetch player");
      }
    } catch (error) {
      if (error instanceof Error) {
        return false;
      }
    }
    return false;
  };

  return (
    <PlayerContext.Provider
      value={{
        searchPlayer,
        fetchPlayer,
        player,
        allGuesses,
        setAllGuesses,
        guessAmount,
        setGuessAmount,
        keyboardInput,
        setKeyboardInput,
        guessNumber,
        setGuessNumber,
        winGame,
        isGameWon,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
