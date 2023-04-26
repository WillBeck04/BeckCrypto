'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode, createContext } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { SetValue } from './hooks/useLocalStorage'

interface Portfolio {
  id: string
  name: string
  shares: number
}

export const WatchlistContext = createContext<{
  watchlist: string[]
  setWatchlist: SetValue<string[]>
}>({
  watchlist: [],
  setWatchlist: () => {},
})

export const PortfolioContext = createContext<{
  portfolio: Portfolio[]
  setPortfolio: SetValue<Portfolio[]>
}>({
  portfolio: [],
  setPortfolio: () => {},
})

export function Providers({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useLocalStorage<string[]>('watchlist', [])
  const [portfolio, setPortfolio] = useLocalStorage<Portfolio[]>(
    'portfolio',
    []
  )
  return (
    <ThemeProvider attribute="class">
      <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
        <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
          {children}
        </PortfolioContext.Provider>
      </WatchlistContext.Provider>
    </ThemeProvider>
  )
}
