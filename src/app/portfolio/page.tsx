import { getCryptoData } from '@/lib/getCryptoData'
import { Dashboard } from './dashboard'

export default async function PortfolioPage() {
  const cryptos = await getCryptoData()

  return (
    <>
      <Dashboard cryptos={cryptos} />
    </>
  )
}
