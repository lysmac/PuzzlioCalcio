import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useContext } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";
import { ThemeContext } from "../../../contexts/ThemeContext";

export default function SelectLetters() {
  const { theme } = useContext(ThemeContext);
  const { numberOfLetters, setNumberOfLetters } = useContext(PlayerContext);

  const handleChange = (event: SelectChangeEvent) => {
    setNumberOfLetters(event.target.value);
  };

  const letterOptions = ["4-6", "7-8", "9-10"];

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
        value={numberOfLetters}
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
        {letterOptions.map((option) => (
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
