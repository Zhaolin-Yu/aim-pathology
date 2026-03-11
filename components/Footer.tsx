import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700">
      <div className="mt-16 flex flex-col items-center pb-8">
        <div className="mb-3 flex flex-wrap justify-center gap-4">
          {siteMetadata.email && (
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          )}
          {siteMetadata.github && <SocialIcon kind="github" href={siteMetadata.github} size={6} />}
          {(siteMetadata.twitter || siteMetadata.x) && (
            <SocialIcon kind="x" href={siteMetadata.x || siteMetadata.twitter} size={6} />
          )}
        </div>
        <div className="text-muted mb-2 text-center text-sm">
          <p>AIM for Pathology Team © 2026</p>
          <p className="mt-1">Clayton, VIC, Australia</p>
          {siteMetadata.email && (
            <p className="mt-1">
              <a href={`mailto:${siteMetadata.email}`} className="text-primary hover:underline">
                {siteMetadata.email}
              </a>
            </p>
          )}
        </div>
        <div className="text-muted flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
          {siteMetadata.github && (
            <a
              href={siteMetadata.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
          )}
          {(siteMetadata.x || siteMetadata.twitter) && (
            <a
              href={siteMetadata.x || siteMetadata.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Twitter / X
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
