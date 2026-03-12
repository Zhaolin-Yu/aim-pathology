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

const AVATAR_SIZE = 100
const LEADER_IDS: TeamCategoryId[] = ['group-leader', 'team-leader']

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="relative shrink-0 overflow-hidden rounded-sm bg-gray-200 dark:bg-gray-700"
        style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
      >
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            sizes={`${AVATAR_SIZE}px`}
          />
        ) : (
          <div className="bg-primary/15 text-primary flex h-full w-full items-center justify-center text-3xl font-bold">
            {member.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <h3 className="text-foreground text-base leading-snug font-semibold">
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
        <p className="text-muted mt-0.5 text-sm">{member.role}</p>
      </div>
    </div>
  )
}

export default function TeamPageClient({ members }: { categories: Category[]; members: Member[] }) {
  const leaders = members.filter((m) => LEADER_IDS.includes(m.category))
  const others = members.filter((m) => !LEADER_IDS.includes(m.category))

  return (
    <div className="space-y-10">
      {leaders.length > 0 && (
        <section>
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {leaders.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section>
          <div className="divider-gradient mb-8" />
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {others.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
