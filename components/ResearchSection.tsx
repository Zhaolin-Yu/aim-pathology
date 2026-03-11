'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const CYCLE_MS = 5000

type ResearchItem = {
  id: string
  emoji: string
  title: string
  desc: string
  image: string
}

export default function ResearchSection({ items }: { items: ResearchItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % items.length)
    }, CYCLE_MS)
    return () => clearInterval(t)
  }, [items.length])

  const active = items[activeIndex]
  const others = items.filter((_, i) => i !== activeIndex)

  return (
    <>
      <h2 className="text-foreground mb-10 text-2xl font-bold tracking-tight md:text-3xl">
        Research
      </h2>
      <div className="grid gap-4 lg:grid-cols-3 lg:items-stretch lg:gap-6">
        {/* 大块：当前选中的一项，切换时渐入；占位图在下方 */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 lg:col-span-2 dark:border-gray-700 dark:bg-gray-800/50">
          <div key={activeIndex} className="animate-fadeIn p-6 lg:p-8">
            <div className="flex items-center gap-3">
              <span className="text-4xl" role="img" aria-hidden>
                {active.emoji}
              </span>
              <h3 className="text-foreground text-xl font-semibold md:text-2xl">{active.title}</h3>
            </div>
            <p className="text-muted mt-2 leading-6 md:text-lg">{active.desc}</p>
            <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
              <Image
                src={active.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                unoptimized
              />
            </div>
          </div>
        </div>
        {/* 三小块：与左侧同高并三等分，内容更小 */}
        <div className="flex min-h-0 flex-col gap-3 lg:gap-4">
          {others.map((item) => {
            const originalIndex = items.findIndex((x) => x.id === item.id)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(originalIndex)}
                className="hover:border-primary/40 dark:hover:border-primary/40 flex min-h-0 flex-1 flex-col rounded-xl border border-gray-200 bg-gray-50 p-3 text-left transition lg:p-3 dark:border-gray-700 dark:bg-gray-800/50"
              >
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-base" role="img" aria-hidden>
                    {item.emoji}
                  </span>
                  <p className="text-foreground truncate text-sm font-semibold">{item.title}</p>
                </div>
                <div className="relative mt-2 min-h-0 flex-1 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
