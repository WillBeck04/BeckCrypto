'use client'

import { CryptoData } from '@/utils/getCryptoData'
import { Row, flexRender } from '@tanstack/react-table'
import { StarIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function TableRow({
  row,
  handleRemoveCoin,
  handleAddCoin,
  watchlist,
}: {
  row: Row<CryptoData[number]>
  handleRemoveCoin: (id: string) => void
  handleAddCoin: (id: string) => void
  watchlist: string[]
}) {
  const [isWatchlisted, setIsWatchlisted] = useState(false)
  useEffect(() => {
    if (watchlist.includes(row.original.id)) {
      setIsWatchlisted(true)
    }
  }, [watchlist, row.original.id])
  return (
    <tr
      key={row.id}
      className="border-b border-slate-200 dark:border-slate-800"
    >
      <td className="group relative cursor-pointer">
        <StarIcon
          className={
            isWatchlisted
              ? 'h-4 w-4 fill-yellow-500 text-yellow-500'
              : 'h-4 w-4'
          }
          onClick={() => {
            isWatchlisted
              ? handleRemoveCoin(row.original.id)
              : handleAddCoin(row.original.id)
          }}
        />
        <div className="absolute left-5 top-20 hidden h-10 w-28 items-center rounded-md bg-slate-200 text-center text-xs shadow group-hover:flex dark:bg-slate-800">
          {isWatchlisted
            ? 'Remove coin from watchlist'
            : 'Add coin to watchlist'}
        </div>
      </td>
      {row.getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300"
        >
          {cell.id.includes('name') ? (
            <Link href={`/cryptos/${row.original.id}`}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Link>
          ) : (
            flexRender(cell.column.columnDef.cell, cell.getContext())
          )}
        </td>
      ))}
    </tr>
  )
}
