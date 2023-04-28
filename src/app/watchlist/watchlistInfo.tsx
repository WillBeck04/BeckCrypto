'use client'

import { useContext, useEffect, useState } from 'react'
import { CryptoData } from '@/utils/getCryptoData'
import Link from 'next/link'
import { Table } from '@/components/table'
import { useWatchlist } from '../watchlist-provider'

export function WatchlistInfo({ cryptoData }: { cryptoData: CryptoData }) {
  const [watchlistData, setWatchlistData] = useState<CryptoData>()
  const watchlist = useWatchlist()

  useEffect(() => {
    const filteredData = cryptoData.filter((coin) =>
      watchlist.includes(coin.id)
    )

    setWatchlistData(filteredData)
  }, [cryptoData, watchlist])

  if (watchlistData?.length === 0) {
    return (
      <div>
        <p>Add coins to your watchlist to see them here!</p>
        <Link href="/">Add Coins</Link>
      </div>
    )
  }
  if (!watchlistData) {
    return null
  }

  return <Table cryptoData={watchlistData} />
}
