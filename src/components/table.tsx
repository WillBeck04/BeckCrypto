'use client'

import { CryptoData } from '@/utils/getCryptoData'
import {
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useContext, useEffect, useState } from 'react'
import { Pagination } from './pagination'
import { fuzzyFilter, columns } from '@/utils/helpers/cryptoTable'
import { ChevronDown, ChevronUp, StarIcon } from 'lucide-react'
import Link from 'next/link'
import { WatchlistContext } from '@/app/providers'
import { TableRow } from './table-row'
import { DebouncedInput } from './debounced-input'

export function Table({ cryptoData }: { cryptoData: CryptoData }) {
  const [data, setData] = useState(() => [...cryptoData])
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const { watchlist, setWatchlist } = useContext(WatchlistContext)

  const handleAddCoin = (newCoin: string) => {
    setWatchlist([...watchlist, newCoin])
  }

  const handleRemoveCoin = (coinId: string) => {
    setWatchlist(watchlist.filter((id) => id !== coinId))
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  })

  return (
    <>
      <div className="relative overflow-x-auto py-2 sm:rounded-lg lg:px-0">
        <div className="my-5">
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search coins..."
          />
        </div>
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
              <TableRow
                key={row.id}
                row={row}
                handleAddCoin={handleAddCoin}
                handleRemoveCoin={handleRemoveCoin}
                watchlist={watchlist}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-4" />
      <Pagination table={table} />
    </>
  )
}
