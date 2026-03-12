import Link from '@/components/Link'
import Tag from '@/components/Tag'
import BaffleSubtitle from '@/components/BaffleSubtitle'
import ResearchSection from '@/components/ResearchSection'
import FadeInSection from '@/components/FadeInSection'
import PublicationTag from '@/components/PublicationTag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_BLOG_DISPLAY = 5

const RESEARCH_ITEMS = [
  {
    id: 'cell',
    emoji: '🔬',
    title: 'Cell Pathology',
    desc: 'Developing large-scale foundation models for histopathology and computational pathology, enabling high-precision cancer grading and microenvironment analysis.',
    image: 'https://placehold.co/800x400/18181b/c4b5fd?text=Cell+Pathology',
  },
  {
    id: 'dental',
    emoji: '🦷',
    title: 'Dental AI',
    desc: 'Building specialized vision-language models and autonomous agents for panoramic X-ray and CBCT analysis. Empowering next-generation dental diagnosis and treatment planning.',
    image: 'https://placehold.co/800x400/18181b/6ee7b7?text=Dental+AI',
  },
  {
    id: 'ccta',
    emoji: '🫀',
    title: '3D CCTA',
    desc: 'Pushing the boundaries of 3D volume rendering and geometric deep learning for coronary artery segmentation, plaque quantification, and fluid dynamics simulation.',
    image: 'https://placehold.co/800x400/18181b/c4b5fd?text=3D+CCTA',
  },
  {
    id: 'virtual-cell',
    emoji: '🧬',
    title: 'Virtual Cell',
    desc: 'Integrating multi-omics data and generative AI to simulate cellular dynamics. Creating in-silico models to understand disease progression at the fundamental biological level.',
    image: 'https://placehold.co/800x400/18181b/6ee7b7?text=Virtual+Cell',
  },
]

export default function Home({
  posts,
  publications = [],
}: {
  posts: { slug: string; date: string; title: string; summary?: string; tags: string[] }[]
  publications?: {
    slug: string
    title: string
    date: string
    venue: string
    authors: string[]
    tags: string[]
    url?: string
    pdf?: string
    code?: string
  }[]
}) {
  return (
    <>
      {/* Hero */}
      <FadeInSection className="w-full">
        <section className="relative flex min-h-screen flex-col justify-center py-12 md:py-20">
          <div className="hero-glow mx-auto max-w-4xl">
            <h1 className="text-foreground text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              AIM for Pathology Team
            </h1>
            <p className="text-primary mt-4 text-center text-xl font-semibold md:text-2xl">
              <BaffleSubtitle />
            </p>
            <p className="text-muted mt-6 text-center text-base leading-7 md:text-lg">
              We build intelligent foundation models and multimodal agents to bridge the gap between
              microscopic pathology and macroscopic medical imaging. From virtual cells to fully
              autonomous diagnostic systems.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/#research"
                className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition hover:opacity-90"
              >
                Explore Our Research
              </Link>
              <Link
                href="/#about"
                className="text-primary hover:bg-primary/10 rounded-lg border border-gray-300 bg-transparent px-6 py-3 font-medium transition dark:border-gray-600"
              >
                About Lab
              </Link>
            </div>
          </div>
        </section>
        <div className="divider-gradient" />
      </FadeInSection>

      {/* Research */}
      <FadeInSection className="w-full">
        <section id="research" className="scroll-mt-20 py-16 md:py-24">
          <ResearchSection items={RESEARCH_ITEMS} />
        </section>
        <div className="divider-gradient" />
      </FadeInSection>

      {/* Publications */}
      <FadeInSection className="w-full">
        <section id="publications" className="scroll-mt-20 py-16 md:py-24">
          <div className="text-foreground mb-8 flex items-baseline justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Publications</h2>
            <Link
              href="/publications"
              className="text-primary text-sm font-medium hover:underline"
              aria-label="All publications"
            >
              All Publications →
            </Link>
          </div>

          {publications.length === 0 && (
            <p className="text-muted">
              No publications yet. Add MDX files under data/publication/.
            </p>
          )}

          <div className="space-y-0">
            {publications.map((pub) => (
              <article key={pub.slug} className="pub-row py-5 pl-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <time
                    dateTime={pub.date}
                    className="text-muted shrink-0 font-mono text-xs tabular-nums"
                  >
                    {formatDate(pub.date, siteMetadata.locale)}
                  </time>
                  <span className="text-muted hidden font-mono text-xs sm:inline">·</span>
                  <span className="text-muted font-mono text-xs tracking-wider uppercase">
                    {pub.venue}
                  </span>
                </div>
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
                            : undefined
                      return <PublicationTag key={tag} text={tag} href={href} />
                    })}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
        <div className="divider-gradient" />
      </FadeInSection>

      {/* Blog */}
      <FadeInSection className="w-full">
        <section className="py-16 md:py-24">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">Blog</h2>
            <Link
              href="/blog"
              className="text-primary text-sm font-medium hover:underline"
              aria-label="All posts"
            >
              All Posts →
            </Link>
          </div>

          {!posts.length && <p className="text-muted">No posts yet.</p>}

          <ul className="divide-y divide-gray-200/60 dark:divide-gray-700/60">
            {posts.slice(0, MAX_BLOG_DISPLAY).map((post) => (
              <li key={post.slug} className="py-5 first:pt-0">
                <article className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                  <time
                    dateTime={post.date}
                    className="text-muted shrink-0 font-mono text-xs tabular-nums sm:w-36"
                  >
                    {formatDate(post.date, siteMetadata.locale)}
                  </time>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-foreground text-base leading-snug font-semibold">
                      <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                        {post.title}
                      </Link>
                    </h3>
                    {post.summary && (
                      <p className="text-muted mt-1 text-sm leading-relaxed">{post.summary}</p>
                    )}
                    {post.tags.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
        <div className="divider-gradient" />
      </FadeInSection>

      {/* About */}
      <FadeInSection className="w-full">
        <section id="about" className="scroll-mt-20 py-16 md:py-24">
          <h2 className="text-foreground mb-8 text-2xl font-bold tracking-tight md:text-3xl">
            About
          </h2>
          <div className="text-muted max-w-3xl space-y-5 text-base leading-7">
            <p>
              <strong className="text-foreground">AIM for Pathology Team</strong> is a research
              group led by Dr. Zongyuan Ge, working at the intersection of computer vision,
              generative AI, and clinical medicine.
            </p>
            <p>
              We believe the next breakthrough in medical AI doesn&apos;t just come from brute-force
              computation, but from deep clinical insights and elegant algorithmic design. We are a
              collective of researchers, engineers, and (occasional) 80s anime enthusiasts,
              dedicated to building AI that truly understands the language of pathology, dentistry,
              and beyond.
            </p>
            <p>
              We are always looking for passionate Ph.D. students, postdocs, and visiting scholars.{' '}
              <Link href="/team" className="text-primary font-medium hover:underline">
                Meet the team & join us →
              </Link>
            </p>
          </div>
        </section>
      </FadeInSection>
    </>
  )
}
