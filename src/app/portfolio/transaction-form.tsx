'use client'
import { CryptoData } from '@/utils/getCryptoData'
import { Input } from '../../components/ui/input'
import { formatter } from '@/utils/formatter'
import { FormEvent, useContext, useState } from 'react'
import { PortfolioContext } from '@/app/providers'
import { Button } from '../../components/ui/button'

export function TransactionForm({
  selectedCoin,
  closeModal,
}: {
  selectedCoin: CryptoData[number]
  closeModal: () => void
}) {
  const [quantity, setQuantity] = useState(1)
  const { setPortfolio } = useContext(PortfolioContext)

  function handleAddTransaction(e: FormEvent) {
    e.preventDefault()
    setPortfolio((prev) => [
      ...prev,
      {
        name: selectedCoin.name,
        price: selectedCoin.current_price,
        quantity: quantity,
        cost: quantity * selectedCoin.current_price,
      },
    ])
    closeModal()
  }

  return (
    <form className="space-y-4 mt-3" onSubmit={handleAddTransaction}>
      <fieldset className="space-y-2">
        <label className="text-sm">Current Price</label>
        <Input
          value={`$${formatter.format(selectedCoin.current_price)}`}
          disabled={true}
        />
      </fieldset>
      <fieldset className="space-y-2">
        <label className="text-sm">Quantity</label>
        <Input
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          type="number"
          min={0.1}
          step={0.1}
          className="dark:bg-slate-700"
        />
      </fieldset>
      <div className="mt-3">
        <h3 className="text-lg font-semibold">Total Cost</h3>
        <p>${formatter.format(quantity * selectedCoin.current_price)}</p>
      </div>
      <Button type="submit">Buy Coin</Button>
    </form>
  )
}
