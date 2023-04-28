'use client'
import { Card, Title, AreaChart } from '@tremor/react'
import { ChartData } from '@/utils/getCryptoChart'
import { useMemo } from 'react'

const dataFormatter = (number: number) => {
  return '$ ' + Intl.NumberFormat('us').format(number).toString()
}

export function CoinChart({ marketData }: { marketData: ChartData }) {
  const chartData = useMemo(() => {
    return marketData.prices.map((price) => {
      const date = new Date(price[0])
      const formattedDate = `${date.toLocaleString('default', {
        month: 'short',
      })} ${date.getDate()}`
      const formattedPrice = Math.round(price[1])
      return { date: formattedDate, price: formattedPrice }
    })
  }, [marketData.prices])

  return (
    <div className="w-full lg:w-2/3">
      <Card className="ring-none border border-indigo-500/10 bg-transparent">
        <AreaChart
          className="mt-4 h-72"
          data={chartData}
          index="date"
          categories={['price']}
          colors={['indigo']}
          valueFormatter={dataFormatter}
        />
      </Card>
    </div>
  )
}
