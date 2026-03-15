import type { Metadata } from 'next'
import HomePageClient from '@/components/HomePageClient'

export const metadata: Metadata = {
  title: 'OptiMind — AI-Powered Customer Support',
  description:
    'OptiMind builds intelligent support agents that handle your customer emails and website chat — 24/7, at a fraction of the cost of a human team.',
}

export default function HomePage() {
  return <HomePageClient />
}
