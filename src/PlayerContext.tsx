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
      const response = await fetch(`/fotmob${name}&fetchMore=squadMember`, {
        method: "GET",
        headers: {
          authority: "www.fotmob.com",
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7",
          "cache-control": "max-age=0",
          cookie:
            'NEXT_LOCALE=sv; u:location=%7B%22countryCode%22%3A%22SE%22%2C%22ccode3%22%3A%22SWE%22%2C%22timezone%22%3A%22Europe%2FStockholm%22%2C%22ip%22%3A%2283.191.170.186%22%2C%22regionId%22%3A%22O%22%2C%22regionName%22%3A%22V%25C3%25A4stra%20G%25C3%25B6taland%20County%22%7D; g_state={"i_p":1707004124551,"i_l":4}',
          "if-none-match": '"swst0p5jzk8w"',
          "sec-ch-ua":
            '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });
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
