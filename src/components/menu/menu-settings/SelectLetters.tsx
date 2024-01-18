import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../ThemeContext";

export default function SelectLetters() {
  const { theme } = useContext(ThemeContext);
  const initialNumberOfLetters =
    localStorage.getItem("numberOfLetters") || "4-6";
  const [numberOfLetters, setNumberOfLetters] = useState(
    initialNumberOfLetters
  );

  const handleChange = (event: SelectChangeEvent) => {
    setNumberOfLetters(event.target.value);
  };

  const letterOptions = ["4-6", "7-8", "9-10"];
  useEffect(() => {
    localStorage.setItem("numberOfLetters", numberOfLetters);
  }, [numberOfLetters]);

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
        }}
      >
        {letterOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
