'use client'

import Image from 'next/image'
import type { TeamCategoryId } from '@/data/teamData'

type Category = { id: TeamCategoryId; label: string }
type Member = {
  name: string
  role: string
  link?: string
  image?: string
  category: TeamCategoryId
}

/** 按职级区分头像大小和文字样式 */
const RANK_STYLE: Record<
  TeamCategoryId,
  { size: number; initial: string; name: string; role: string }
> = {
  'group-leader': { size: 100, initial: 'text-4xl', name: 'text-base font-bold', role: 'text-sm' },
  'team-leader': {
    size: 98,
    initial: 'text-3xl',
    name: 'text-base font-semibold',
    role: 'text-sm',
  },
  'research-fellow': {
    size: 96,
    initial: 'text-2xl',
    name: 'text-sm font-semibold',
    role: 'text-xs',
  },
  phd: { size: 94, initial: 'text-2xl', name: 'text-sm font-semibold', role: 'text-xs' },
  master: { size: 92, initial: 'text-2xl', name: 'text-sm font-semibold', role: 'text-xs' },
  bachelor: { size: 92, initial: 'text-2xl', name: 'text-sm font-semibold', role: 'text-xs' },
}

export default function TeamPageClient({
  categories,
  members,
}: {
  categories: Category[]
  members: Member[]
}) {
  const categoriesWithMembers = categories.filter((cat) =>
    members.some((m) => m.category === cat.id)
  )

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      <aside className="shrink-0 lg:w-56">
        <nav className="sticky top-24 space-y-1 border-b border-gray-200 pb-6 lg:border-b-0 lg:pb-0 dark:border-gray-700">
          {categoriesWithMembers.map((cat) => {
            const count = members.filter((m) => m.category === cat.id).length
            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="text-muted hover:text-foreground hover:bg-primary/5 block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition"
              >
                {cat.label}
                <span className="ml-1">({count})</span>
              </a>
            )
          })}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 space-y-12">
        {categoriesWithMembers.map((cat) => {
          const filtered = members.filter((m) => m.category === cat.id)
          const style = RANK_STYLE[cat.id]
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-28">
              <h2 className="text-foreground mb-6 text-xl font-semibold">
                {cat.label} ({filtered.length})
              </h2>
              <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((member) => (
                  <div key={member.name} className="flex items-center gap-4">
                    <div
                      className="relative shrink-0 overflow-hidden rounded-sm bg-gray-200 dark:bg-gray-700"
                      style={{ width: style.size, height: style.size }}
                    >
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes={`${style.size}px`}
                        />
                      ) : (
                        <div
                          className={`bg-primary/15 text-primary flex h-full w-full items-center justify-center font-bold ${style.initial}`}
                        >
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className={`text-foreground leading-snug ${style.name}`}>
                        {member.link ? (
                          <a
                            href={member.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {member.name}
                          </a>
                        ) : (
                          member.name
                        )}
                      </h3>
                      <p className={`text-muted mt-0.5 ${style.role}`}>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </main>
    </div>
  )
}
