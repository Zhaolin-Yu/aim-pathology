'use client'

import Image from 'next/image'

type ResearchItem = {
  id: string
  emoji: string
  title: string
  desc: string
  image: string
}

export default function ResearchSection({ items }: { items: ResearchItem[] }) {
  return (
    <>
      <h2 className="text-foreground mb-10 text-2xl font-bold tracking-tight md:text-3xl">
        Research
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        {items.map((item) => (
          <div key={item.id} className="group">
            {/* 16:9 图片 + hover 微缩放 */}
            <div className="research-img-wrap relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>
            {/* 标题 + 介绍，紧贴图片下方 */}
            <div className="mt-4">
              <h3 className="text-foreground flex items-center gap-2 text-base font-semibold md:text-lg">
                <span className="text-xl" role="img" aria-hidden>
                  {item.emoji}
                </span>
                {item.title}
              </h3>
              <p className="text-muted mt-1.5 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
