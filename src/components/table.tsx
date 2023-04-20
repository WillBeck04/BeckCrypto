"use client";

import { CryptoData } from "@/app/page";
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
        />
        <p className="font-medium text-black dark:text-white">
          {props.row.original.name}
        </p>
        <p className="text-slate-700 dark:text-slate-200">
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
        {info.getValue()}
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
  });

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
      <table className="w-full text-sm text-left">
        <thead className="uppercase">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="px-6 py-3"
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
                        asc: " 🔼",
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
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
      <Pagination table={table} />
    </div>
  );
}

function Pagination({ table }: any) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="border rounded p-1"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        {"<<"}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<"}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {">"}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        {">>"}
      </button>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | Go to page:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="border p-1 rounded w-16"
        />
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}
