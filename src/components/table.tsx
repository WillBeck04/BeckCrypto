"use client";

import { CryptoData } from "@/utils/getCryptoData";
import { formatter } from "@/utils/formatter";
import {
  FilterFn,
  SortingFn,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { Sparklines, SparklinesLine } from "react-sparklines";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import { useEffect, useState } from "react";
import { Pagination } from "./pagination";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

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
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
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
        <div className="my-5 px-4 lg:px-0">
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="px-4 py-2 text-sm shadow border border-slate-200 dark:border-slate-800 rounded-md outline-indigo-500"
            placeholder="Search coins..."
          />
        </div>
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

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
