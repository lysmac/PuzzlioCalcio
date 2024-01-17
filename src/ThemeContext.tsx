import React, { createContext, useEffect, useState } from "react";

interface ThemeContextValue {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      switch (prevTheme) {
        case "light":
          return "dark";
        case "dark":
          return "gazzetta";
        case "gazzetta":
          return "light";
        default:
          return "light";
      }
    });
  };

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark", "gazzetta");
    document.documentElement.classList.add(theme);
    localStorage.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
