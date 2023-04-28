'use client'
import { DonutChart } from '@tremor/react'
import { Transaction, usePortfolio } from '../portfolio-provider'
import { useMemo } from 'react'

interface Allocation {
  name: string
  cost: number
}

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`

export function Allocation({ portfolio }: { portfolio: Transaction[] }) {
  const result = useMemo(() => {
    return portfolio.reduce((acc: Allocation[], curr) => {
      const existing = acc.find((item) => item.name === curr.name)
      if (existing) {
        existing.cost += curr.cost
      } else {
        acc.push({ name: curr.name, cost: curr.cost })
      }
      return acc
    }, [])
  }, [portfolio])

  console.log(result)

  return (
    <div className="mt-6 max-w-lg flex-1 rounded-md border border-slate-300 bg-slate-100 px-3 py-6 shadow dark:border-slate-700 dark:bg-slate-800 lg:mt-0">
      <h2 className="ml-3 text-xl font-medium lg:text-2xl">Allocation</h2>
      <DonutChart
        className="mt-6"
        data={result}
        category="cost"
        index="name"
        valueFormatter={valueFormatter}
        colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
      />
    </div>
  )
}
