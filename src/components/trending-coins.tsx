import { TrendingCoins, getTrendingCoins } from "@/utils/getTrendingCoins";
import Image from "next/image";
import Link from "next/link";

export async function TrendingCoins() {
  const trendingCoins = await getTrendingCoins();
  return (
    <div className="mt-6  px-4 lg:px-0">
      <h2 className="lg:text-xl text-lg font-semibold">Trending coins</h2>{" "}
      <div className="flex lg:flex-wrap gap-6 py-3 mt-2 overflow-auto">
        {trendingCoins.map((coin) => (
          <TrendingCoin key={coin.item.id} coin={coin.item} />
        ))}
      </div>
    </div>
  );
}

function TrendingCoin({ coin }: { coin: TrendingCoins[number]["item"] }) {
  return (
    <Link href={`/cryptos/${coin.id}`}>
      <div className="border p-3 lg:w-64 text-sm shadow-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-800 dark:shadow-none font-medium shadow-sm h-auto min-w-max rounded-md">
        <p>Rank {coin.market_cap_rank}</p>

        <div className="flex items-center w-full gap-2 mt-2">
          <Image
            src={coin.small}
            alt="coin-logo"
            width={24}
            height={24}
            loading="lazy"
            className="w-6 h-6 rounded-full"
          />
          <p className="font-semibold hidden lg:block">{coin.name}</p>
          <p className="text-slate-700 dark:text-slate-300">{coin.symbol}</p>
        </div>
      </div>
    </Link>
  );
}
