import { getCryptoData } from '@/utils/getCryptoData'
import { WatchlistInfo } from './watchlistInfo'
import { Container } from '@/components/container'

export default async function WatchlistPage() {
  const cryptoData = await getCryptoData()
  return (
    <div className='min-h-[600px] py-12 px-4'>
      <WatchlistInfo cryptoData={cryptoData} />
    </div>
  )
}
