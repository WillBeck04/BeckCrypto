import { AddTransaction } from './add-transaction'
import { getCryptoData } from '@/utils/getCryptoData'
import { PortfolioTable } from './portfolio-table'
import { Allocation } from './allocation'

export default async function PortfolioPage() {
  const cryptos = await getCryptoData()

  return (
    <div className="min-h-[800px] py-12">
      <div className="space-y-5">
        <PortfolioTable />
        <AddTransaction cryptos={cryptos} />
      </div>
    </div>
  )
}
