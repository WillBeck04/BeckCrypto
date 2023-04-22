"use client";

import { CryptoData } from "@/utils/getCryptoData";
import { formatter } from "@/utils/formatter";
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { Sparklines, SparklinesLine } from "react-sparklines";

import { useState } from "react";
import { Pagination } from "./pagination";

const columnHelper = createColumnHelper<CryptoData[number]>();

const columns = [
  columnHelper.accessor("market_cap_rank", {
    cell: (info) => info.getValue(),
    header: "#",
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (props) => (
      <div className="inline-flex items-center gap-2">
        <Image
          src={props.row.original.image}
          alt="symbol"
          width={24}
          height={24}
          loading="lazy"
          className="w-6 h-6"
        />
        <p className="font-medium text-black dark:text-white">
          {props.row.original.name}
        </p>
        <p className="text-slate-700 dark:text-slate-400 font-medium">
          {props.row.original.symbol.toUpperCase()}
        </p>
      </div>
    ),
  }),
  columnHelper.accessor("current_price", {
    cell: (info) => `$${formatter.format(info.getValue())}`,
    header: "Price",
  }),

  columnHelper.accessor("price_change_percentage_24h", {
    cell: (info) => (
      <p className={info.getValue() > 0 ? "text-green-500" : "text-red-500"}>
        {info.getValue().toFixed(2)}%
      </p>
    ),
    header: "24h %",
  }),
  columnHelper.accessor("market_cap", {
    cell: (info) => `$${formatter.format(info.getValue())}`,
    header: "Market Cap",
  }),
  columnHelper.accessor("total_volume", {
    cell: (info) => `$${formatter.format(info.getValue())}`,
    header: "Total Volume",
  }),
  columnHelper.accessor("circulating_supply", {
    cell: (info) => `$${formatter.format(info.getValue())}`,
    header: "Circulating supply",
  }),
  columnHelper.accessor("sparkline_in_7d", {
    cell: (info) => (
      <Sparklines data={info.getValue().price}>
        <SparklinesLine
          color={
            info.row.original.price_change_percentage_24h > 0 ? "teal" : "red"
          }
        />
      </Sparklines>
    ),
    header: "Last 7 Days",
  }),
];

export function Table({ cryptoData }: { cryptoData: CryptoData }) {
  const [data, setData] = useState(() => [...cryptoData]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

  return (
    <>
      <div className="relative overflow-x-auto py-2 sm:rounded-lg mt-6 lg:mt-12">
        <table className="w-full text-sm text-left">
          <thead className="uppercase border-b border-slate-200 dark:border-slate-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-6 py-3 dark:text-slate-200 text-slate-800 text-xs"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-200 dark:border-slate-800"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-4" />
      <Pagination table={table} />
    </>
  );
}
