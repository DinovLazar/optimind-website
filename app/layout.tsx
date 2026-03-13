import type { Metadata } from 'next'
import { DM_Sans, Syne } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://optimind000.com'),
  title: {
    default: 'OptiMind — AI-Powered Customer Support',
    template: '%s | OptiMind',
  },
  description:
    'OptiMind builds intelligent AI support agents that handle your customer emails and website chat — 24/7, at a fraction of the cost of a human team.',
  keywords: [
    'AI customer support',
    'customer support automation',
    'AI chatbot',
    'email automation',
    'B2B AI tools',
    'support agent',
    'OptiMind',
  ],
  authors: [{ name: 'OptiMind', url: 'https://optimind000.com' }],
  creator: 'OptiMind',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://optimind000.com',
    siteName: 'OptiMind',
    title: 'OptiMind — AI-Powered Customer Support',
    description:
      'Intelligent support agents that handle customer emails and live chat — 24/7, at a fraction of the cost.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OptiMind — AI-Powered Customer Support',
    description:
      'Intelligent support agents that handle customer emails and live chat — 24/7, at a fraction of the cost.',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/icon' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white antialiased">
        <Providers>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
