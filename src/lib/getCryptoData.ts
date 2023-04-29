import z from "zod";

const cryptoDataSchema = z.array(
  z.object({
    market_cap_rank: z.number(),
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
    image: z.string(),
    current_price: z.number(),
    price_change_percentage_24h: z.number(),
    market_cap: z.number(),
    total_volume: z.number(),
    circulating_supply: z.number(),
    sparkline_in_7d: z.object({
      price: z.array(z.number()),
    }),
  })
);

export type CryptoData = z.infer<typeof cryptoDataSchema>;

export async function getCryptoData() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&locale=en",
    {
      next: {
        revalidate: 1000,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return cryptoDataSchema.parse(data);
}
