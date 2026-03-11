import { allPublications } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import SectionContainer from '@/components/SectionContainer'
import Link from '@/components/Link'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({ title: 'Publications' })

function PublicationTag({ text, href }: { text: string; href?: string }) {
  const isSecondary = ['Code', 'New', 'Demo', 'Agent', 'VLM', 'Dataset'].some((t) =>
    text.toLowerCase().includes(t.toLowerCase())
  )
  const className = isSecondary
    ? 'border-secondary/40 bg-secondary/20 text-secondary'
    : 'border-primary/40 bg-primary/20 text-primary'
  const content = (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium uppercase ${className}`}
    >
      {text}
    </span>
  )
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="mr-2 last:mr-0">
        {content}
      </a>
    )
  }
  return <span className="mr-2 last:mr-0">{content}</span>
}

export default function PublicationsPage() {
  const list = (allPublications || [])
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <SectionContainer>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-foreground text-3xl font-extrabold tracking-tight md:text-4xl">
            Publications
          </h1>
          <p className="text-muted text-lg leading-7">
            Selected publications from AIM for Pathology Team.
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {list.length === 0 && <li className="text-muted py-8">No publications yet.</li>}
          {list.map((pub) => (
            <li key={pub.slug} className="py-8 first:pt-0">
              <article>
                <p className="text-muted text-xs font-medium tracking-wider uppercase">
                  {formatDate(pub.date, siteMetadata.locale)}
                </p>
                <h2 className="text-foreground mt-1 text-xl font-semibold">
                  <Link href={`/publications/${pub.slug}`} className="text-primary hover:underline">
                    {pub.title}
                  </Link>
                </h2>
                <p className="text-muted mt-1 text-sm">Venue: {pub.venue}</p>
                <p className="text-muted mt-1 text-sm">Authors: {pub.authors?.join(', ') || '—'}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {pub.tags?.map((tag) => {
                    const href =
                      tag === 'PDF' && pub.pdf
                        ? pub.pdf
                        : tag === 'Code' && pub.code
                          ? pub.code
                          : undefined
                    return <PublicationTag key={tag} text={tag} href={href} />
                  })}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-4 pb-8">
        <Link href="/#publications" className="text-primary text-sm font-medium hover:underline">
          ← Back to Home
        </Link>
      </div>
    </SectionContainer>
  )
}
