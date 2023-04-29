'use client'
import { CryptoData } from '@/lib/getCryptoData'
import { Input } from '../../components/ui/input'
import { FormEvent, useState } from 'react'
import { Button } from '../../components/ui/button'
import { usePortfolioDispatch } from '../portfolio-provider'
import { moneyFormat } from '@/lib/formatter'

export function TransactionForm({
  selectedCoin,
  closeModal,
  transaction,
}: {
  selectedCoin: CryptoData[number]
  closeModal: () => void
  transaction: 'buy' | 'sell'
}) {
  const [quantity, setQuantity] = useState(0)
  const dispatch = usePortfolioDispatch()

  function handleAddTransaction(e: FormEvent) {
    e.preventDefault()
    dispatch({
      type: 'added',
      transaction: {
        name: selectedCoin.name,
        quantity: transaction === 'buy' ? quantity : -quantity,
        price: selectedCoin.current_price,
        cost:
          transaction === 'buy'
            ? quantity * selectedCoin.current_price
            : -quantity * selectedCoin.current_price,
      },
    })
    closeModal()
  }

  return (
    <form className="mt-4 space-y-4" onSubmit={handleAddTransaction}>
      <fieldset className="space-y-1">
        <label className="text-sm text-slate-700 dark:text-slate-300">
          Current Price
        </label>
        <Input
          value={moneyFormat(selectedCoin.current_price)}
          disabled={true}
        />
      </fieldset>
      <fieldset className="space-y-1">
        <label className="text-sm text-slate-700 dark:text-slate-300">
          Quantity
        </label>
        <Input
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          type="number"
          min="0.01"
          step="any"
          placeholder="0.00"
          className="dark:bg-slate-700"
        />
      </fieldset>
      <div className="mt-3">
        <h3 className="text-lg font-semibold">Total Cost</h3>
        <p>{moneyFormat(quantity * selectedCoin.current_price)}</p>
      </div>
      <Button type="submit">
        {transaction === 'buy' ? 'Buy' : 'Sell'} Coin
      </Button>
    </form>
  )
}
