'use client'
import { Button } from '@/components/ui/button'
import type { CryptoData } from '@/lib/getCryptoData'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import { TransactionForm } from './transaction-form'
import { X } from 'lucide-react'

export function AddTransaction({ cryptos }: { cryptos: CryptoData }) {
  const [isOpen, setIsOpen] = useState(false)
  const [transaction, setTransaction] = useState<'buy' | 'sell'>('buy')

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className="mt-6">
      <div>
        <Button onClick={openModal} size="sm" className="text-sm">
          New Transaction
        </Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-800">
                  <div className="flex w-full items-center justify-between py-3">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium leading-6 text-slate-900 dark:text-slate-100"
                    >
                      Select coin
                    </Dialog.Title>
                    <button
                      type="button"
                      className="-mt-3 rounded-md border border-slate-300 bg-slate-200 p-1.5 text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200  dark:hover:border-slate-500"
                      onClick={closeModal}
                    >
                      <span className="sr-only">Close menu</span>
                      <X
                        className="h-6 w-6 text-slate-600 group-hover:text-slate-700 dark:text-slate-500 dark:group-hover:text-slate-400"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div className="my-3 flex w-full gap-3">
                    <Button
                      className="flex-1"
                      variant={transaction === 'buy' ? 'default' : 'ghost'}
                      onClick={() => setTransaction('buy')}
                    >
                      Buy
                    </Button>
                    <Button
                      className="flex-1"
                      variant={transaction === 'sell' ? 'default' : 'ghost'}
                      onClick={() => setTransaction('sell')}
                    >
                      Sell
                    </Button>
                  </div>

                  <div className="mt-4">
                    <SelectCoin
                      cryptos={cryptos}
                      closeModal={closeModal}
                      transaction={transaction}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

function SelectCoin({
  cryptos,
  closeModal,
  transaction,
}: {
  cryptos: CryptoData
  closeModal: () => void
  transaction: 'buy' | 'sell'
}) {
  const [selectedCoin, setSelectedCoin] = useState<CryptoData[number] | null>(
    null
  )
  const [query, setQuery] = useState('')

  const filteredCryptos =
    query === ''
      ? cryptos
      : cryptos.filter((crypto) => {
          return crypto.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedCoin} onChange={setSelectedCoin}>
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Type a coin"
        displayValue={(crypto: CryptoData[number]) =>
          selectedCoin ? crypto.name : ''
        }
        className="block w-full rounded-md border-0 px-3 py-2 text-slate-900 outline-none ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-700 dark:text-slate-100 dark:ring-slate-700 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
      />
      <Combobox.Options
        className="mt-5 max-h-52 overflow-y-auto"
        static={selectedCoin ? false : true}
      >
        {filteredCryptos.map((crypto) => (
          <Combobox.Option 
            key={crypto.id}
            value={crypto}
            className={({ active }) =>
              `relative cursor-pointer select-none rounded-md py-2 pl-6 pr-4 ${
                active ? 'bg-indigo-500 text-white' : null
              }`
            }
          >
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold">
              <Image src={crypto.image} alt="coin-img" width={24} height={24} />
              <p>{crypto.name}</p>
            </div>
          </Combobox.Option>
        ))}
      </Combobox.Options>
      {selectedCoin ? (
        <TransactionForm
          selectedCoin={selectedCoin}
          closeModal={closeModal}
          transaction={transaction}
        />
      ) : null}
    </Combobox>
  )
}
