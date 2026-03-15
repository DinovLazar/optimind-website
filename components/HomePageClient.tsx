'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Clock,
  DollarSign,
  Mail,
  Zap,
  TrendingUp,
  Globe,
  CheckCircle,
  PhoneCall,
  Code2,
  Rocket,
} from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import Testimonials from '@/components/Testimonials'

export default function HomePageClient() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="min-h-screen">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 mesh-gradient">
            <div className="absolute inset-0 grid-overlay" />
            <div className="absolute top-[28%] left-[18%] w-[480px] h-[480px] bg-[#1a3a6e]/8 dark:bg-[#1a3a6e]/14 rounded-full blur-[130px] animate-pulse-glow" />
            <div
              className="absolute bottom-[20%] right-[12%] w-[320px] h-[320px] bg-[#2563eb]/4 dark:bg-[#2563eb]/8 rounded-full blur-[90px] animate-pulse-glow"
              style={{ animationDelay: '2s' }}
            />
            <div
              className="absolute top-[10%] right-[30%] w-[200px] h-[200px] bg-[#1a3a6e]/4 dark:bg-[#1a3a6e]/8 rounded-full blur-[70px] animate-pulse-glow"
              style={{ animationDelay: '1s' }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 text-center">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#1a3a6e]/40 bg-[#1a3a6e]/10 text-[#6ba3e8] text-xs font-medium mb-8 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6ba3e8] animate-pulse" />
              AI-Powered Customer Support
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl lg:text-[72px] font-bold text-gray-900 dark:text-white leading-[1.08] tracking-tight mb-7 max-w-4xl mx-auto">
              AI-Powered Customer Support.{' '}
              <span className="gradient-text">Built for Your Business.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 dark:text-[#888888] max-w-2xl mx-auto mb-10 leading-relaxed">
              OptiMind builds intelligent support agents that handle your customer emails and
              website chat — 24/7, at a fraction of the cost of a human team.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#1a3a6e] hover:bg-[#2a5298] text-white font-medium transition-all duration-200 border border-[#2a5298]/40 hover:border-[#4a7fd4]/50 hover:shadow-[0_0_32px_rgba(74,127,212,0.28)] text-sm"
              >
                Try Live Demo →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-gray-300 dark:border-[#282828] hover:border-gray-400 dark:hover:border-[#383838] text-gray-600 dark:text-[#cccccc] hover:text-gray-900 dark:hover:text-white font-medium transition-all duration-200 hover:bg-gray-900/[0.03] dark:hover:bg-white/[0.03] text-sm"
              >
                Contact Us
              </Link>
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-3 text-center">
              No signup required · 5 message free trial
            </p>

            {/* Trust bar */}
            <div className="mt-16 flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
              {['24/7 Availability', 'Sub-second Responses', 'Custom-Trained', 'Easy Integration'].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-400 dark:text-[#4a4a4a]">
                    <CheckCircle size={13} className="text-[#1a3a6e]" strokeWidth={2.5} />
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none" />
        </section>

        {/* ── Problem ──────────────────────────────────────── */}
        <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-14">
                <p className="text-[#1a3a6e] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
                  The Problem
                </p>
                <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Support shouldn&apos;t cost a fortune.
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: Clock,
                  title: 'Slow response times frustrate customers',
                  body: 'Customers expect answers in minutes, not days. Long wait times drive churn and negative reviews.',
                  delay: 0,
                },
                {
                  icon: DollarSign,
                  title: 'Human support teams are expensive to scale',
                  body: 'Hiring, training, and retaining support agents is costly — and the demand never stops growing.',
                  delay: 0.1,
                },
                {
                  icon: Mail,
                  title: 'Missed emails mean lost revenue',
                  body: 'Every unanswered inquiry is a potential customer lost. No business can afford to go dark.',
                  delay: 0.2,
                },
              ].map((item) => (
                <AnimatedSection key={item.title} delay={item.delay}>
                  <div className="h-full p-6 rounded-2xl border border-gray-200 dark:border-[#181818] bg-white dark:bg-[#0e0e0e] hover:border-gray-300 dark:hover:border-[#252525] transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-[#1a3a6e]/10 dark:bg-[#1a3a6e]/15 flex items-center justify-center mb-5 group-hover:bg-[#1a3a6e]/20 dark:group-hover:bg-[#1a3a6e]/25 transition-colors">
                      <item.icon size={19} className="text-[#4a7fd4]" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-[17px] leading-snug mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 dark:text-[#5a5a5a] text-sm leading-relaxed">{item.body}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── Solution ─────────────────────────────────────── */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-blue-50/10 to-gray-50 dark:from-[#0a0a0a] dark:via-[#0c0f16] dark:to-[#0a0a0a]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#1a3a6e]/4 dark:bg-[#1a3a6e]/7 rounded-full blur-[110px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-14">
                <p className="text-[#1a3a6e] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
                  The Solution
                </p>
                <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-5">
                  We automate it. You focus on growth.
                </h2>
                <p className="text-gray-500 dark:text-[#666666] text-lg max-w-2xl mx-auto leading-relaxed">
                  OptiMind deploys AI agents trained specifically on your business — your products,
                  your tone, your FAQs. Your customers get instant, accurate answers. You get your
                  time back.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: Zap,
                  title: '24/7 Availability',
                  body: 'Your AI agent never sleeps, never calls in sick, and responds in under a second — day or night, every day.',
                  delay: 0,
                },
                {
                  icon: TrendingUp,
                  title: 'Dramatic Cost Reduction',
                  body: 'Cut support costs substantially compared to a traditional human team — while handling far more volume.',
                  delay: 0.12,
                },
                {
                  icon: Globe,
                  title: 'Seamless Integration',
                  body: 'Works with your existing email inbox and embeds directly into your website. No major overhauls needed.',
                  delay: 0.24,
                },
              ].map((item) => (
                <AnimatedSection key={item.title} delay={item.delay}>
                  <div className="h-full p-6 rounded-2xl border border-gray-200 dark:border-[#181818] bg-white dark:bg-[#0c0f16] hover:border-[#1a3a6e]/35 transition-all hover:shadow-[0_0_36px_rgba(26,58,110,0.14)] group card-glow">
                    <div className="w-10 h-10 rounded-lg bg-[#1a3a6e]/10 dark:bg-[#1a3a6e]/18 flex items-center justify-center mb-5 group-hover:bg-[#1a3a6e]/25 dark:group-hover:bg-[#1a3a6e]/35 transition-colors">
                      <item.icon size={19} className="text-[#4a7fd4]" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-[17px] leading-snug mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 dark:text-[#5a5a5a] text-sm leading-relaxed">{item.body}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── Products Preview ─────────────────────────────── */}
        <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-14">
                <p className="text-[#1a3a6e] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
                  Products
                </p>
                <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                  What we build.
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Available product */}
              <AnimatedSection delay={0}>
                <Link href="/products" className="block h-full group">
                  <div className="h-full p-8 rounded-2xl border border-gray-200 dark:border-[#181818] bg-white dark:bg-[#0e0e0e] hover:border-[#1a3a6e]/45 transition-all hover:shadow-[0_0_44px_rgba(26,58,110,0.18)] cursor-pointer">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0b2e18] border border-[#164d28] text-[#4ade80] text-xs font-semibold mb-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                      Available Now
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#6ba3e8] transition-colors">
                      Customer Support Agent
                    </h3>
                    <p className="text-gray-500 dark:text-[#666666] leading-relaxed mb-6 text-sm">
                      A fully custom AI agent trained on your business. Responds to customer emails
                      and handles live chat on your website — instantly, accurately, 24/7.
                    </p>
                    <div className="flex items-center gap-1.5 text-[#4a7fd4] text-sm font-medium">
                      Learn more <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>

              {/* Coming soon */}
              <AnimatedSection delay={0.12}>
                <div className="h-full p-8 rounded-2xl border border-gray-100 dark:border-[#141414] bg-gray-50 dark:bg-[#0a0a0a] opacity-55">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-[#141414] border border-gray-200 dark:border-[#222222] text-gray-400 dark:text-[#444444] text-xs font-semibold mb-5">
                    Coming Soon
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-gray-400 dark:text-[#3a3a3a] mb-3">
                    Weekly Newsletter Agent
                  </h3>
                  <p className="text-gray-400 dark:text-[#333333] leading-relaxed mb-6 text-sm">
                    Automatically generate and send a weekly newsletter to your customers —
                    personalized, on-brand, zero effort from your team.
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-400 dark:text-[#333333] text-sm font-medium cursor-not-allowed">
                    Notify Me When Available <ArrowRight size={14} />
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────── */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-blue-50/10 to-gray-50 dark:from-[#0a0a0a] dark:via-[#0c0e14] dark:to-[#0a0a0a]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-16">
                <p className="text-[#1a3a6e] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
                  Process
                </p>
                <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                  How it works.
                </h2>
              </div>
            </AnimatedSection>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Connector line */}
              <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] h-px bg-gradient-to-r from-transparent via-[#1a3a6e]/30 to-transparent pointer-events-none" />

              {[
                {
                  step: '01',
                  icon: PhoneCall,
                  title: 'Discovery Call',
                  body: "We learn about your business, customers, and goals. No jargon, no pressure — just a real conversation about what you need.",
                  delay: 0,
                },
                {
                  step: '02',
                  icon: Code2,
                  title: 'We Build & Train Your Agent',
                  body: "Our team builds and trains your custom AI agent on your products, FAQs, policies, and brand voice. You review before it goes live.",
                  delay: 0.15,
                },
                {
                  step: '03',
                  icon: Rocket,
                  title: 'Go Live',
                  body: "Your agent goes live across email and your website. We monitor everything, handle issues, and send weekly performance reports.",
                  delay: 0.3,
                },
              ].map((item) => (
                <AnimatedSection key={item.step} delay={item.delay}>
                  <div className="text-center px-4">
                    <div className="w-[104px] h-[104px] rounded-full border border-[#1a3a6e]/25 bg-blue-50/50 dark:bg-[#0c1220] flex items-center justify-center mx-auto mb-6 relative">
                      <item.icon size={30} className="text-[#4a7fd4]" strokeWidth={1.5} />
                    </div>
                    <p className="font-heading text-[#1a3a6e] text-xs font-bold tracking-[0.2em] uppercase mb-2">
                      {item.step}
                    </p>
                    <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-gray-500 dark:text-[#555555] text-sm leading-relaxed">{item.body}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────── */}
        <Testimonials />

        {/* ── Final CTA ────────────────────────────────────── */}
        <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="relative rounded-2xl border border-[#1a3a6e]/40 dark:border-[#1a3a6e]/25 bg-[#1a3a6e] dark:bg-gradient-to-br dark:from-[#0c1422] dark:via-[#0d1118] dark:to-[#0a0a0a] p-12 sm:p-16 text-center overflow-hidden">
                <div className="absolute inset-0 bg-white/5 dark:bg-[#1a3a6e]/4 rounded-2xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-white/8 dark:bg-[#1a3a6e]/12 rounded-full blur-[70px] pointer-events-none" />

                <div className="relative z-10">
                  <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
                    Ready to transform your support?
                  </h2>
                  <p className="text-blue-100 dark:text-[#666666] text-lg mb-10 max-w-xl mx-auto">
                    Join the businesses saving time and money with AI-powered customer support.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-[#1a3a6e] hover:bg-blue-50 dark:bg-[#1a3a6e] dark:text-white dark:hover:bg-[#2a5298] font-medium text-base transition-all duration-200 border border-white/30 dark:border-[#2a5298]/40 hover:shadow-[0_0_44px_rgba(255,255,255,0.2)] dark:hover:shadow-[0_0_44px_rgba(74,127,212,0.32)] dark:hover:border-[#4a7fd4]/50"
                  >
                    Get in Touch
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </motion.div>
  )
}
