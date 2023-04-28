'use client'
import { DonutChart } from '@tremor/react'
import { Transaction, usePortfolio } from '../portfolio-provider'
import { useState } from 'react'

const cities = [
  {
    name: 'New York',
    sales: 9800,
  },
  {
    name: 'London',
    sales: 4567,
  },
  {
    name: 'Hong Kong',
    sales: 3908,
  },
  {
    name: 'San Francisco',
    sales: 2400,
  },
  {
    name: 'Singapore',
    sales: 1908,
  },
  {
    name: 'Zurich',
    sales: 1398,
  },
]

interface Allocation {
  name: string
  cost: number
}

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`

export function Allocation({ portfolio }: { portfolio: Transaction[] }) {
  const result = portfolio.reduce((acc: Allocation[], curr) => {
    const existing = acc.find(
      (item) => item.name === curr.name && item.cost > 0
    )
    if (existing) {
      existing.cost += curr.cost
    } else {
      acc.push({ name: curr.name, cost: Math.ceil(curr.cost) })
    }
    return acc
  }, [])

  console.log(result)

  return (
    <div className="mt-6 max-w-lg flex-1 rounded-md border border-slate-300 bg-slate-100 px-3 py-6 shadow lg:mt-0">
      <h2 className="ml-3 text-xl font-medium lg:text-2xl">Allocation</h2>
      <DonutChart
        className="mt-6"
        data={result}
        category="cost"
        index="name"
        valueFormatter={valueFormatter}
        colors={['slate', 'indigo']}
      />
    </div>
  )
}
