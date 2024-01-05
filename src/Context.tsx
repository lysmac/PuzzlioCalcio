import { createContext } from "react";

interface ContextValue {
  x: string;
}

export interface ProviderProps {
  children: React.ReactNode;
}

export const Context = createContext<ContextValue>({
  x: "",
});

export default function NAMEProvider({ children }: ProviderProps) {
  return <Context.Provider value={{ x: "" }}>{children}</Context.Provider>;
}
