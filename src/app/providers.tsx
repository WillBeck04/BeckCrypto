"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, createContext } from "react";
import { useLocalStorage } from "usehooks-ts";
import { SetValue } from "./hooks/useLocalStorage";

export const WatchlistContext = createContext<{
  watchlist: string[];
  setWatchlist: SetValue<string[]>;
}>({
  watchlist: [],
  setWatchlist: () => {},
});

export function Providers({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useLocalStorage<string[]>("watchlist", []);
  return (
    <ThemeProvider attribute="class">
      <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
        {children}
      </WatchlistContext.Provider>
    </ThemeProvider>
  );
}
