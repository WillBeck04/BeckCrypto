import { TrendingCoins, getTrendingCoins } from '@/lib/getTrendingCoins'
import Image from 'next/image'
import Link from 'next/link'

export async function TrendingCoins() {
  const trendingCoins = await getTrendingCoins()
  return (
    <div className="mt-6 lg:px-0">
      <h2 className="text-lg font-semibold">William's Portofolio</h2>{' '}
      <div className="flex gap-6 overflow-auto py-3 lg:flex-wrap">
        {trendingCoins.map((coin) => (
          <TrendingCoin key={coin.item.id} coin={coin.item} />
        ))}
      </div>
    </div>
  )
}

function TrendingCoin({ coin }: { coin: TrendingCoins[number]['item'] }) {
  return (
    <Link href={`/cryptos/${coin.id}`}>
      <div className="h-auto min-w-max rounded-md border bg-slate-50 p-3 text-sm font-medium shadow-sm shadow-slate-200 transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:shadow-none hover:dark:bg-slate-700 lg:w-64">
        <p>Rank {coin.market_cap_rank}</p>

        <div className="mt-2 flex w-full items-center gap-2">
          <Image
            src={coin.small}
            alt="coin-logo"
            width={24}
            height={24}
            loading="lazy"
            className="h-6 w-6 rounded-full"
          />
          <p className="hidden font-semibold lg:block">{coin.name}</p>
          <p className="text-slate-700 dark:text-slate-300">{coin.symbol}</p>
        </div>
      </div>
    </Link>
  )
}
