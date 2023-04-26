'use client'
import { CryptoData } from '@/utils/getCryptoData'
import { Input } from './ui/input'
import { formatter } from '@/utils/formatter'
import { FormEvent, useContext, useState } from 'react'
import { PortfolioContext } from '@/app/providers'

export function PortfolioForm({
  selectedCoin,
}: {
  selectedCoin: CryptoData[number]
}) {
  const [quantity, setQuantity] = useState(0)
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
  }

  return (
    <form className="space-y-4" onSubmit={handleAddTransaction}>
      <fieldset className="space-y-2">
        <label className="text-sm">Name</label>
        <Input value={selectedCoin.name} disabled={true} />
      </fieldset>
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
          min={0}
          step={0.1}
          className="dark:bg-slate-700"
        />
      </fieldset>
      <div className="mt-3">
        <h3 className="text-lg font-semibold">Total Cost</h3>
        <p>${formatter.format(quantity * selectedCoin.current_price)}</p>
      </div>
      <button type="submit">Buy Coin</button>
    </form>
  )
}
