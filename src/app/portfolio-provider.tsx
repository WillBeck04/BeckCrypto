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

export interface Transaction {
  name: string
  price: number
  quantity: number
  cost: number
}

type ActionType =
  | {
      type: 'added'
      transaction: Transaction
    }
  | { type: 'removed'; index: number }

export const PortfolioContext = createContext<Transaction[]>([])
export const PortfolioDispatchContext = createContext<Dispatch<ActionType>>(
  {} as Dispatch<ActionType>
)

function portfolioReducer(portfolio: Transaction[], action: ActionType) {
  switch (action.type) {
    case 'added': {
      return [...portfolio, action.transaction]
    }
    case 'removed': {
      return portfolio.filter((t) => portfolio.indexOf(t) !== action.index)
    }
  }
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [initialPortfolio, setInitialPortfolio] = useLocalStorage<
    Transaction[]
  >('portfolio', [])
  const [portfolio, dispatch] = useReducer(portfolioReducer, initialPortfolio)

  useEffect(() => {
    setInitialPortfolio(portfolio)
  }, [portfolio, setInitialPortfolio])

  return (
    <>
      <PortfolioContext.Provider value={portfolio}>
        <PortfolioDispatchContext.Provider value={dispatch}>
          {children}
        </PortfolioDispatchContext.Provider>
      </PortfolioContext.Provider>
    </>
  )
}

export function usePortfolio() {
  return useContext(PortfolioContext)
}

export function usePortfolioDispatch() {
  return useContext(PortfolioDispatchContext)
}
