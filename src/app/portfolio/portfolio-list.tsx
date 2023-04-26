'use client'

import { useContext } from 'react'
import { PortfolioContext } from '../providers'

export default function PortfolioList() {
  const { portfolio } = useContext(PortfolioContext)
  return (
    <div className="mb-6">
      <h3 className="text-xl font-medium">Transactions</h3>
      {portfolio.map((coin, idx) => (
        <div key={idx} className="flex space-x-3">
          <p>Price: {coin.price}</p>
          <p>Coin: {coin.name}</p>
          <p>Total Cost: {coin.cost}</p>
        </div>
      ))}
    </div>
  )
}
