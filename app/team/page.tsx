import { genPageMetadata } from 'app/seo'
import TeamPageClient from './TeamPageClient'
import { TEAM_CATEGORIES, TEAM_MEMBERS } from '@/data/teamData'

export const metadata = genPageMetadata({ title: 'Team' })

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 xl:px-0">
      <h1 className="text-foreground mb-10 text-3xl font-bold tracking-tight md:text-4xl">Team</h1>
      <TeamPageClient categories={[...TEAM_CATEGORIES]} members={TEAM_MEMBERS} />
    </div>
  )
}
