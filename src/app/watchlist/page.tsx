import { getCryptoData } from '@/lib/getCryptoData'
import { WatchlistInfo } from './watchlistInfo'

export default async function WatchlistPage() {
  const cryptoData = await getCryptoData()
  return (
    <div className="min-h-[600px] px-4">
      <WatchlistInfo cryptoData={cryptoData} />
    </div>
  )
}
