import z from 'zod'

const cryptoDetailsSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.object({
    large: z.string(),
  }),
  symbol: z.string(),
  market_cap_rank: z.number().nullable(),
  links: z.object({
    homepage: z.array(z.string()),
  }),
  market_data: z
    .object({
      current_price: z.object({
        usd: z.number(),
      }),
      price_change_percentage_24h: z.number().nullable(),
      price_change_percentage_7d: z.number().nullable(),
      price_change_percentage_14d: z.number().nullable(),
      market_cap: z.object({
        usd: z.number(),
      }),
      high_24h: z.object({
        usd: z.number().optional(),
      }),
      low_24h: z.object({
        usd: z.number(),
      }),
      fully_diluted_valuation: z.object({
        usd: z.number().optional(),
      }),
      total_volume: z.object({
        usd: z.number().optional(),
      }),
      sparkline_7d: z.object({
        price: z.array(z.number()),
      }),
      circulating_supply: z.number(),
    })
    .optional()
    .nullable(),
  description: z.object({
    en: z.string(),
  }),
})

export type CryptoDetails = z.infer<typeof cryptoDetailsSchema>

export async function getCryptoDetails(id: string) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?sparkline=true`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  return cryptoDetailsSchema.parse(data)
}
