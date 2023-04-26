'use client'
import { PortfolioForm } from '@/components/portfolio-form'
import { Button } from '@/components/ui/button'
import { CryptoData } from '@/utils/getCryptoData'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useState } from 'react'

export function AddTransaction({ cryptos }: { cryptos: CryptoData }) {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div>
        <Button onClick={openModal} size="sm">
          Add Transaction
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-slate-900 dark:text-slate-100"
                  >
                    Select coin
                  </Dialog.Title>
                  <div className="mt-2">
                    <SelectCoin cryptos={cryptos} closeModal={closeModal} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

function SelectCoin({
  cryptos,
  closeModal,
}: {
  cryptos: CryptoData
  closeModal: () => void
}) {
  const [selectedCoin, setSelectedCoin] = useState<CryptoData[number] | null>(
    null
  )
  const [isPicked, setIsPicked] = useState(false)
  const [query, setQuery] = useState('')

  const filteredCryptos =
    query === ''
      ? cryptos.slice(0, 10)
      : cryptos.filter((crypto) => {
          return crypto.name.toLowerCase().includes(query.toLowerCase())
        })

  if (selectedCoin) {
    return <PortfolioForm selectedCoin={selectedCoin} closeModal={closeModal} />
  }

  return (
    <Combobox value={selectedCoin} onChange={setSelectedCoin}>
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Type a coin"
        displayValue={(crypto: CryptoData[number]) =>
          selectedCoin ? crypto.name : ''
        }
        className="block w-full rounded-md border-0 px-3 py-1 text-slate-900 outline-none ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-700 dark:text-slate-100 dark:ring-slate-700 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
      />
      <Combobox.Options className="mt-5">
        {filteredCryptos.slice(0, 10).map((crypto) => (
          <Combobox.Option
            key={crypto.id}
            value={crypto}
            onClick={() => setIsPicked(true)}
            className={({ active }) =>
              `relative cursor-pointer select-none rounded-md py-2 pl-10 pr-4 ${
                active ? 'bg-indigo-600/20 text-white' : null
              }`
            }
          >
            <div className="mt-2 flex items-center gap-2  text-sm">
              <Image src={crypto.image} alt="coin-img" width={16} height={16} />
              <p>{crypto.name}</p>
            </div>
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}
