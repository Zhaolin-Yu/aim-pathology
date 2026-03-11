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
      {/* 左侧侧边栏：仅显示有成员的分组，点击滚动到对应区块 */}
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

      {/* 右侧：仅渲染有成员的分组 */}
      <main className="min-w-0 flex-1 space-y-12">
        {categoriesWithMembers.map((cat) => {
          const filtered = members.filter((m) => m.category === cat.id)
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-28">
              <h2 className="text-foreground mb-6 text-xl font-semibold">
                {cat.label} ({filtered.length})
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((member) => (
                  <div
                    key={member.name}
                    className="rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
                  >
                    {/* 照片区 1:1 */}
                    <div
                      className="relative w-full overflow-hidden rounded-t-xl bg-gray-200 dark:bg-gray-700"
                      style={{ aspectRatio: '1/1' }}
                    >
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="bg-primary/20 text-primary flex h-full w-full items-center justify-center text-4xl font-bold">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-foreground font-semibold">
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
                      <p className="text-muted mt-1 text-sm">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}

        <div className="border-secondary/40 bg-secondary/5 rounded-xl border border-dashed p-6 text-center">
          <p className="text-secondary font-semibold">We are hiring!</p>
          <p className="text-muted mt-2 text-sm">
            Looking for motivated Ph.D. students and postdocs.
          </p>
        </div>
      </main>
    </div>
  )
}
