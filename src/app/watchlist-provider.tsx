'use client'

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { useLocalStorage } from 'usehooks-ts'

type ActionType =
  | {
      type: 'added'
      coin: string
    }
  | { type: 'removed'; id: string }

export const WatchlistContext = createContext<string[]>([])
export const WatchlistDispatchContext = createContext<Dispatch<ActionType>>(
  {} as Dispatch<ActionType>
)

function watchlistReducer(watchlist: string[], action: ActionType) {
  switch (action.type) {
    case 'added': {
      return [...watchlist, action.coin]
    }
    case 'removed': {
      return watchlist.filter((id) => id !== action.id)
    }
  }
}

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [initialWatchlist, setInitialWatchlist] = useLocalStorage<string[]>(
    'watchlist',
    []
  )
  const [watchlist, dispatch] = useReducer(watchlistReducer, initialWatchlist)

  useEffect(() => {
    setInitialWatchlist(watchlist)
  }, [watchlist, setInitialWatchlist])

  return (
    <>
      <WatchlistContext.Provider value={watchlist}>
        <WatchlistDispatchContext.Provider value={dispatch}>
          {children}
        </WatchlistDispatchContext.Provider>
      </WatchlistContext.Provider>
    </>
  )
}

export function useWatchlist() {
  return useContext(WatchlistContext)
}

export function useWatchlistDispatch() {
  return useContext(WatchlistDispatchContext)
}
