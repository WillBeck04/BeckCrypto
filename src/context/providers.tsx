'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { WatchlistProvider } from './watchlist-provider'
import { PortfolioProvider } from './portfolio-provider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <WatchlistProvider>
        <PortfolioProvider>{children}</PortfolioProvider>
      </WatchlistProvider>
    </ThemeProvider>
  )
}
