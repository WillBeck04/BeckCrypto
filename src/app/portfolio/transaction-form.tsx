'use client'
import { CryptoData } from '@/utils/getCryptoData'
import { Input } from '../../components/ui/input'
import { formatter } from '@/utils/formatter'
import { FormEvent, useContext, useState } from 'react'
import { Button } from '../../components/ui/button'
import { usePortfolio, usePortfolioDispatch } from '../portfolio-provider'

export function TransactionForm({
  selectedCoin,
  closeModal,
}: {
  selectedCoin: CryptoData[number]
  closeModal: () => void
}) {
  const [quantity, setQuantity] = useState(0)
  const dispatch = usePortfolioDispatch()

  function handleAddTransaction(e: FormEvent) {
    e.preventDefault()
    dispatch({
      type: 'added',
      transaction: {
        name: selectedCoin.name,
        quantity: quantity,
        price: selectedCoin.current_price,
        cost: quantity * selectedCoin.current_price,
      },
    })
    closeModal()
  }

  return (
    <form className="mt-4 space-y-4" onSubmit={handleAddTransaction}>
      <fieldset className="space-y-1">
        <label className="text-sm font-semibold uppercase">Current Price</label>
        <Input
          value={`$${formatter.format(selectedCoin.current_price)}`}
          disabled={true}
        />
      </fieldset>
      <fieldset className="space-y-1">
        <label className="text-sm font-semibold uppercase">Quantity</label>
        <Input
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          type="number"
          min="0.1"
          placeholder="0.00"
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
