import { moneyFormat } from '@/lib/formatter'
import { CryptoDetails } from '@/lib/getCryptoDetails'
import Image from 'next/image'
import { ReactNode } from 'react'

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
        <MarketCard>
          Market Cap:{' '}
          <span className="text-xl font-bold">
            {coinData.market_data?.market_cap.usd
              ? moneyFormat(coinData.market_data.market_cap.usd)
              : 'No data'}
          </span>
        </MarketCard>
        <MarketCard>
          Fully Diluted Market Cap:{' '}
          <span className="text-xl font-bold">
            {coinData.market_data?.fully_diluted_valuation.usd
              ? moneyFormat(coinData.market_data.fully_diluted_valuation.usd)
              : 'No data'}
          </span>
        </MarketCard>
        <MarketCard>
          Volume 24h:{' '}
          <span className="text-xl font-bold">
            {coinData.market_data?.high_24h.usd
              ? moneyFormat(coinData.market_data.high_24h.usd)
              : 'No data'}
          </span>
        </MarketCard>
        <MarketCard>
          {' '}
          Circulating supply:{' '}
          <span className="text-xl font-bold">
            {coinData.market_data?.circulating_supply
              ? moneyFormat(coinData.market_data.circulating_supply)
              : 'No data'}
          </span>
        </MarketCard>
      </div>
    </div>
  )
}

function MarketCard({ children }: { children: ReactNode }) {
  return (
    <div className="mt-5 rounded-md border border-slate-300 px-3 py-6 shadow-sm dark:border-slate-700">
      {children}
    </div>
  )
}
