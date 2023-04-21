import { z } from "zod";

const trendingCoinsSchema = z.array(
    z.object({
      item: z.object({
        id: z.string(),
        name: z.string(),
        symbol: z.string(),
        small: z.string(),
        market_cap_rank: z.number(),
      }),
    })
  );
  
  export type TrendingCoins = z.infer<typeof trendingCoinsSchema>;
  
  export async function getTrendingCoins() {
    const res = await fetch("https://api.coingecko.com/api/v3/search/trending", {
      next: {
        revalidate: 1000,
      },
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    const { coins } = await res.json();
  
    return trendingCoinsSchema.parse(coins);
  }