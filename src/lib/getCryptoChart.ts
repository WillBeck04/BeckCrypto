import z from 'zod'

const cryptoChartSchema = z.object({
  prices: z.array(z.array(z.number())),
})

export type ChartData = z.infer<typeof cryptoChartSchema>

export async function getCryptoChart(id: string) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`,
    {
      next: {
        revalidate: 1000,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  return cryptoChartSchema.parse(data)
}
