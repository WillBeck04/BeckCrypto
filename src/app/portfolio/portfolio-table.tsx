'use client'

import { useContext, useMemo } from 'react'
import { PortfolioContext } from '../providers'
import { formatter } from '@/utils/formatter'
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from '@tremor/react'

export function PortfolioTable() {
  const { portfolio } = useContext(PortfolioContext)
  const totalBalance = useMemo(() => {
    const result = portfolio.reduce(
      (accumulator, currentValue) => accumulator + currentValue.cost,
      0
    )
    return result
  }, [portfolio])
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-medium lg:text-3xl">Total Balance</h2>
        <p className="text-xl lg:text-2xl">${formatter.format(totalBalance)}</p>
      </div>
      <Card className="dark:border-slate-700 dark:bg-slate-800">
        <Title className="dark:text-slate-200">Transactions</Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="dark:text-slate-200">
                Name
              </TableHeaderCell>
              <TableHeaderCell className="dark:text-slate-200">
                Price
              </TableHeaderCell>
              <TableHeaderCell className="dark:text-slate-200">
                Quantity
              </TableHeaderCell>
              <TableHeaderCell className="dark:text-slate-200">
                Total Cost
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolio.map((coin, idx) => (
              <TableRow key={idx}>
                <TableCell className="dark:text-slate-300 border-none">
                  {coin.name}
                </TableCell>
                <TableCell>
                  <Text className="dark:text-slate-300">
                    ${formatter.format(coin.price)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text className="dark:text-slate-300">{coin.quantity}</Text>
                </TableCell>
                <TableCell className="dark:text-slate-300 border-none">
                  ${formatter.format(coin.cost)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
