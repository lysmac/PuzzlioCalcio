import { createContext, useCallback, useEffect, useState } from "react";

type Player = {
  id: number;
  name: string;
};

interface PlayerContextValue {
  player: Player;
  fetchPlayer: () => void;
}

export interface ProviderProps {
  children: React.ReactNode;
}

export const PlayerContext = createContext<PlayerContextValue>({
  player: {
    id: 0,
    name: "",
  },
  fetchPlayer: () => {},
});

export default function PlayerProfileProvider({ children }: ProviderProps) {
  const [player, setPlayer] = useState<Player>({ id: 0, name: "" });

  // Function to generate a random 6-digit number
  const getRandomPlayerId = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const fetchPlayer = useCallback(async () => {
    try {
      const playerId = getRandomPlayerId();
      const response = await fetch(
        `/transfermarkt/players/${playerId}/profile`
      );
      if (response.ok) {
        const data = await response.json();
        setPlayer({ id: data.id, name: data.name });
        console.log(data.name, data.id);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, []);

  useEffect(() => {
    fetchPlayer();
  }, [fetchPlayer]);

  return (
    <PlayerContext.Provider value={{ player, fetchPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}

//https://transfermarkt-api.vercel.app/players/123456/profile
