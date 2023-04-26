'use client'

import { useContext, useMemo } from 'react'
import { PortfolioContext } from '../providers'
import { formatter } from '@/utils/formatter'

export default function PortfolioList() {
  const { portfolio } = useContext(PortfolioContext)
  const totalAmount = useMemo(() => {
    const result = portfolio.reduce(
      (accumulator, currentValue) => accumulator + currentValue.cost,
      0
    )
    return result
  }, [portfolio])
  return (
    <div>
      <div className="mb-6">
        <h3 className="mb-3 text-xl font-medium">Transactions</h3>
        {portfolio.map((coin, idx) => (
          <div
            key={idx}
            className="mt-3 flex space-x-3 rounded-md bg-white/10 px-3 py-3 text-sm"
          >
            <p className="font-bold">{coin.name}</p>
            <p className="text-slate-700 dark:text-slate-300">
              Price: ${formatter.format(coin.price)}
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              Quantity: {coin.quantity}
            </p>
            <p>Cost: ${formatter.format(coin.cost)}</p>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <h3 className="text-xl font-medium">Total Amount Spend</h3>
        <div>{totalAmount}</div>
      </div>
    </div>
  )
}
