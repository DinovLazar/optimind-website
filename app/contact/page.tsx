import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import ContactForm from './ContactForm'
import BookingCalendar from '@/components/BookingCalendar'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Get in touch with OptiMind. We respond within 24 hours.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24">

      {/* ── Header ───────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50 dark:to-[#0a0a0a]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <AnimatedSection>
              <h1 className="font-heading text-6xl sm:text-7xl font-bold text-gray-900 dark:text-white tracking-tight mb-4 leading-[1.0]">
                Let&apos;s talk.
              </h1>
              <p className="text-gray-500 dark:text-[#777777] text-xl">
                We respond within 24 hours.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Form + Booking ────────────────────────────────── */}
      <section className="pb-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

            {/* Left — Contact form */}
            <AnimatedSection>
              <ContactForm />
            </AnimatedSection>

            {/* Right — Booking calendar */}
            <AnimatedSection delay={0.15}>
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-[#181818] bg-white dark:bg-[#0e0e0e]">
                <p className="text-[11px] font-semibold text-gray-400 dark:text-[#333333] uppercase tracking-widest mb-3">
                  Book a Call
                </p>
                <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Book a free 15-minute call.
                </h2>
                <p className="text-gray-500 dark:text-[#555555] text-sm mb-6">
                  Pick a time and we&apos;ll talk about your business.
                </p>
                <BookingCalendar />
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>
    </div>
  )
}
