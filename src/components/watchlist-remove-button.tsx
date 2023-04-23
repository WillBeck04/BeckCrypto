"use client";

import { WatchlistContext } from "@/app/providers";
import { useContext } from "react";

export function RemoveFromWatchlistButton({ coinId }: { coinId: string }) {
  const { watchlist, setWatchlist } = useContext(WatchlistContext);

  const handleRemoveCoin = (coinId: string) => {
    setWatchlist(watchlist.filter((id) => id !== coinId));
  };

  return (
    <button
      className="bg-red-500 rounded-md px-6 py-2"
      onClick={() => handleRemoveCoin(coinId)}
    >
      RemoveFromWatchlistButton
    </button>
  );
}
