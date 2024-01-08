import { createContext, useState } from "react";
import { clubIds } from "./data";

type Player = {
  id: number;
  name: string;
};

interface PlayerContextValue {
  fetchPlayer: () => void;
  player: Player | null;
}

export const PlayerContext = createContext<PlayerContextValue>({
  fetchPlayer: () => {},
  player: null,
});

export interface ProviderProps {
  children: React.ReactNode;
}

export default function PlayerProvider({ children }: ProviderProps) {
  const [player, setPlayer] = useState<Player | null>(null);

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
    <PlayerContext.Provider value={{ fetchPlayer, player }}>
      {children}
    </PlayerContext.Provider>
  );
}
