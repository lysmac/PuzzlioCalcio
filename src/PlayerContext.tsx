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
  searchPlayer: (name: string) => void;
  fetchPlayer: () => void;
  player: Player | null;
  allGuesses: Guess[];
  setAllGuesses: React.Dispatch<React.SetStateAction<Guess[]>>;
  guessAmount: number;
  setGuessAmount: React.Dispatch<React.SetStateAction<number>>;
  keyboardInput: string;
  setKeyboardInput: React.Dispatch<React.SetStateAction<string>>;
  guessNumber: number;
  setGuessNumber: React.Dispatch<React.SetStateAction<number>>;
}

export const PlayerContext = createContext<PlayerContextValue>({
  searchPlayer: () => {},
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
});

export interface ProviderProps {
  children: React.ReactNode;
}

export default function PlayerProvider({ children }: ProviderProps) {
  const [player, setPlayer] = useState<Player | null>({ id: 0, name: "klopp" });
  const [allGuesses, setAllGuesses] = useState<Guess[]>([]);
  const [keyboardInput, setKeyboardInput] = useState("");

  // Hardcoded for now, will be changed later with the new game function
  const [guessAmount, setGuessAmount] = useState(5);

  const [guessNumber, setGuessNumber] = useState(0);

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
        setPlayer(randomPlayer);
        console.log(randomPlayer);
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

  const searchPlayer = async (name: string) => {
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
        const data = await response.json();
        if (data.squad && data.squad.dataset) {
          data.squad.dataset.forEach((player: Player) => {
            console.log({ id: player.id, name: player.name });
          });
        }
      } else {
        throw new Error("Could not fetch player");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
