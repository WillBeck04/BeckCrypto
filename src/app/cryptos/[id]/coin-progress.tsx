'use client'

import React from 'react'
import * as Progress from '@radix-ui/react-progress'

export function PriceProgress({
  currentPrice,
  highestPrice,
  lowestPrice,
}: {
  currentPrice: number
  highestPrice: number | undefined
  lowestPrice: number | undefined
}) {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    if (!highestPrice || !lowestPrice) {
      return
    }
    const rangeOfPrices = highestPrice - lowestPrice
    const difference = currentPrice - lowestPrice
    const priceProgress = (difference / rangeOfPrices) * 100
    const timer = setTimeout(() => setProgress(priceProgress), 500)
    return () => clearTimeout(timer)
  }, [currentPrice, highestPrice, lowestPrice])

  return (
    <Progress.Root
      className="relative h-3 w-full overflow-hidden rounded-full border border-slate-400 bg-slate-100 dark:border-slate-600 dark:bg-slate-900"
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: 'translateZ(0)',
      }}
      value={progress}
    >
      <Progress.Indicator
        className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] h-full w-full bg-slate-400 transition-transform duration-[660ms] dark:bg-slate-600"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  )
}
