"use client";

import { CryptoData } from "@/utils/getCryptoData";
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useContext, useEffect, useState } from "react";
import { Pagination } from "./pagination";
import { fuzzyFilter, columns } from "@/utils/helpers/cryptoTable";
import { ChevronDown, ChevronUp, StarIcon } from "lucide-react";
import Link from "next/link";
import { WatchlistContext } from "@/app/providers";

export function Table({ cryptoData }: { cryptoData: CryptoData }) {
  const [data, setData] = useState(() => [...cryptoData]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const { watchlist, setWatchlist } = useContext(WatchlistContext);

  const handleAddCoin = (newCoin: string) => {
    setWatchlist([...watchlist, newCoin]);
  };

  const handleRemoveCoin = (coinId: string) => {
    setWatchlist(watchlist.filter((id) => id !== coinId));
  };

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
      <div className="relative  px-4 lg:px-0 overflow-x-auto py-2 sm:rounded-lg">
        <div className="my-5">
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search coins..."
          />
        </div>
        <table className="w-full text-sm text-left">
          <thead className="uppercase border-b border-slate-200 dark:border-slate-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th></th>
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
                            ? "inline-flex min-w-max cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        <div className="inline-flex space-x-2">
                          <p>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </p>
                          <p>
                            {{
                              asc: <ChevronUp className="w-4 h-4" />,
                              desc: <ChevronDown className="w-4 h-4" />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </p>
                        </div>
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
                <td className="cursor-pointer">
                  <StarIcon
                    className={
                      watchlist.includes(row.original.id)
                        ? "w-4 h-4 fill-yellow-500 text-yellow-500"
                        : "w-4 h-4"
                    }
                    onClick={() => {
                      watchlist.includes(row.original.id)
                        ? handleRemoveCoin(row.original.id)
                        : handleAddCoin(row.original.id);
                    }}
                  />
                </td>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 dark:text-slate-300 text-slate-700 font-medium"
                  >
                    {cell.id.includes("name") ? (
                      <Link href={`/cryptos/${row.original.id}`}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Link>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
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
      className="px-4 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-md outline-indigo-500"
    />
  );
}
