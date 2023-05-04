import { TrendingCoins } from '@/components/trending-coins'
import { getCryptoDetails } from '@/lib/getCryptoDetails'
import { CoinInfo } from './coin-info'
import { CoinDescription } from './coin-description'
import { CoinChart } from './coin-chart'
import { getCryptoChart } from '@/lib/getCryptoChart'
import { CryptoNews } from './cryptoNews'

export default async function CryptoPage({
  params,
}: {
  params: { id: string }
}) {
  const coinDetails = await getCryptoDetails(params.id)
  const coinChartData = await getCryptoChart(params.id)
  return (
    <div>
      <div className="flex grid-cols-8 flex-col lg:grid lg:gap-10">
        <section className="col-span-6">
          <CoinInfo coinData={coinDetails} />
          {coinDetails.market_data?.sparkline_7d ? (
            <CoinChart marketData={coinChartData} name={coinDetails.name} />
          ) : null}
          <CoinDescription
            name={coinDetails.name}
            description={coinDetails.description}
          />
        </section>

        <div className="col-span-2 flex flex-col gap-5">
          {/* @ts-expect-error Async Server Component */}
          <TrendingCoins />
        </div>

        {/* @ts-expect-error Async Server Component */}
        <CryptoNews id={params.id} />
      </div>
    </div>
  )
}
