import { Card } from '@/components/ui/card'
import { moneyFormat } from '@/lib/formatter'
import { CryptoDetails } from '@/lib/getCryptoDetails'
import Image from 'next/image'
import { PriceProgress } from './coin-progress'

export function CoinInfo({ coinData }: { coinData: CryptoDetails }) {
  return (
    <div className="flex flex-col">
      <div>
        <div className="flex items-center gap-3">
          <Image
            src={coinData.image.large}
            width={40}
            height={40}
            alt="coin"
            quality={100}
          ></Image>
          <h3 className="text-3xl font-bold">{coinData.name}</h3>
          <div className="w-16 rounded bg-gray-200 px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700">
            {coinData.symbol.toUpperCase()}
          </div>
        </div>
        <div className="mt-5 flex gap-3">
          <div className="rounded bg-gray-400 px-3 py-1 text-xs font-semibold text-gray-50 dark:bg-gray-600">
            {coinData.market_cap_rank
              ? `Rank #${coinData.market_cap_rank}`
              : 'Unranked'}
          </div>
          <div className="rounded bg-gray-200 px-3 py-1 text-xs font-semibold hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-600">
            <a href={coinData.links.homepage[0]} target={`_blank`}>
              {coinData.links.homepage[0]}
            </a>
          </div>
        </div>
      </div>
      <div className="mt-5 lg:w-1/2">
        <p className="text-xl font-bold text-gray-900 [text-wrap:balance] dark:text-gray-50">
          {coinData.name} Price ({coinData.symbol.toUpperCase()})
        </p>
        <div className="flex items-center gap-3 align-middle">
          <p className="text-3xl font-bold antialiased">
            {coinData.market_data?.current_price.usd &&
              moneyFormat(coinData.market_data.current_price.usd)}
          </p>
          <div
            className={
              coinData.market_data?.price_change_percentage_24h &&
              coinData.market_data?.price_change_percentage_24h > 0
                ? `rounded bg-green-500  px-2 py-1 text-gray-50`
                : `rounded bg-red-500 px-2 py-1 text-gray-50`
            }
          >
            {coinData.market_data?.price_change_percentage_24h &&
              Math.round(
                coinData.market_data.price_change_percentage_24h * 100
              ) / 100}
            %
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Low:
            <span className="ml-1 font-semibold text-slate-900 dark:text-slate-50">
              {coinData.market_data?.low_24h.usd &&
                moneyFormat(coinData.market_data?.low_24h.usd)}
            </span>
          </p>
          {coinData.market_data && (
            <PriceProgress
              currentPrice={coinData.market_data.current_price.usd}
              highestPrice={coinData.market_data.high_24h.usd}
              lowestPrice={coinData.market_data.low_24h.usd}
            />
          )}
          <p className="text-xs  text-slate-600 dark:text-slate-400">
            High:
            <span className="ml-1 font-semibold text-slate-900 dark:text-slate-50">
              {coinData.market_data?.high_24h.usd &&
                moneyFormat(coinData.market_data?.high_24h.usd)}
            </span>
          </p>
        </div>

        <MarketCard
          title="Market cap:"
          dataProperty={coinData.market_data?.market_cap.usd}
        />
        <MarketCard
          title="Dilluted valuation:"
          dataProperty={coinData.market_data?.fully_diluted_valuation.usd}
        />
        <MarketCard
          title="Volume 24h:"
          dataProperty={coinData.market_data?.high_24h.usd}
        />
        <MarketCard
          title="Circulating supply:"
          dataProperty={coinData.market_data?.circulating_supply}
        />
      </div>
    </div>
  )
}

function MarketCard({
  title,
  dataProperty,
}: {
  title: string
  dataProperty: number | undefined
}) {
  return (
    <Card>
      <span>{title}</span>{' '}
      <span className="text-xl font-bold">
        {dataProperty ? moneyFormat(dataProperty) : 'No data'}
      </span>
    </Card>
  )
}
