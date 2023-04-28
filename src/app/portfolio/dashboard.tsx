'use client'

import { cn } from '@/utils/cn'
import { usePortfolio } from '../portfolio-provider'
import { useMemo } from 'react'
import { Allocation } from './allocation'
import { PortfolioTable } from './portfolio-table'
import { AddTransaction } from './add-transaction'
import { CryptoData } from '@/utils/getCryptoData'
import { moneyFormat } from '@/utils/formatter'

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
      <PortfolioTable portfolio={portfolio} />
      <AddTransaction cryptos={cryptos} />
    </>
  )
}
