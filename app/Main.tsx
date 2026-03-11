import Link from '@/components/Link'
import Tag from '@/components/Tag'
import BaffleSubtitle from '@/components/BaffleSubtitle'
import ResearchSection from '@/components/ResearchSection'
import FadeInSection from '@/components/FadeInSection'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_BLOG_DISPLAY = 5

const RESEARCH_ITEMS = [
  {
    id: 'cell',
    emoji: '🔬',
    title: 'Cell (细胞病理)',
    desc: 'Developing large-scale foundation models for histopathology and computational pathology, enabling high-precision cancer grading and microenvironment analysis.',
    image: 'https://placehold.co/800x400/18181b/c4b5fd?text=Cell+Pathology',
  },
  {
    id: 'dental',
    emoji: '🦷',
    title: 'Dental (数字化口腔 AI)',
    desc: 'Building specialized vision-language models and autonomous agents for panoramic X-ray and CBCT analysis. Empowering next-generation dental diagnosis and treatment planning.',
    image: 'https://placehold.co/800x400/18181b/6ee7b7?text=Dental+AI',
  },
  {
    id: 'ccta',
    emoji: '🫀',
    title: '3D CCTA (冠脉 CT 血管造影)',
    desc: 'Pushing the boundaries of 3D volume rendering and geometric deep learning for coronary artery segmentation, plaque quantification, and fluid dynamics simulation.',
    image: 'https://placehold.co/800x400/18181b/c4b5fd?text=3D+CCTA',
  },
  {
    id: 'virtual-cell',
    emoji: '🧬',
    title: 'Virtual Cell (虚拟细胞)',
    desc: 'Integrating multi-omics data and generative AI to simulate cellular dynamics. Creating in-silico models to understand disease progression at the fundamental biological level.',
    image: 'https://placehold.co/800x400/18181b/6ee7b7?text=Virtual+Cell',
  },
]

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
      <section className="relative flex min-h-screen flex-col justify-center border-b border-gray-200 py-12 md:py-20 dark:border-gray-700">
        <FadeInSection className="w-full">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-foreground text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              AIM for Pathology Team
            </h1>
            <p className="text-primary mt-4 text-center text-xl font-semibold md:text-2xl">
              <BaffleSubtitle />
            </p>
            <p className="text-muted mt-4 text-center text-base leading-7 md:text-lg">
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
                href="/team"
                className="border-primary/50 text-primary hover:bg-primary/10 rounded-lg border bg-transparent px-6 py-3 font-medium transition"
              >
                Join the Lab
              </Link>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Research */}
      <section
        id="research"
        className="flex min-h-screen scroll-mt-20 flex-col justify-center border-b border-gray-200 py-16 md:py-20 dark:border-gray-700"
      >
        <FadeInSection className="w-full">
          <ResearchSection items={RESEARCH_ITEMS} />
        </FadeInSection>
      </section>

      {/* Publications */}
      <section
        id="publications"
        className="flex min-h-screen scroll-mt-20 flex-col justify-center border-b border-gray-200 py-16 md:py-20 dark:border-gray-700"
      >
        <FadeInSection className="w-full">
          <div className="text-foreground mb-10 flex items-baseline justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Publications</h2>
            <Link
              href="/publications"
              className="text-primary text-sm font-medium hover:underline"
              aria-label="All publications"
            >
              All Publications →
            </Link>
          </div>
          <ul className="space-y-8">
            {publications.length === 0 && (
              <li className="text-muted">
                No publications yet. Add MDX files under data/publication/.
              </li>
            )}
            {publications.map((pub) => (
              <li key={pub.slug} className="border-primary/50 border-l-2 pl-6">
                <p className="text-muted text-xs font-medium tracking-wider uppercase">
                  {pub.date}
                </p>
                <h3 className="text-foreground mt-1 text-lg font-semibold">
                  <Link href={`/publications/${pub.slug}`} className="text-primary hover:underline">
                    {pub.title}
                  </Link>
                </h3>
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
              </li>
            ))}
          </ul>
        </FadeInSection>
      </section>

      {/* Blog preview */}
      <section className="flex min-h-screen flex-col justify-center border-b border-gray-200 py-16 md:py-20 dark:border-gray-700">
        <FadeInSection className="w-full">
          <div className="mb-10 flex items-baseline justify-between">
            <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">Blog</h2>
            <Link
              href="/blog"
              className="text-primary text-sm font-medium hover:underline"
              aria-label="All posts"
            >
              All Posts →
            </Link>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!posts.length && <li className="text-muted py-6">No posts yet.</li>}
            {posts.slice(0, MAX_BLOG_DISPLAY).map((post) => (
              <li key={post.slug} className="py-8 first:pt-0">
                <article>
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-muted text-sm font-medium">
                      <time dateTime={post.date}>{formatDate(post.date, siteMetadata.locale)}</time>
                    </dd>
                  </dl>
                  <div className="mt-2">
                    <h3 className="text-foreground text-lg font-semibold">
                      <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                        {post.title}
                      </Link>
                    </h3>
                    <div className="mt-1 flex flex-wrap">
                      {post.tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                    {post.summary && (
                      <p className="text-muted mt-2 text-sm leading-6">{post.summary}</p>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </FadeInSection>
      </section>

      {/* About */}
      <section
        id="about"
        className="flex min-h-screen scroll-mt-20 flex-col justify-center py-16 md:py-20"
      >
        <FadeInSection className="w-full">
          <h2 className="text-foreground mb-10 text-2xl font-bold tracking-tight md:text-3xl">
            About
          </h2>
          <div className="prose prose-invert text-muted max-w-none">
            <p className="leading-7">
              AIM for Pathology Team is a cutting-edge research group led by Dr. Zongyuan Ge. We sit
              at the intersection of computer vision, generative AI, and clinical medicine.
            </p>
            <p className="mt-4 leading-7">
              <strong className="text-foreground">Our Philosophy:</strong> We believe the next
              breakthrough in medical AI doesn&apos;t just come from brute-force computation, but
              from deep clinical insights and elegant algorithmic design. We are a collective of
              researchers, engineers, and (occasional) 80s anime enthusiasts, dedicated to building
              AI that truly understands the language of pathology, dentistry, and beyond.
            </p>
            <p className="mt-4 leading-7">
              <strong className="text-foreground">Join Us:</strong> We are always looking for
              passionate Ph.D. students, postdocs, and visiting scholars who want to push the
              boundaries of medical AI.
            </p>
          </div>
        </FadeInSection>
      </section>
    </>
  )
}
