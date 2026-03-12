import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import HeaderTitle from '@/data/header-title.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  let outerClass = 'w-full bg-background/50 backdrop-blur-md'
  if (siteMetadata.stickyNav) {
    outerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={outerClass}>
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center">
            <div className="mr-3">
              <Logo />
            </div>
            <HeaderTitle className="text-foreground h-auto w-[140px] sm:w-[170px]" />
          </div>
        </Link>
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          <div className="no-scrollbar hidden flex-shrink-0 items-center gap-x-4 overflow-x-auto sm:flex md:gap-x-5 lg:gap-x-6">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hover:text-primary text-foreground m-1 font-medium"
                >
                  {link.title}
                </Link>
              ))}
          </div>
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
