import { createContext, useEffect, useState } from "react";
import { clubIds, keyboardButton, keyboardButtons } from "./data";

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
  newGame: () => void;
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
  keyboardKeys: keyboardButton[];
  setKeyboardKeys: React.Dispatch<React.SetStateAction<keyboardButton[]>>;
  numberOfLetters: string;
  setNumberOfLetters: React.Dispatch<React.SetStateAction<string>>;
  loadingPlayer: boolean;
}

export const PlayerContext = createContext<PlayerContextValue>({
  searchPlayer: () => new Promise(() => {}),
  newGame: () => {},
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
  keyboardKeys: [],
  setKeyboardKeys: () => {},
  numberOfLetters: "",
  setNumberOfLetters: () => {},
  loadingPlayer: true,
});

export interface ProviderProps {
  children: React.ReactNode;
}

export default function PlayerProvider({ children }: ProviderProps) {
  const [player, setPlayer] = useState<string | null>(null);
  const [allGuesses, setAllGuesses] = useState<Guess[]>([]);
  const [keyboardInput, setKeyboardInput] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);

  //Settings
  const initialNumberOfLetters =
    localStorage.getItem("numberOfLetters") || "4-6";
  const [numberOfLetters, setNumberOfLetters] = useState(
    initialNumberOfLetters
  );

  useEffect(() => {
    localStorage.setItem("numberOfLetters", numberOfLetters);
    console.log("Number of letters: " + numberOfLetters);
  }, [numberOfLetters]);

  // Hardcoded for now, will be changed later with the new game function
  const [guessAmount, setGuessAmount] = useState(5);

  const [guessNumber, setGuessNumber] = useState(0);

  // This variable is used to prevent the fotmob api from being spammed.
  // It will be set to true when the api is called, and then set to false after a 1 second timeout.
  const [fotmobBlocked, setFotmobBlocked] = useState(false);

  const [keyboardKeys, setKeyboardKeys] = useState(keyboardButtons);

  const [loadingPlayer, setLoadingPlayer] = useState(true);

  const winGame = () => {
    console.log("You won the game!!");
    setIsGameWon(true);
  };

  const newGame = () => {
    cleanGuesses();
    setKeyboardKeys(keyboardButtons);
    fetchPlayer();
  };
  const fetchPlayer = async (): Promise<void> => {
    setIsGameWon(false);
    setLoadingPlayer(true);
    setPlayer("");
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
        console.log(playersData.players);
        const [minLength, maxLength] = numberOfLetters.split("-").map(Number);
        const filteredPlayers = playersData.players.filter((player: Player) => {
          const splitName = player.name.split(" ");
          if (splitName.length === 3) {
            return false;
          }
          const lastName = player.name.split(" ").slice(-1)[0];
          const nameLength = lastName.length;
          console.log("Name length:" + nameLength);
          return nameLength >= minLength && nameLength <= maxLength;
        });
        if (filteredPlayers.length === 0) {
          return fetchPlayer();
        }

        // Pick a random player from the filtered players
        const randomPlayer =
          filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)];
        const clean = cleanName(randomPlayer);
        setPlayer(clean);
        setLoadingPlayer(false);
      } else {
        setLoadingPlayer(false);
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
      .toLowerCase()
      .normalize("NFD") // Decompose into base characters and diacritics
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritic marks
      .replace(/ı/g, "i") // Replace 'ı' with 'i'
      .replace(/ğ/g, "g") // Replace 'ğ' with 'g'
      .replace(/ø/g, "o") // Replace 'ø' with 'o'
      .replace(/ß/g, "ss") // Replace 'ß' with 'ss'
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
      const response = await fetch(`/fotmob${name}&fetchMore=squadMember`);
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

        allNames = allNames.map((name) => {
          return cleanName({ id: 0, name: name });
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
        newGame,
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
        keyboardKeys,
        setKeyboardKeys,
        numberOfLetters,
        setNumberOfLetters,
        loadingPlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
