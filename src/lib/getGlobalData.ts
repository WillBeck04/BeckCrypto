import { z } from "zod";

const globalDataSchema = z.object({
  active_cryptocurrencies: z.number(),
  markets: z.number(),
  total_market_cap: z.object({
    usd: z.number(),
  }),
  total_volume: z.object({
    usd: z.number(),
  }),
  market_cap_percentage: z.object({
    btc: z.number(),
    eth: z.number(),
  }),
  market_cap_change_percentage_24h_usd: z.number(),
});

export type GlobalData = z.infer<typeof globalDataSchema>

export async function getGlobalCryptoData() {
  const res = await fetch("https://api.coingecko.com/api/v3/global", {
    next: {
      revalidate: 1000,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data } = await res.json();

  return globalDataSchema.parse(data);
}
