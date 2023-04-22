"use client";


export function RemoveFromWatchlistButton({ coinId }: { coinId: string }) {
  return (
    <button
      className="bg-red-500 rounded-md px-6 py-2"
      onClick={() => console.log(coinId)}
    >
      RemoveFromWatchlistButton
    </button>
  );
}
