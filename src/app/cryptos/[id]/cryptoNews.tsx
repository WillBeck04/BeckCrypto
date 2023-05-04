import { cn } from '@/lib/cn'
import { getCryptoNews } from '@/lib/getCryptoNews'
import Link from 'next/link'
import React from 'react'

export async function CryptoNews({ id }: { id: string }) {
  const cryptoNews = await getCryptoNews(id)
  return (
    <div className="col-span-3 mt-6 lg:col-span-8">
      <h2 className="my-3 text-xl font-semibold lg:text-2xl">
        Latest news about this crypto
      </h2>
      <div className="grid-cols-2 gap-10 space-y-10 lg:grid lg:space-y-0">
        {cryptoNews.map((news, idx) => (
          <Link
            href={news.url}
            key={idx}
            target="_blank"
            className="block rounded-md border border-slate-300 px-3 py-6 transition-all first:row-span-2 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 lg:first:px-6 lg:first:py-16"
          >
            <h3
              className={
                idx === 0
                  ? 'font-semibold lg:text-3xl'
                  : 'line-clamp-2 font-semibold'
              }
            >
              {news.title}
            </h3>
            <div className="mt-1 flex gap-3">
              <p
                className={cn(
                  'text-sm font-medium text-slate-900 dark:text-slate-50',
                  idx === 0 && 'lg:text-base'
                )}
              >
                {news.author ? news.author : 'Unknown Author'}
              </p>
              <p
                className={cn(
                  'test-slate-900 text-sm font-medium dark:text-slate-50',
                  idx === 0 && 'lg:text-base'
                )}
              >
                {new Date(news.publishedAt).toLocaleDateString()}
              </p>
            </div>
            <p
              className={cn(
                'mt-3 line-clamp-3 text-sm text-slate-700 dark:text-slate-300 lg:line-clamp-2',
                idx === 0 &&
                  'line-clamp-none lg:mt-6 lg:line-clamp-none lg:text-base'
              )}
            >
              {news.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
