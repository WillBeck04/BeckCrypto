import { formatter } from "@/utils/formatter";
import ThemeSwitch from "./theme-switch";
import { getGlobalCryptoData } from "@/utils/getGlobalData";
import { Container } from "./container";

export function Navbar() {
  return (
    <header className="border-b">
      <Container>
        <div className="flex flex-col lg:flex-col-reverse">
          <nav className="w-full flex justify-between border-b lg:border-none py-5 px-4">
            <p className="font-bold text-xl">Crypto App</p>
            <button className="lg:hidden">Mobile Nav</button>
          </nav>
          <div className="flex justify-between gap-3 items-center">
            {/* @ts-expect-error Async Server Component */}
            <InfoNav />
            <div className="hidden lg:block">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

async function InfoNav() {
  const globalData = await getGlobalCryptoData();
  return (
    <ul className="gap-3 text-xs py-5 px-4 whitespace-nowrap font-medium flex overflow-x-auto">
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
