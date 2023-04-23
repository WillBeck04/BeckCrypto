import { getCryptoData } from '@/utils/getCryptoData'
import { WatchlistInfo } from './watchlistInfo'

export default async function WatchlistPage() {
  const cryptoData = await getCryptoData()
  return (
    <div>
      <WatchlistInfo cryptoData={cryptoData} />
    </div>
  )
}
