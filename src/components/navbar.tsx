import { formatter } from "@/utils/formatter";
import { z } from "zod";
import ThemeSwitch from "./theme-switch";
import { getGlobalCryptoData } from "@/utils/getGlobalData";
import { Container } from "./container";

export async function Navbar() {
  const globalData = await getGlobalCryptoData();
  return (
    <header className="p-5 border-b">
      <Container>
        <ul className="flex gap-3 text-xs font-medium">
          <li>
            Cryptos:{" "}
            <span className="text-indigo-500">
              {globalData.active_cryptocurrencies}
            </span>
          </li>
          <li>
            Markets:{" "}
            <span className="text-indigo-500">{globalData.markets}</span>
          </li>
          <li>
            Market Cap:{" "}
            <span className="text-indigo-500">
              ${formatter.format(globalData.total_market_cap.usd)}
            </span>
          </li>
          <li>
            Volume:{" "}
            <span className="text-indigo-500">
              ${formatter.format(globalData.total_volume.usd)}
            </span>
          </li>
          <li>
            Dominance:{" "}
            <span className="text-indigo-500">
              BTC: {globalData.market_cap_percentage.btc.toFixed(2)}% ETH:{" "}
              {globalData.market_cap_percentage.eth.toFixed(2)}%
            </span>
          </li>
        </ul>
        <ThemeSwitch />
      </Container>
    </header>
  );
}
