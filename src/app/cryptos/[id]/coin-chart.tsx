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

  console.log(chartData)
  return (
    <div className="w-full lg:w-2/3">
      <Card>
        <Title>Coin chart over time (USD)</Title>
        <AreaChart
          className="mt-4 h-72"
          data={chartData}
          index="date"
          categories={['Coin Price']}
          colors={['indigo']}
          valueFormatter={dataFormatter}
        />
      </Card>
    </div>
  )
}
