import { createContext, useState } from "react";
import { competitionIds } from "./data";

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
      const randomCompetitionId =
        competitionIds[Math.floor(Math.random() * competitionIds.length)];
      const response = await fetch(
        `/transfermarkt/competitions/${randomCompetitionId.id}/clubs`
      );
      if (response.ok) {
        const fetchedCompetition = await response.json();
        console.log(fetchedCompetition);

        // Pick a random club
        const randomClub =
          fetchedCompetition.clubs[
            Math.floor(Math.random() * fetchedCompetition.clubs.length)
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
      } else {
        throw new Error("Something went wrong");
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
