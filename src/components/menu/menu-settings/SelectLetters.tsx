import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function SelectLetters() {
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

  return (
    <FormControl
      variant="outlined"
      sx={{
        ".MuiOutlinedInput-root": {
          "& fieldset": {
            color: "white",
          },
          "&:hover fieldset": {
            color: "white",
          },
          "&.Mui-focused fieldset": {
            color: "white",
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
            color: "black",
          },
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
