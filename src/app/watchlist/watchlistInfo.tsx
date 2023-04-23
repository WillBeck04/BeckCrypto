"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { WatchlistContext } from "../providers";
import { CryptoData } from "@/utils/getCryptoData";
import { RemoveFromWatchlistButton } from "@/components/watchlist-remove-button";

export function WatchlistInfo({ cryptoData }: { cryptoData: CryptoData }) {
  const [watchlistData, setWatchlistData] = useState<CryptoData>();
  const { watchlist } = useContext(WatchlistContext);

  useEffect(() => {
    const filteredData = cryptoData.filter((coin) =>
      watchlist.includes(coin.id)
    );

    setWatchlistData(filteredData);
  }, [cryptoData, watchlist]);

  return (
    <div>
      {watchlistData?.map((coin) => (
        <div key={coin.id}>
          <p>{coin.name}</p>
          <RemoveFromWatchlistButton coinId={coin.id} />
        </div>
      ))}
    </div>
  );
}
