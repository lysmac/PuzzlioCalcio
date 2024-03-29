import { createContext, useEffect, useState } from "react";
import { competitions, keyboardButton, keyboardButtons } from "../data";

interface Player {
  id: number;
  name: string;
  cleanedName?: string;
  league?: string;
  position?: string;
  nationality?: string[];
  club?: string;
}

interface Guess {
  guess: string;
  submitted: boolean;
}

interface PlayerContextValue {
  searchPlayer: (name: string) => Promise<boolean>;
  newGame: () => void;
  player: Player | null;
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
  apiError: boolean;
  league: string;
  setLeague: React.Dispatch<React.SetStateAction<string>>;
  fetchPlayer: () => Promise<void>;
  highScore: number;
  leagueScores: { [key: string]: number };
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  loseGame: () => void;
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
  apiError: false,
  league: "",
  setLeague: () => {},
  fetchPlayer: () => new Promise(() => {}),
  highScore: 0,
  leagueScores: {},
  isGameOver: false,
  setIsGameOver: () => {},
  loseGame: () => {},
});

export interface ProviderProps {
  children: React.ReactNode;
}

export default function PlayerProvider({ children }: ProviderProps) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [allGuesses, setAllGuesses] = useState<Guess[]>([]);
  const [keyboardInput, setKeyboardInput] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  //Highscore
  const initialHighScore = Number(localStorage.getItem("highScore")) || 0;
  const [highScore, setHighScore] = useState(initialHighScore);

  //League statistics
  const initialLeagueScores = {
    "All leagues": 0,
    "Premier League": 0,
    LaLiga: 0,
    Bundesliga: 0,
    "Serie A": 0,
    "Ligue 1": 0,
  };
  const [leagueScores, setLeagueScores] = useState(() => {
    const leagueScoresFromStorage = localStorage.getItem("leagueScores");
    return leagueScoresFromStorage
      ? { ...initialLeagueScores, ...JSON.parse(leagueScoresFromStorage) }
      : initialLeagueScores;
  });

  //Settings
  // Number of letters
  const initialNumberOfLetters =
    localStorage.getItem("numberOfLetters") || "4-6";
  const [numberOfLetters, setNumberOfLetters] = useState(
    initialNumberOfLetters
  );
  useEffect(() => {
    localStorage.setItem("numberOfLetters", numberOfLetters);
  }, [numberOfLetters]);

  // League
  const initialLeague = localStorage.getItem("league") || "All leagues";
  const [league, setLeague] = useState(initialLeague);
  useEffect(() => {
    localStorage.setItem("league", league);
    fetchPlayer();
  }, [league]);

  // Hardcoded for now, will be changed later with the new game function
  const [guessAmount, setGuessAmount] = useState(5);

  const [guessNumber, setGuessNumber] = useState(0);

  // This variable is used to prevent the fotmob api from being spammed.
  // It will be set to true when the api is called, and then set to false after a 1 second timeout.
  const [fotmobBlocked, setFotmobBlocked] = useState(false);

  const [keyboardKeys, setKeyboardKeys] = useState(keyboardButtons);

  const [loadingPlayer, setLoadingPlayer] = useState(true);
  const [apiError, setApiError] = useState(false);

  const [playerVault] = useState<Player[]>([]);

  const winGame = () => {
    setIsGameWon(true);
    setIsGameOver(true);
    setHighScore((prevScore) => {
      const newScore = prevScore + 1;
      localStorage.setItem("highScore", newScore.toString());
      return newScore;
    });
    setLeagueScores((prevScores: { [key: string]: number }) => {
      const newScores = { ...prevScores };
      newScores[league] = (newScores[league] || 0) + 1;
      localStorage.setItem("leagueScores", JSON.stringify(newScores));
      return newScores;
    });
  };

  const loseGame = () => {
    if (guessNumber >= guessAmount - 1) {
      setIsGameOver(true);
    }
  };

  const newGame = () => {
    cleanGuesses();
    setKeyboardKeys(keyboardButtons);
    setIsGameWon(false);
    setIsGameOver(false);
    setPlayer({ id: 0, name: "", cleanedName: "" });
    fetchPlayer();
    setApiError(false);
    randomPlayerGenerator();
  };

  const randomPlayerGenerator = (retryCount = 0) => {
    let playersInSelectedLeague = playerVault;

    if (league !== "All leagues" || undefined) {
      // Use the selected league to find the league in the competitions array
      playersInSelectedLeague = playerVault.filter(
        (player: Player) => player.league === league
      );
      // If the league is not found, throw an error (Does not work without error handling)
      if (!league) {
        throw new Error(`Could not find league: ${league}`);
      }
    }

    const [minLength, maxLength] = numberOfLetters.split("-").map(Number);
    const filteredPlayers = playersInSelectedLeague.filter((player: Player) => {
      const splitName = player.name.split(" ");
      if (splitName.length === 3) {
        return false;
      }
      const lastName = player.name.split(" ").slice(-1)[0];
      const nameLength = lastName.length;
      return nameLength >= minLength && nameLength <= maxLength;
    });
    if (filteredPlayers.length === 0) {
      if (retryCount >= 5) {
        // Maximum 5 retries
        setApiError(true);

        return;
      }
      setLoadingPlayer(true);
      fetchPlayer();
      setTimeout(() => {
        setLoadingPlayer(false);
        randomPlayerGenerator(retryCount + 1); // Increment retryCount
      }, 2000);
      return;
    }
    const randomPlayer =
      filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)];

    const clean = cleanName(randomPlayer);
    setPlayer(clean);
    setLoadingPlayer(false);
  };

  const fetchPlayer = async (): Promise<void> => {
    try {
      let selectedLeague;
      // Pick a random league from the competitions array
      if (league === "All leagues") {
        selectedLeague =
          competitions[Math.floor(Math.random() * competitions.length)];
      } else {
        // Use the selected league to find the league in the competitions array
        selectedLeague = competitions.find(
          (competition) => competition.name === league
        );
        // If the league is not found, throw an error (Does not work without error handling)
        if (!selectedLeague) {
          throw new Error(`Could not find league: ${league}`);
        }
      }
      // Pick a random club from the clubs array of the random competition
      const randomClub =
        selectedLeague.clubs[
          Math.floor(Math.random() * selectedLeague.clubs.length)
        ];

      // Fetch the players from the random club
      const playersResponse = await fetch(
        `/transfermarkt/clubs/${randomClub.id}/players`
      );
      if (playersResponse.ok) {
        const playersData = await playersResponse.json();
        playersData.players.forEach((playerObject: Player) => {
          const player = {
            id: playerObject.id,
            name: playerObject.name,
            league: "",
            position: playerObject.position,
            nationality: playerObject.nationality,
            club: randomClub.name,
          };
          competitions.find((competition) => {
            if (competition.clubs.includes(randomClub)) {
              player.league = competition.name;
            }
          }, player);
          playerVault.push(player);
        });
      } else {
        throw new Error("Could not fetch player");
      }
    } catch (error) {
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

    const completePlayer = { ...player, cleanedName: cleanedName };
    return completePlayer;
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
          const cleaned = cleanName({ name: name, id: 0 });
          return cleaned.cleanedName;
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
        apiError,
        league,
        setLeague,
        fetchPlayer,
        highScore,
        leagueScores,
        isGameOver,
        setIsGameOver,
        loseGame,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
