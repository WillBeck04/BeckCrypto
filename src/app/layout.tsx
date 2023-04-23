import { Navbar } from '@/components/navbar'
import './globals.css'
import { Providers } from './providers'
import { Footer } from '@/components/footer'
import { Container } from '@/components/ui/container'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Crypto-app',
  description: 'Cryptocurrency market app',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} font-sans`}
    >
      <body>
        <Providers>
          <Navbar />
          <div className="absolute -z-10 h-96 w-full rounded-md bg-gradient-to-b from-indigo-500/20 to-slate-100/20 dark:to-slate-900/20"></div>
          <Container>{children}</Container>
        </Providers>
        <Footer />
      </body>
    </html>
  )
}
