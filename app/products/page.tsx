import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Clock, ArrowRight, Zap, Mail, BarChart3, AlertCircle, Users, Newspaper } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'Products',
  description:
    "Explore OptiMind's AI automation products — a custom customer support agent available now, with more on the way.",
}

const supportFeatures = [
  { icon: Zap,         text: '24/7 automated responses via email and website chat' },
  { icon: Mail,        text: 'Trained on your products, FAQs, and tone of voice' },
  { icon: BarChart3,   text: 'Weekly usage recap report delivered to you' },
  { icon: AlertCircle, text: '24/7 uptime monitoring — we alert you if anything fails' },
  { icon: Newspaper,   text: 'Optional: Weekly newsletter sent automatically to your customers' },
  { icon: Users,       text: 'Seamless handoff to human agents when needed' },
]

const newsletterFeatures = [
  'AI-generated weekly content tailored to your brand voice',
  'Automatic audience segmentation and personalization',
  'Engagement tracking — opens, clicks, and response rates',
  'Fully managed — no copywriter or designer needed',
  'Direct integration with your existing email list',
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-24 bg-gray-50 dark:bg-[#0a0a0a]">

      {/* ── Header ───────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50 dark:to-[#0a0a0a]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-[#1a3a6e] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
              Products
            </p>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-5">
              What we build.
            </h1>
            <p className="text-gray-500 dark:text-[#777777] text-xl max-w-xl mx-auto leading-relaxed">
              Practical AI tools for real businesses. Starting with the hardest part — customer
              support.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Customer Support Agent ───────────────────────── */}
      <section className="py-16 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative rounded-2xl border border-gray-200 dark:border-[#1a3a6e]/30 bg-white dark:bg-gradient-to-br dark:from-[#0c1422] dark:via-[#0e1118] dark:to-[#0a0a0a] overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1a3a6e]/8 rounded-full blur-[120px] pointer-events-none" />

              <div className="relative z-10 p-8 sm:p-12 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                  {/* Left: copy */}
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 dark:bg-[#0b2e18] border border-green-200 dark:border-[#164d28] text-green-700 dark:text-[#4ade80] text-xs font-semibold mb-7">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-[#4ade80] animate-pulse" />
                      Available Now
                    </div>

                    <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-5 leading-[1.1]">
                      Customer Support Agent
                    </h2>

                    <p className="text-gray-600 dark:text-[#777777] text-lg leading-relaxed mb-8">
                      A fully custom AI agent trained on your business. Responds to customer emails
                      and handles live chat on your website — instantly, accurately, 24/7.
                    </p>

                    <p className="text-gray-500 dark:text-[#555555] text-sm leading-relaxed mb-10">
                      Every agent is built from scratch for your business. We study your products,
                      your support history, and your brand tone before writing a single line of
                      configuration. The result is an agent that sounds like you — not a generic
                      chatbot.
                    </p>

                    <div className="flex items-center gap-3">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#1a3a6e] hover:bg-[#2a5298] text-white font-medium transition-all duration-200 border border-[#2a5298]/40 hover:border-[#4a7fd4]/50 hover:shadow-[0_0_32px_rgba(74,127,212,0.28)] text-sm"
                      >
                        Get Started
                        <ArrowRight size={15} />
                      </Link>
                      <Link
                        href="/demo"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-[#1a3a6e] text-[#1a3a6e] dark:border-white/30 dark:text-white hover:bg-[#1a3a6e] hover:text-white hover:border-[#1a3a6e] font-medium transition-all duration-200 text-sm"
                      >
                        Try Demo
                      </Link>
                    </div>
                  </div>

                  {/* Right: feature list */}
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 dark:text-[#333333] uppercase tracking-widest mb-5">
                      What&apos;s Included
                    </p>
                    <ul className="space-y-4">
                      {supportFeatures.map(({ icon: Icon, text }) => (
                        <li key={text} className="flex items-start gap-3.5">
                          <div className="w-7 h-7 rounded-md bg-gray-100 dark:bg-[#0d1f3a] border border-gray-200 dark:border-[#1a3a6e]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon size={14} className="text-[#4a7fd4]" strokeWidth={2} />
                          </div>
                          <span className="text-gray-700 dark:text-[#888888] text-sm leading-relaxed">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Weekly Newsletter Agent ──────────────────────── */}
      <section className="pb-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative rounded-2xl border border-gray-200 dark:border-[#161616] bg-gray-100/50 dark:bg-black/50 overflow-hidden opacity-60">
              <div className="p-8 sm:p-12 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                  {/* Left: copy */}
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 text-xs font-semibold mb-7">
                      <Clock size={11} strokeWidth={2.5} />
                      Coming Soon
                    </div>

                    <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-400 dark:text-[#444444] tracking-tight mb-5 leading-[1.1]">
                      Weekly Newsletter Agent
                    </h2>

                    <p className="text-gray-500 dark:text-[#333333] text-lg leading-relaxed mb-8">
                      Automatically generate and send a weekly newsletter to your customers —
                      personalized, on-brand, zero effort from your team.
                    </p>

                    <p className="text-gray-400 dark:text-[#2a2a2a] text-sm leading-relaxed mb-10">
                      Our newsletter agent will pull from your latest products, announcements, and
                      industry news to craft a professional newsletter that goes out every week —
                      on autopilot.
                    </p>

                    <button
                      disabled
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-gray-200 dark:bg-white/5 text-gray-400 dark:text-gray-600 font-medium text-sm cursor-not-allowed border border-gray-200 dark:border-white/10"
                    >
                      Notify Me When Available
                      <ArrowRight size={15} />
                    </button>
                  </div>

                  {/* Right: planned features */}
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 dark:text-[#222222] uppercase tracking-widest mb-5">
                      Planned Features
                    </p>
                    <ul className="space-y-4">
                      {newsletterFeatures.map((text) => (
                        <li key={text} className="flex items-start gap-3.5">
                          <CheckCircle
                            size={16}
                            className="text-gray-300 dark:text-[#222222] flex-shrink-0 mt-0.5"
                            strokeWidth={2}
                          />
                          <span className="text-gray-500 dark:text-[#2e2e2e] text-sm leading-relaxed">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Bottom CTA */}
          <AnimatedSection delay={0.1} className="mt-14 text-center">
            <p className="text-gray-500 dark:text-[#555555] text-sm mb-4">
              Ready to get started with the Customer Support Agent?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[#4a7fd4] hover:text-[#6ba3e8] font-medium text-sm transition-colors"
            >
              Talk to us today <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
