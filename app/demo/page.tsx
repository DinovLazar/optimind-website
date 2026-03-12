import type { Metadata } from 'next'
import DemoClient from './DemoClient'

export const metadata: Metadata = {
  title: 'Live Demo',
  description:
    "Experience an interactive demo of OptiMind's Customer Support Agent — coming soon. Register to be notified.",
}

export default function DemoPage() {
  return <DemoClient />
}
