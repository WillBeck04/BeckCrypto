import { z } from 'zod'

const newsSchema = z.array(
  z.object({
    author: z.string().nullable(),
    title: z.string(),
    description: z.string(),
    url: z.string(),
    urlToImage: z.string().nullable(),
    publishedAt: z.string(),
    content: z.string(),
  })
)

export async function getCryptoNews(id: string) {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${id}&language=en&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const { articles } = await res.json()

  return newsSchema.parse(articles)
}
