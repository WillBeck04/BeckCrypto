import { formatter } from '@/utils/formatter'
import { CryptoDetails } from '@/utils/getCryptoDetails'
import Image from 'next/image'

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
          <button
            disabled
            className="w-16 rounded bg-gray-200 px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
          >
            {coinData.symbol.toUpperCase()}
          </button>
        </div>
        <div className="mt-5 flex gap-3">
          <button
            disabled
            className="rounded bg-gray-400 px-3 py-1 text-xs font-semibold text-gray-50 dark:bg-gray-600"
          >
            {coinData.market_cap_rank
              ? `Rank #${coinData.market_cap_rank}`
              : 'Unranked'}
          </button>
          <button className="rounded bg-gray-200 px-3 py-1 text-xs font-semibold hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-600">
            <a href={coinData.links.homepage[0]} target={`_blank`}>
              {coinData.links.homepage[0]}
            </a>
          </button>
        </div>
      </div>
      <div className="mt-5 lg:w-1/2">
        <p className="text-xl font-bold text-gray-900 [text-wrap:balance] dark:text-gray-50">
          {coinData.name} Price ({coinData.symbol.toUpperCase()})
        </p>
        <div className="flex items-center gap-3 align-middle">
          <p className="text-3xl font-bold antialiased">
            {coinData.market_data?.current_price.usd &&
              formatter.format(coinData.market_data.current_price.usd)}
          </p>
          <button
            disabled
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
          </button>
        </div>
        <div className="mt-5 rounded-lg p-3 shadow-sm dark:shadow-gray-700">
          Market Cap:{' '}
          <span className="text-xl font-bold">
            {coinData.market_data?.market_cap.usd
              ? formatter.format(coinData.market_data.market_cap.usd)
              : 'No data'}
          </span>
        </div>
        <div className="mt-5 rounded-lg p-3 shadow-sm dark:shadow-gray-700">
          Fully Diluted Market Cap:{' '}
          <span className="text-xl font-bold">
            {coinData.market_data?.fully_diluted_valuation.usd
              ? formatter.format(
                  coinData.market_data.fully_diluted_valuation.usd
                )
              : 'No data'}
          </span>
        </div>
        <div className="mt-5 rounded-lg p-3 shadow-sm dark:shadow-gray-700">
          Volume 24h:{' '}
          <span className="text-xl font-bold">
            {coinData.market_data?.high_24h.usd
              ? formatter.format(coinData.market_data.high_24h.usd)
              : 'No data'}
          </span>
        </div>
        <div className="mt-5 rounded-lg p-3 shadow-sm dark:shadow-gray-700 ">
          {' '}
          Circulating supply:{' '}
          <span className="text-xl font-bold">
            {coinData.market_data?.circulating_supply
              ? formatter.format(coinData.market_data.circulating_supply)
              : 'No data'}
          </span>
        </div>
      </div>
    </div>
  )
}
