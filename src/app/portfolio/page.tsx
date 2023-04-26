import { useContext } from 'react'
import { AddTransaction } from './add-transaction'
import { getCryptoData } from '@/utils/getCryptoData'
import PortfolioList from './portfolio-list'

export default async function PortfolioPage() {
  const cryptos = await getCryptoData()

  return (
    <div className="min-h-[800px] py-12">
      <div className="flex justify-between">
        <PortfolioList />
        <AddTransaction cryptos={cryptos} />
      </div>
    </div>
  )
}
