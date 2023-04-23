"use client";

import { CryptoData } from "@/utils/getCryptoData";
import { Row, flexRender } from "@tanstack/react-table";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function TableRow({
  row,
  handleRemoveCoin,
  handleAddCoin,
  watchlist,
}: {
  row: Row<CryptoData[number]>;
  handleRemoveCoin: (id: string) => void;
  handleAddCoin: (id: string) => void;
  watchlist: string[];
}) {
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  useEffect(() => {
    if (watchlist.includes(row.original.id)) {
      setIsWatchlisted(true);
    }
  }, [watchlist, row.original.id]);
  return (
    <tr
      key={row.id}
      className="border-b border-slate-200 dark:border-slate-800"
    >
      <td className="cursor-pointer">
        <StarIcon
          className={
            isWatchlisted
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
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Link>
          ) : (
            flexRender(cell.column.columnDef.cell, cell.getContext())
          )}
        </td>
      ))}
    </tr>
  );
}
