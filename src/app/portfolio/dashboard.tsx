'use client'

import { cn } from '@/lib/cn'
import { usePortfolio } from '../portfolio-provider'
import { useMemo } from 'react'
import { Allocation } from './allocation'
import { PortfolioTable } from './portfolio-table'
import { AddTransaction } from './add-transaction'
import type { CryptoData } from '@/lib/getCryptoData'
import { moneyFormat } from '@/lib/formatter'

export function Dashboard({ cryptos }: { cryptos: CryptoData }) {
  const portfolio = usePortfolio()

  const totalBalance = useMemo(() => {
    const result = portfolio.reduce(
      (accumulator, currentValue) => accumulator + currentValue.cost,
      0
    )
    return result
  }, [portfolio])
  return (
    <>
      <div>
        <div className="mb-6">
          <h2 className=" text-slate-700 dark:text-slate-300">
            Current Balance
          </h2>
          <p
            className={cn(
              'mt-1 text-2xl lg:text-3xl',
              totalBalance > 0 ? 'text-green-500' : 'text-red-500'
            )}
          >
            {moneyFormat(totalBalance)}
          </p>
        </div>
        <Allocation portfolio={portfolio} />
      </div>
      {portfolio.length > 0 ? (
        <PortfolioTable portfolio={portfolio} />
      ) : (
        <p className="mt-6 lg:mt-12">
          You have no transactions in your portfolio yet. Add one!
        </p>
      )}
      <AddTransaction cryptos={cryptos} />
    </>
  )
}
