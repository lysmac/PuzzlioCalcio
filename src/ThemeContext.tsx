import React, { createContext, useEffect, useState } from "react";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (newTheme: Theme) => void;
}

export type Theme = "light" | "dark" | "gazzetta";

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(localStorage.getItem('theme') as Theme || 'light');

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };
  
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark', 'gazzetta');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
