import { formatter } from "@/utils/formatter";
import { getGlobalCryptoData } from "@/utils/getGlobalData";

export async function InfoNav() {
  const globalData = await getGlobalCryptoData();
  return (
    <ul className="gap-3 text-xs py-5 px-4 lg:px-6 whitespace-nowrap font-medium flex overflow-x-auto">
      <li className="inline-flex gap-1">
        <p>Cryptos:</p>
        <span className="text-indigo-500">
          {globalData.active_cryptocurrencies}
        </span>
      </li>
      <li className="inline-flex gap-1">
        <p>Market Cap</p>
        <span className="text-indigo-500">{globalData.markets}</span>
      </li>
      <li className="inline-flex gap-1">
        <p>Market Cap:</p>
        <span className="text-indigo-500">
          ${formatter.format(globalData.total_market_cap.usd)}
        </span>
      </li>
      <li className="inline-flex gap-1">
        <p>Volume: </p>
        <span className="text-indigo-500">
          ${formatter.format(globalData.total_volume.usd)}
        </span>
      </li>
      <li className="inline-flex gap-1">
        <p>Dominance: </p>
        <span className="text-indigo-500">
          BTC: {globalData.market_cap_percentage.btc.toFixed(2)}%
        </span>
        <span className="text-indigo-500">
          ETH: {globalData.market_cap_percentage.eth.toFixed(2)}%
        </span>
      </li>
    </ul>
  );
}
