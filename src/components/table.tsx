'use client'

import type { CryptoData } from '@/lib/getCryptoData'

import { ReactNode } from 'react'
import { Pagination } from './pagination'

import { ChevronDown, ChevronUp, StarIcon, VenetianMask } from 'lucide-react'
import Link from 'next/link'
import { TableRow } from './table-row'
import { DebouncedInput } from './debounced-input'
import { useWatchlist } from '@/app/watchlist-provider'
import { useTable } from '@/hooks/useTable'
import { flexRender } from '@tanstack/react-table'

export function Table({ cryptoData }: { cryptoData: CryptoData }) {
  const watchlist = useWatchlist()

  const { table, globalFilter, setGlobalFilter } = useTable(cryptoData)

  return (
    <>
      <div className="mt-6 mb-3 flex gap-5 lg:mt-12 lg:justify-between">
        <div className="flex items-center gap-3">
          <LinkButton href="/watchlist">
            <StarIcon className="h-4 w-4 fill-slate-700 text-slate-700 dark:fill-slate-300 dark:text-slate-300" />
            Watchlist
          </LinkButton>
          <LinkButton href="/portfolio">
            <VenetianMask className="h-4 w-4 text-slate-700 dark:text-slate-300" />
            Portfolio
          </LinkButton>
        </div>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search table..."
          className="hidden md:block"
        />
      </div>
      <div className="relative overflow-x-auto py-2 sm:rounded-lg lg:px-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 uppercase dark:border-slate-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th></th>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-6 py-3 text-xs text-slate-800 dark:text-slate-200"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'inline-flex min-w-max cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        <div className="inline-flex space-x-2">
                          <p>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </p>
                          <p>
                            {{
                              asc: <ChevronUp className="h-4 w-4" />,
                              desc: <ChevronDown className="h-4 w-4" />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </p>
                        </div>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} row={row} watchlist={watchlist} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-4" />
      <Pagination table={table} />
    </>
  )
}

function LinkButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 rounded-md bg-slate-200 px-2 py-2 text-xs font-semibold hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-800"
    >
      {children}
    </Link>
  )
}
