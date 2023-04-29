'use client'
import { Card, Title, AreaChart } from '@tremor/react'
import { ChartData } from '@/lib/getCryptoChart'
import { useMemo } from 'react'

const dataFormatter = (number: number) => {
  return '$ ' + Intl.NumberFormat('us').format(number).toString()
}

export function CoinChart({
  marketData,
  name,
}: {
  marketData: ChartData
  name: string
}) {
  const chartData = useMemo(() => {
    return marketData.prices.map((price) => {
      const date = new Date(price[0])
      const formattedDate = `${date.toLocaleString('default', {
        month: 'short',
      })} ${date.getDate()}`
      const formattedPrice = Math.round(price[1])
      return { date: formattedDate, Price: formattedPrice }
    })
  }, [marketData.prices])

  return (
    <div className="mt-10 w-full lg:w-[90%]">
      <h3 className="text-2xl font-bold">{name} price chart (7d)</h3>
      <Card className="mt-3 border-none border-indigo-500/10 bg-transparent shadow-none outline-none ring-1 ring-slate-300 dark:ring-slate-700">
        <AreaChart
          className="mt-4 h-72"
          data={chartData}
          index="date"
          categories={['Price']}
          colors={['indigo']}
          valueFormatter={dataFormatter}
        />
      </Card>
    </div>
  )
}
