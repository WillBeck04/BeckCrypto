import { TrendingCoins } from '@/components/trending-coins'
import { getCryptoDetails } from '@/lib/getCryptoDetails'
import { CoinInfo } from './coin-info'
import { CoinDescription } from './coin-description'
import { CoinChart } from './coin-chart'
import { getCryptoChart } from '@/lib/getCryptoChart'
import { CoinNews } from './coin-news'
import { Suspense } from 'react'

export default async function CryptoPage({
  params,
}: {
  params: { id: string }
}) {
  const coinDetails = getCryptoDetails(params.id)
  const coinChart = getCryptoChart(params.id)

  const [coinDetailsData, coinChartData] = await Promise.all([
    coinDetails,
    coinChart,
  ])

  return (
    <div>
      <div className="flex grid-cols-8 flex-col lg:grid lg:gap-10">
        <section className="col-span-6">
          <CoinInfo coinData={coinDetailsData} />
          {coinDetailsData.market_data?.sparkline_7d ? (
            <CoinChart marketData={coinChartData} name={coinDetailsData.name} />
          ) : null}
          <CoinDescription
            name={coinDetailsData.name}
            description={coinDetailsData.description}
          />
        </section>

        <div className="col-span-2 flex flex-col gap-5">
          {/* @ts-expect-error Async Server Component */}
          <TrendingCoins />
        </div>

        <Suspense fallback={'Loading...'}>
          {/* @ts-expect-error Async Server Component */}
          <CoinNews id={params.id} />
        </Suspense>
      </div>
    </div>
  )
}
