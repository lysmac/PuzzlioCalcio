import { createContext, useState } from "react";
import { clubIds } from "./data";

type Player = {
  id: number;
  name: string;
};

interface Guess {
  guess: string;
  submitted: boolean;
}

interface PlayerContextValue {
  fetchPlayer: () => void;
  player: Player | null;
  allGuesses: Guess[];
  setAllGuesses: React.Dispatch<React.SetStateAction<Guess[]>>;
  guessAmount: number;
  setGuessAmount: React.Dispatch<React.SetStateAction<number>>;
}

export const PlayerContext = createContext<PlayerContextValue>({
  fetchPlayer: () => {},
  player: null,
  allGuesses: [],
  setAllGuesses: () => {},
  guessAmount: 0,
  setGuessAmount: () => {},
});

export interface ProviderProps {
  children: React.ReactNode;
}

export default function PlayerProvider({ children }: ProviderProps) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [allGuesses, setAllGuesses] = useState<Guess[]>([]);

  // Hardcoded for now, will be changed later with the new game function
  const [guessAmount, setGuessAmount] = useState(5);

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

  return (
    <PlayerContext.Provider
      value={{
        fetchPlayer,
        player,
        allGuesses,
        setAllGuesses,
        guessAmount,
        setGuessAmount,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
