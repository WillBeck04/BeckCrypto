'use client'

import { cn } from '@/lib/cn'
import { usePortfolio } from '../portfolio-provider'
import { useMemo } from 'react'
import { Allocation } from './allocation'
import { PortfolioTable } from './portfolio-table'
import { AddTransaction } from './add-transaction'
import type { CryptoData } from '@/lib/getCryptoData'
import { moneyFormat } from '@/lib/formatter'
import { Card } from '@/components/ui/card'
import { Title } from '@/components/ui/title'

export function Dashboard({ cryptos }: { cryptos: CryptoData }) {
  const portfolio = usePortfolio()

  const totalBalance = useMemo(() => {
    const result = portfolio.reduce(
      (accumulator, currentValue) => accumulator + currentValue.cost,
      0
    )
    return result
  }, [portfolio])

  const biggestBuy = useMemo(() => {
    const costs = portfolio.map((t) => t.cost)

    return Math.max(...costs)
  }, [portfolio])

  const biggestSell = useMemo(() => {
    const costs = portfolio.map((t) => t.cost)

    const minCost = Math.min(...costs)

    return minCost < 0 ? minCost : 0
  }, [portfolio])

  return (
    <>
      <div>
        <Balance totalBalance={totalBalance} />
        <div className="flex flex-col justify-between lg:flex-row">
          <Allocation portfolio={portfolio} />
          <Card>
            <Title>Stats</Title>
            <div className="mt-3 space-y-3">
              <p className="flex flex-col text-sm text-slate-700 dark:text-slate-300">
                Biggest Buy:
                <span className="text-xl font-medium text-green-500">
                  {moneyFormat(biggestBuy)}
                </span>
              </p>
              <p className="flex flex-col text-sm text-slate-700 dark:text-slate-300">
                Biggest Sell:
                <span className="text-xl font-medium text-red-500">
                  {moneyFormat(biggestSell).replace('-', '')}
                </span>
              </p>
              <p className="flex flex-col text-sm text-slate-700 dark:text-slate-300">
                Transaction count:
                <span className="text-xl font-medium text-slate-900 dark:text-slate-50">
                  {portfolio.length}
                </span>
              </p>
            </div>
          </Card>
        </div>
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

function Balance({ totalBalance }: { totalBalance: number }) {
  return (
    <div>
      <h2 className=" text-slate-800 dark:text-slate-300">Current Balance</h2>
      <p
        className={cn(
          'mt-1 text-2xl lg:text-3xl',
          totalBalance > 0 ? 'text-green-500' : 'text-red-500'
        )}
      >
        {moneyFormat(totalBalance)}
      </p>
    </div>
  )
}
