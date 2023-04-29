import { ThemeSwitch } from './theme-switch'
import { InfoNav } from './info-nav'
import { MobileMenu } from './mobile-menu'
import Link from 'next/link'
import { Star, VenetianMask } from 'lucide-react'
import { ReactNode } from 'react'
import { SearchPopover } from './search-popover'
import { CryptoData, getCryptoData } from '@/lib/getCryptoData'
import { getTrendingCoins } from '@/lib/getTrendingCoins'

export async function Navbar() {
  const cryptos = await getCryptoData()
  return (
    <header className="border-b border-slate-200 dark:border-slate-800">
      <div className="flex flex-col lg:flex-col-reverse">
        <div className="w-full lg:mx-auto lg:max-w-7xl lg:px-6">
          <MainNav cryptos={cryptos} />
        </div>
        <div className="w-full border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between lg:mx-auto lg:max-w-7xl">
            {/* @ts-expect-error Async Server Component */}
            <InfoNav />
            <div className="mr-6 hidden lg:block">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function MainNav({ cryptos }: { cryptos: CryptoData }) {
  return (
    <nav className="flex w-full align-middle justify-between border-b border-slate-200 px-4 py-6 dark:border-slate-800 lg:justify-normal lg:border-none lg:px-0">
      <Link href="/">
        <h3 className="text-xl font-bold">Cryptosito</h3>
      </Link>
      <ul className="ml-auto hidden space-x-5 text-sm font-medium lg:flex">
        <li>
          <NavLink href="/watchlist">
            <Star className="h-4 w-4 fill-slate-700 text-slate-700 dark:fill-slate-300 dark:text-slate-300" />
            Watchlist
          </NavLink>
        </li>
        <li>
          <NavLink href="/portfolio">
            <VenetianMask className="h-4 w-4 text-slate-700 dark:text-slate-300" />
            Portfolio
          </NavLink>
        </li>
      </ul>
      <SearchPopover cryptos={cryptos} />
      <MobileMenu />
    </nav>
  )
}

export function NavLink({
  children,
  href,
}: {
  children: ReactNode
  href: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 rounded-md px-3 py-2 text-xs transition-all hover:bg-slate-200 dark:hover:bg-slate-800"
    >
      {children}
    </Link>
  )
}
