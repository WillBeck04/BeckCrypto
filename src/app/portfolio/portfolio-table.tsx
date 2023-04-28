'use client'

import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Title,
} from '@tremor/react'
import { Transaction } from '../portfolio-provider'
import { cn } from '@/utils/cn'
import { moneyFormat } from '@/utils/formatter'

export function PortfolioTable({ portfolio }: { portfolio: Transaction[] }) {
  return (
    <div>
      <Card className="mt-6 dark:bg-slate-800 dark:ring-slate-700 lg:mt-12">
        <Title className="text-slate-800 dark:text-slate-200">
          Transactions
        </Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="text-slate-800 dark:text-slate-200">
                Name
              </TableHeaderCell>
              <TableHeaderCell className="text-slate-800 dark:text-slate-200">
                Price
              </TableHeaderCell>
              <TableHeaderCell className="text-slate-800 dark:text-slate-200">
                Quantity
              </TableHeaderCell>
              <TableHeaderCell className="text-slate-800 dark:text-slate-200">
                Total Cost
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y divide-slate-200 dark:divide-slate-700">
            {portfolio.map((coin, idx) => (
              <TableRow key={idx}>
                <TableCell className="border-none text-slate-900 dark:text-slate-50">
                  {coin.name}
                </TableCell>
                <TableCell className="text-slate-800 dark:text-slate-200">
                  {moneyFormat(coin.price)}
                </TableCell>
                <TableCell className="text-slate-800 dark:text-slate-200">
                  {coin.quantity}
                </TableCell>
                <TableCell
                  className={cn(
                    'border-none text-green-500',
                    coin.quantity < 0 && 'text-red-500'
                  )}
                >
                  $
                  {coin.quantity < 0
                    ? moneyFormat(coin.cost).slice(1)
                    : moneyFormat(coin.cost)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
