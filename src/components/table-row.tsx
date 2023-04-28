import { CryptoData } from '@/utils/getCryptoData'
import { Row, flexRender } from '@tanstack/react-table'
import { StarIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import WatchlistStar from './watchlist-star'

export function TableRow({
  row,
  watchlist,
}: {
  row: Row<CryptoData[number]>
  watchlist: string[]
}) {
  const [isWatchlisted, setIsWatchlisted] = useState(false)
  useEffect(() => {
    if (watchlist.includes(row.original.id)) {
      setIsWatchlisted(true)
    } else {
      setIsWatchlisted(false)
    }
  }, [watchlist, row.original.id])
  return (
    <tr
      key={row.id}
      className="border-b border-slate-200 hover:bg-white/5 dark:border-slate-800"
    >
      <td className="group relative cursor-pointer">
        <WatchlistStar isWatchlisted={isWatchlisted} coinId={row.original.id} />
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
