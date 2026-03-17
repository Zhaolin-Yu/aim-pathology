import { allPublications } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import SectionContainer from '@/components/SectionContainer'
import Link from '@/components/Link'
import PublicationTag from '@/components/PublicationTag'

export const metadata = genPageMetadata({ title: 'Research' })

export default function PublicationsPage() {
  const list = (allPublications || [])
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // 按年份分组
  const grouped = list.reduce<Record<string, typeof list>>((acc, pub) => {
    const year = new Date(pub.date).getFullYear().toString()
    ;(acc[year] ||= []).push(pub)
    return acc
  }, {})
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

  return (
    <SectionContainer>
      <div className="pt-6 pb-10">
        <h1 className="text-foreground text-3xl font-extrabold tracking-tight md:text-4xl">
          Research
        </h1>
        <p className="text-muted mt-2 text-lg leading-7">
          Selected research from AIM for Pathology Team.
        </p>
      </div>

      {list.length === 0 && <p className="text-muted py-8">No research yet.</p>}

      {years.map((year) => (
        <section key={year} className="mb-10 last:mb-0">
          {/* 年份标题 */}
          <div className="mb-4 flex items-center gap-3">
            <h2 className="text-foreground text-xl font-bold tabular-nums">{year}</h2>
            <div className="divider-gradient flex-1" />
          </div>

          <div className="space-y-0">
            {grouped[year].map((pub) => (
              <article key={pub.slug} className="pub-row py-5 pl-4">
                <span className="text-muted font-mono text-xs tracking-wider uppercase">
                  {pub.venue}
                </span>
                <h3 className="text-foreground mt-1.5 text-base leading-snug font-semibold">
                  <Link href={`/publications/${pub.slug}`} className="text-primary hover:underline">
                    {pub.title}
                  </Link>
                </h3>
                <p className="text-muted mt-1 text-sm">{pub.authors?.join(', ') || '—'}</p>
                {pub.tags && pub.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {pub.tags.map((tag) => {
                      const href =
                        tag === 'PDF' && pub.pdf
                          ? pub.pdf
                          : tag === 'Code' && pub.code
                            ? pub.code
                            : tag === 'Link' && pub.url
                              ? pub.url
                              : undefined
                      return <PublicationTag key={tag} text={tag} href={href} />
                    })}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}

      <div className="divider-gradient-top pt-6 pb-8">
        <Link href="/" className="text-primary text-sm font-medium hover:underline">
          ← Back to Home
        </Link>
      </div>
    </SectionContainer>
  )
}
