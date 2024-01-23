import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useContext } from "react";
import { PlayerContext } from "../../../PlayerContext";
import { ThemeContext } from "../../../ThemeContext";

export default function SelectLeague() {
  const { theme } = useContext(ThemeContext);
  const { league, setLeague } = useContext(PlayerContext);

  const handleChange = (event: SelectChangeEvent) => {
    setLeague(event.target.value);
  };
  const leagueOptions = [
    "All leagues",
    "Premier League",
    "LaLiga",
    "Bundesliga",
    "Serie A",
    "Ligue 1",
  ];

  const color = theme === "dark" ? "#EDF1FD" : "#120A2E";

  return (
    <FormControl
      variant="outlined"
      sx={{
        ".MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: color,
          },
          "&:hover fieldset": {
            borderColor: color,
          },
          "&.Mui-focused fieldset": {
            borderColor: color,
          },
        },
      }}
    >
      <Select
        value={league}
        onChange={handleChange}
        displayEmpty
        className="w-32 h-8"
        sx={{
          ".MuiSelect-icon": {
            color: color,
          },
          color: color,
          textAlign: "center",
        }}
        MenuProps={{
          PaperProps: {
            style: {
              marginTop: "2px",
              width: "150px",
            },
          },
        }}
      >
        {leagueOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              padding: "0px",
              justifyContent: "center",
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
