'use client'

import { moneyFormat } from '@/utils/formatter'
import { GlobalData } from '@/utils/getGlobalData'
import { useState } from 'react'

export default function TodaInfoMore({
  globalData,
}: {
  globalData: GlobalData
}) {
  const [readMore, setReadMore] = useState(false)
  return (
    <>
      <button
        onClick={() => setReadMore(!readMore)}
        className="text-sm font-medium text-slate-600 underline decoration-slate-600 dark:text-slate-400 dark:decoration-slate-400"
      >
        {readMore ? 'Read less' : 'Read more'}
      </button>

      {readMore ? (
        <p className="text-sm text-slate-800 dark:text-slate-300">
          The total crypto market volume is currently{' '}
          <span className="font-semibold">
            {moneyFormat(globalData.total_volume.usd)}
          </span>
          Bitcoin’s dominance is currently{' '}
          <span className="font-semibold">
            {globalData.market_cap_percentage.btc.toFixed(2)}%
          </span>
          , on the second place is Ethereum with{' '}
          <span className="font-semibold">
            {globalData.market_cap_percentage.eth.toFixed(2)}%
          </span>
        </p>
      ) : null}
    </>
  )
}
