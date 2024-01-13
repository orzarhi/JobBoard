import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Flow Jobs',
    template: '%s | Flow Jobs',
  },
  description: 'Find your dream developer job. ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn('min-w-[350px]', inter.className)}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
