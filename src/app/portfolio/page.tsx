import { PortfolioForm } from '@/components/portfolio-form'
import { AddTransaction } from './add-transaction'
import { getCryptoData } from '@/utils/getCryptoData'

export default async function PortfolioPage() {
  const cryptos = await getCryptoData()
  return (
    <div className="min-h-[800px] py-12">
      <AddTransaction cryptos={cryptos} />
    </div>
  )
}
