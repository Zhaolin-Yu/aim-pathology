import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="divider-gradient-top py-4">
      <div className="text-muted flex flex-col items-center justify-between gap-3 text-xs sm:flex-row">
        {/* 左：Logo + 社交图标 */}
        <div className="flex items-center gap-3">
          <a href="https://www.monash.edu/it/aimh-lab" target="_blank" rel="noopener noreferrer">
            <Image
              src="/static/images/aim-logo.png"
              alt="AIM Lab"
              width={28}
              height={28}
              className="shrink-0"
              unoptimized
            />
          </a>
          {siteMetadata.email && (
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={4} />
          )}
          {siteMetadata.github && <SocialIcon kind="github" href={siteMetadata.github} size={4} />}
          {(siteMetadata.x || siteMetadata.twitter) && (
            <SocialIcon kind="x" href={siteMetadata.x || siteMetadata.twitter} size={4} />
          )}
        </div>

        {/* 中：版权 + 链接 */}
        <div className="flex flex-wrap items-center justify-center gap-x-1.5">
          <span>AIM for Pathology Team © {new Date().getFullYear()}</span>
          <span className="hidden sm:inline">·</span>
          <a
            href="https://www.monash.edu/it/aimh-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            AIM Lab
          </a>
          <span>·</span>
          <a
            href="https://zongyuange.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Zongyuan Ge
          </a>
        </div>

        {/* 右：地址 */}
        <span className="text-center sm:text-right">Monash University, Clayton VIC</span>
      </div>
    </footer>
  )
}
