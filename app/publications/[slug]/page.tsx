import 'css/prism.css'
import 'katex/dist/katex.css'

import { allPublications } from 'contentlayer/generated'
import type { Publication } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import SectionContainer from '@/components/SectionContainer'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import Link from '@/components/Link'
import { Metadata } from 'next'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata | undefined> {
  const { slug } = await props.params
  const pub = allPublications.find((p) => p.slug === slug)
  if (!pub) return undefined
  return {
    title: pub.title,
    description: `${pub.venue} · ${pub.authors?.join(', ') || ''}`,
  }
}

export function generateStaticParams() {
  return allPublications.filter((p) => !p.draft).map((p) => ({ slug: p.slug }))
}

export default async function PublicationPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const pub = allPublications.find((p) => p.slug === slug) as Publication | undefined
  if (!pub || pub.draft) return notFound()

  const body = pub.body as { raw?: string; code: string }

  return (
    <SectionContainer>
      <article>
        <header className="border-b border-gray-200 pb-6 dark:border-gray-700">
          <p className="text-muted text-xs font-medium tracking-wider uppercase">
            {formatDate(pub.date, siteMetadata.locale)}
          </p>
          <h1 className="text-foreground mt-1 text-2xl font-bold md:text-3xl">{pub.title}</h1>
          <p className="text-muted mt-2 text-sm">Venue: {pub.venue}</p>
          <p className="text-muted mt-1 text-sm">Authors: {pub.authors?.join(', ') || '—'}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {pub.pdf && (
              <a
                href={pub.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="border-primary/40 bg-primary/20 text-primary rounded border px-2 py-1 text-xs font-medium uppercase"
              >
                PDF
              </a>
            )}
            {pub.code && (
              <a
                href={pub.code}
                target="_blank"
                rel="noopener noreferrer"
                className="border-secondary/40 bg-secondary/20 text-secondary rounded border px-2 py-1 text-xs font-medium uppercase"
              >
                Code
              </a>
            )}
            {pub.url && (
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-primary/40 bg-primary/20 text-primary rounded border px-2 py-1 text-xs font-medium uppercase"
              >
                Link
              </a>
            )}
          </div>
        </header>
        <div className="prose prose-invert mt-8 max-w-none">
          {body?.code && <MDXLayoutRenderer code={body.code} components={components} />}
        </div>
        <footer className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link href="/publications" className="text-primary text-sm font-medium hover:underline">
            ← Back to Publications
          </Link>
        </footer>
      </article>
    </SectionContainer>
  )
}
