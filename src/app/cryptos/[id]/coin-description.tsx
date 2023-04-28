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
    <article className="prose prose-slate mt-10 w-full dark:prose-invert prose-a:text-indigo-400 md:w-5/6">
      {description.en.length > 0 && (
        <h3 className="text-2xl font-bold">About {name}</h3>
      )}
      {showMore ? (
        <p
          dangerouslySetInnerHTML={{
            __html: description.en,
          }}
          className="[text-wrap:balance]"
        ></p>
      ) : (
        <p
          dangerouslySetInnerHTML={{
            __html: description.en,
          }}
          className="line-clamp-4 [text-wrap:balance]"
        ></p>
      )}
      {description.en.length > 270 && (
        <Button
          onClick={() => setShowMore((prev) => !prev)}
          className="mt-1"
          variant="ghost"
          size="sm"
        >
          {showMore ? 'Show less' : 'Show more'}
        </Button>
      )}
    </article>
  )
}
