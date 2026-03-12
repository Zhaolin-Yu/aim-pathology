import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allPublications } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const publications = (allPublications || [])
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      venue: p.venue,
      authors: p.authors || [],
      tags: p.tags || [],
      url: p.url,
      pdf: p.pdf,
      code: p.code,
      image: p.image,
    }))
  return <Main posts={posts} publications={publications} />
}
