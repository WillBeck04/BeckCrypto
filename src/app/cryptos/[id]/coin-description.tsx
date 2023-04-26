'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function CoinDescription({
  name,
  description,
}: {
  name: string
  description: { en: string }
}) {
  const [showMore, setShowMore] = useState(false)

  return (
    <article className="prose dark:prose-headings:text-gray-100 dark:prose-p:text-gray-400 dark:prose-a:text-blue-500 mt-10 w-full md:w-2/3">
      {description.en.length > 0 && (
        <h3 className="text-2xl font-bold">About {name}</h3>
      )}
      {showMore ? (
        <p
          dangerouslySetInnerHTML={{
            __html: description.en,
          }}
          className="mt-5"
        ></p>
      ) : (
        <p
          dangerouslySetInnerHTML={{
            __html: description.en,
          }}
          className="mt-5 line-clamp-4"
        ></p>
      )}
      {description.en.length > 290 && (
        <Button
          className="mt-3 flex h-10 w-full items-center justify-center self-center rounded-lg bg-gray-500/20 text-sm font-bold text-gray-200 md:w-36"
          onClick={() => setShowMore((prev) => !prev)}
        >
          <p className="text-gray-600 dark:text-gray-200">
            {showMore ? 'Show less' : 'Show more'}
          </p>
        </Button>
      )}
    </article>
  )
}
