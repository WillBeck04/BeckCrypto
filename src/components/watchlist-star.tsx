'use client'

import { useWatchlistDispatch } from "@/context/watchlist-provider"
import { StarIcon } from 'lucide-react'

export default function WatchlistStar({
  isWatchlisted,
  coinId,
}: {
  isWatchlisted: boolean
  coinId: string
}) {
  const dispatch = useWatchlistDispatch()
  return (
    <div>
      <StarIcon
        className={
          isWatchlisted ? 'h-4 w-4 fill-yellow-500 text-yellow-500' : 'h-4 w-4'
        }
        onClick={() => {
          isWatchlisted
            ? dispatch({
                type: 'removed',
                id: coinId,
              })
            : dispatch({
                type: 'added',
                coin: coinId,
              })
        }}
      />
      <div className="absolute left-5 top-20 hidden h-10 w-28 items-center rounded-md bg-slate-200 text-center text-xs shadow group-hover:flex dark:bg-slate-800">
        {isWatchlisted ? 'Remove coin from watchlist' : 'Add coin to watchlist'}
      </div>
    </div>
  )
}
