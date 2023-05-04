import { Navbar } from '@/components/navbar'
import './globals.css'
import { Providers } from '@/context/providers'
import { Footer } from '@/components/footer'
import { Container } from '@/components/ui/container'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Crypto-app',
  description: 'Cryptocurrency market app',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
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
      className={`${inter.variable} h-full`}
    >
      <body className="h-full">
        <Providers>
          {/* @ts-expect-error Async Server Component */}
          <Navbar />
          <div className="absolute -z-10 hidden h-80 w-full rounded-md bg-gradient-to-b from-slate-100/10 to-slate-900 dark:block"></div>
          <Container>{children}</Container>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
