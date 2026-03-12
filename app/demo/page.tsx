import type { Metadata } from 'next'
import DemoClient from './DemoClient'

export const metadata: Metadata = {
  title: 'Live Demo',
  description:
    "Chat with Aria — OptiMind's AI assistant. Experience a live demo of the kind of customer support agent we build for your business.",
}

export default function DemoPage() {
  return <DemoClient />
}
