'use client'

import { CryptoData } from '@/lib/getCryptoData'
import { Combobox, Popover, Transition } from '@headlessui/react'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'

export function SearchPopover({ cryptos }: { cryptos: CryptoData }) {
  const [query, setQuery] = useState('')
  const [selectedCoin, setSelectedCoin] = useState<CryptoData[number] | null>(
    null
  )
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function openSearch(e: KeyboardEvent) {
      if (e.key === '/') {
        buttonRef?.current?.click()
      }
    }

    document.addEventListener('keydown', openSearch)

    return () => window.removeEventListener('keydown', openSearch)
  }, [])

  const filteredCryptos =
    query === ''
      ? cryptos
      : cryptos.filter((crypto) => {
          return crypto.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Popover className="relative ml-5 hidden lg:block">
      <Popover.Button
        ref={buttonRef}
        className="hidden rounded-md py-2 pl-4 text-sm outline-none dark:bg-slate-700 lg:block lg:bg-slate-200"
      >
        <div className="items-center justify-between gap-10 lg:flex">
          <div className="flex gap-3">
            <Search className="h-4 w-4 text-slate-700 dark:text-slate-300" />
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Search
            </span>
          </div>

          <span className="mr-2 rounded-md bg-slate-300 px-2 text-xs font-bold dark:bg-slate-800">
            /
          </span>
        </div>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-in duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute inset-0 z-10">
          <div className="w-72 rounded-md bg-slate-200 p-2 shadow-sm ring-1 ring-slate-300 dark:bg-slate-800 dark:shadow-slate-700 dark:ring-slate-700">
            <Combobox value={selectedCoin} onChange={setSelectedCoin}>
              <Combobox.Input
                onChange={(e) => setQuery(e.target.value)}
                autoFocus={true}
                placeholder="Search cryptos..."
                className="block w-full rounded-md border-0 bg-slate-50 px-3 py-1 text-slate-900 outline-none ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-700 dark:text-slate-100 dark:ring-slate-700 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
              <Combobox.Options
                static={true}
                className="mt-3 max-h-72 space-y-2 overflow-y-auto text-sm"
              >
                {filteredCryptos.map((crypto) => (
                  <Combobox.Option
                    key={crypto.id}
                    value={crypto}
                    className={({ active }) =>
                      `relative cursor-pointer select-none rounded-md py-1 pl-6 pr-4 ${
                        active ? 'bg-indigo-500 text-white' : null
                      }`
                    }
                  >
                    <Popover.Button
                      as={Link}
                      href={`/cryptos/${crypto.id}`}
                      className="mt-2 flex items-center gap-2 text-sm font-semibold"
                    >
                      <Image
                        src={crypto.image}
                        alt="coin-img"
                        width={24}
                        height={24}
                      />
                      <p>{crypto.name}</p>
                    </Popover.Button>
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox>
            {filteredCryptos.length === 0 ? (
              <p className="p-2 text-sm">
                Sorry, we couldn&apos;t find that crypto
              </p>
            ) : null}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
