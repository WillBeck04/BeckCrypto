import { moneyFormat } from '@/utils/formatter'
import { getGlobalCryptoData } from '@/utils/getGlobalData'

export async function InfoNav() {
  const globalData = await getGlobalCryptoData()
  return (
    <ul className="flex gap-3 overflow-x-auto whitespace-nowrap px-4 py-5 text-xs font-medium lg:px-6">
      <li className="inline-flex gap-1">
        <p>Cryptos:</p>
        <span className="text-indigo-500 dark:text-indigo-400 ">
          {globalData.active_cryptocurrencies}
        </span>
      </li>
      <li className="inline-flex gap-1">
        <p>Market Cap</p>
        <span className="text-indigo-500 dark:text-indigo-400 ">
          {globalData.markets}
        </span>
      </li>
      <li className="inline-flex gap-1">
        <p>Market Cap:</p>
        <span className="text-indigo-500 dark:text-indigo-400">
          {moneyFormat(globalData.total_market_cap.usd)}
        </span>
      </li>
      <li className="inline-flex gap-1">
        <p>Volume: </p>
        <span className="text-indigo-500 dark:text-indigo-400">
          {moneyFormat(globalData.total_volume.usd)}
        </span>
      </li>
      <li className="inline-flex gap-1">
        <p>Dominance: </p>
        <span className="text-indigo-500 dark:text-indigo-400">
          BTC: {globalData.market_cap_percentage.btc.toFixed(2)}%
        </span>
        <span className="text-indigo-500 dark:text-indigo-400">
          ETH: {globalData.market_cap_percentage.eth.toFixed(2)}%
        </span>
      </li>
    </ul>
  )
}
