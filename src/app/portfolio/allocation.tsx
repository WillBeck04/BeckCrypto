'use client'
import { DonutChart, Legend } from '@tremor/react'
import { Transaction } from '../portfolio-provider'
import { useMemo } from 'react'
import { Title } from './dashboard'
import { Card } from '@/components/ui/card'

interface Allocation {
  name: string
  cost: number
}

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`

export function Allocation({ portfolio }: { portfolio: Transaction[] }) {
  const allocation = useMemo(() => {
    return portfolio.reduce((acc: Allocation[], curr) => {
      const existing = acc.find((item) => item.name === curr.name)
      if (existing) {
        existing.cost += curr.cost
      } else {
        acc.push({ name: curr.name, cost: curr.cost })
      }
      return acc.filter((item) => item.cost > 0)
    }, [])
  }, [portfolio])

  console.log(allocation)

  return (
    <Card>
      <Title>Allocation</Title>
      <DonutChart
        className="mt-6"
        data={allocation}
        category="cost"
        index="name"
        valueFormatter={valueFormatter}
        colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
      />
      <Legend
        categories={allocation.map((asset) => asset.name)}
        colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
      />
    </Card>
  )
}
