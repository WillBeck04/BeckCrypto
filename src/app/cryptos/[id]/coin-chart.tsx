'use client'

import { CryptoDetails } from '@/utils/getCryptoDetails'
import { Sparklines, SparklinesLine } from 'react-sparklines'

export function CoinChart({
  marketData,
}: {
  marketData: CryptoDetails['market_data']
}) {
  return (
    <div className="w-full lg:w-2/3">
      <Sparklines data={marketData?.sparkline_7d.price}>
        <SparklinesLine
          color={marketData?.price_change_percentage_24h! > 0 ? 'teal' : 'red'}
        />
      </Sparklines>
    </div>
  )
}
