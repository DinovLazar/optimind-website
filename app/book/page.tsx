import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import BookingCalendar from '@/components/BookingCalendar'

export const metadata: Metadata = {
  title: 'Book a Call | OptiMind',
  description: 'Book a free 15-minute discovery call with the OptiMind team.',
}

export default function BookPage() {
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
                Book a call.
              </h1>
              <p className="text-gray-500 dark:text-[#777777] text-xl">
                Free 15-minute discovery call. No commitment.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Booking UI ───────────────────────────────────── */}
      <section className="pb-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto">
              <BookingCalendar />
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}
