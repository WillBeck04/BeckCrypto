'use client'

import type { CryptoData } from '@/lib/getCryptoData'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { Search, X } from 'lucide-react'
import Image from 'next/image'
import { Fragment, useRef, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export default function MobileSearch({ cryptos }: { cryptos: CryptoData }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const router = useRouter()

  const filteredCryptos =
    query === ''
      ? cryptos
      : cryptos.filter((crypto) => {
          return crypto.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <>
      <div className="lg:hidden">
        <button type="button" onClick={openModal}>
          <Search className="h-6 w-6 text-slate-700 dark:text-slate-300" />
        </button>
      </div>

      <Transition
        appear
        show={isOpen}
        as={Fragment}
        afterLeave={() => setQuery('')}
      >
        <Dialog
          as="div"
          className="relative z-10 lg:hidden"
          onClose={closeModal}
          initialFocus={inputRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-screen w-full transform overflow-hidden  bg-slate-100 p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-900">
                  <div className="mb-6 flex items-baseline justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium leading-6 text-slate-900 dark:text-slate-100"
                    >
                      Search cryptos
                    </Dialog.Title>
                    <Button
                      className="h-10 w-10 rounded-md p-2"
                      variant={'outline'}
                      onClick={closeModal}
                    >
                      <X className="text-slate-800 dark:text-slate-200" />
                    </Button>
                  </div>

                  <Combobox
                    onChange={(crypto: CryptoData[number]) => {
                      router.push(`cryptos/${crypto.id}`)
                      setIsOpen(false)
                    }}
                  >
                    <Combobox.Input
                      ref={inputRef}
                      as={Input}
                      onChange={(e) => setQuery(e.target.value)}
                      autoFocus={true}
                      className="py-2"
                      placeholder="Search cryptos..."
                    />
                    <Combobox.Options
                      static={true}
                      className="mt-6 h-full space-y-1 overflow-y-scroll rounded-md px-3 py-1 text-sm ring ring-slate-200 dark:ring-slate-700"
                    >
                      {filteredCryptos.map((crypto) => (
                        <Combobox.Option
                          key={crypto.id}
                          value={crypto}
                          className={({ active }) =>
                            `relative flex cursor-pointer select-none items-center gap-2 rounded-md py-3 pl-6 pr-4 ${
                              active ? 'bg-indigo-500/50 text-white' : null
                            }`
                          }
                        >
                          <Image
                            src={crypto.image}
                            alt="coin-img"
                            width={24}
                            height={24}
                          />
                          <p className="font-medium">{crypto.name}</p>
                        </Combobox.Option>
                      ))}
                      {filteredCryptos.length === 0 ? (
                        <p className="p-2 text-sm">
                          Sorry, we couldn&apos;t find that crypto
                        </p>
                      ) : null}
                    </Combobox.Options>
                  </Combobox>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
