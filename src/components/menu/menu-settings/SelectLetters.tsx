import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

export default function SelectLetters() {
  const [numberOfLetters, setNumberOfLetters] = useState("4-6");
  const handleChange = (event: SelectChangeEvent) => {
    setNumberOfLetters(event.target.value);
  };
  return (
    <FormControl
      variant="outlined"
      sx={{
        ".MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "red", // Change color
          },
          "&:hover fieldset": {
            borderColor: "red", // Change color
          },
          "&.Mui-focused fieldset": {
            borderColor: "red", // Change color
          },
        },
      }}
    >
      <Select
        value={numberOfLetters}
        onChange={handleChange}
        displayEmpty
        className="w-[150px] h-8"
        sx={{
          ".MuiSelect-icon": {
            color: "red", // Change color
          },
        }}
      >
        <MenuItem value="4-6">4-6</MenuItem>
        <MenuItem value="7-8">7-8</MenuItem>
        <MenuItem value="9-10">9-10</MenuItem>
      </Select>
    </FormControl>
  );
}
