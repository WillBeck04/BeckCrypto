import { TrendingCoins, getTrendingCoins } from "@/utils/getTrendingCoins";
import Image from "next/image";


export async function TrendingCoins() {
  const trendingCoins = await getTrendingCoins();
  return (
    <>
      <h2>Trending coins</h2>{" "}
      <section className="flex gap-5">
        {trendingCoins.map((coin) => (
          <TrendingCoin key={coin.item.id} coin={coin.item} />
        ))}
      </section>
    </>
  );
}

function TrendingCoin({ coin }: { coin: TrendingCoins[number]["item"] }) {
  return (
    <div className="border p-3 w-48 h-auto rounded-md">
      <p>#{coin.market_cap_rank}</p>
      <Image
        src={coin.small}
        alt="coin-logo"
        width={28}
        height={28}
        className="rounded-full"
      />
      <p>{coin.name}</p>
      <p>{coin.symbol}</p>
    </div>
  );
}
