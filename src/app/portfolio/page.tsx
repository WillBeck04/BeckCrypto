import { AddTransaction } from './add-transaction'
import { getCryptoData } from '@/utils/getCryptoData'
import { PortfolioTable } from './portfolio-table'
import { Allocation } from './allocation'
import { Dashboard } from './dashboard'

export default async function PortfolioPage() {
  const cryptos = await getCryptoData()

  return (
    <div>
      <Dashboard cryptos={cryptos} />
    </div>
  )
}
