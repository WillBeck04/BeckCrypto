import {
  RankingInfo,
  compareItems,
  rankItem,
} from '@tanstack/match-sorter-utils'
import { FilterFn } from '@tanstack/table-core'
import { SortingFn, createColumnHelper, sortingFns } from '@tanstack/table-core'
import Image from 'next/image'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import { CryptoData } from '../getCryptoData'
import { moneyFormat } from '../formatter'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

export const columnHelper = createColumnHelper<CryptoData[number]>()

export const columns = [
  columnHelper.accessor('market_cap_rank', {
    cell: (info) => info.getValue(),
    header: '#',
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (props) => (
      <div className="inline-flex items-center gap-2">
        <Image
          src={props.row.original.image}
          alt="symbol"
          width={24}
          height={24}
          loading="lazy"
          className="h-6 w-6"
        />
        <div>
          <p className="font-semibold">{props.row.original.name}</p>
          <p className="font-medium text-slate-600 dark:text-slate-400">
            {props.row.original.symbol.toUpperCase()}
          </p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('current_price', {
    cell: (info) => moneyFormat(info.getValue()),
    header: 'Price',
  }),

  columnHelper.accessor('price_change_percentage_24h', {
    cell: (info) => (
      <p className={info.getValue() > 0 ? 'text-green-500' : 'text-red-500'}>
        {info.getValue().toFixed(2)}%
      </p>
    ),
    header: '24h %',
  }),
  columnHelper.accessor('market_cap', {
    cell: (info) => moneyFormat(info.getValue()),
    header: 'Market Cap',
  }),
  columnHelper.accessor('total_volume', {
    cell: (info) => moneyFormat(info.getValue()),
    header: 'Total Volume',
  }),
  columnHelper.accessor('circulating_supply', {
    cell: (info) => moneyFormat(info.getValue()),
    header: 'Circulating supply',
  }),
  columnHelper.accessor('sparkline_in_7d', {
    cell: (info) => (
      <Sparklines data={info.getValue().price} style={{ width: 100 }}>
        <SparklinesLine
          color={
            info.row.original.price_change_percentage_24h > 0 ? 'teal' : 'red'
          }
        />
      </Sparklines>
    ),
    header: 'Last 7 Days',
  }),
]
