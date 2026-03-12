import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import ContactForm from './ContactForm'

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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <AnimatedSection>
              <h1 className="font-heading text-6xl sm:text-7xl font-bold text-white tracking-tight mb-4 leading-[1.0]">
                Let&apos;s talk.
              </h1>
              <p className="text-[#777777] text-xl">
                We respond within 24 hours.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Form + Info ──────────────────────────────────── */}
      <section className="pb-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-14 lg:gap-20 items-start">

            {/* Form */}
            <AnimatedSection>
              <ContactForm />
            </AnimatedSection>

            {/* Info sidebar */}
            <AnimatedSection delay={0.2} className="flex flex-col gap-7">

              {/* Contact emails */}
              <div className="p-6 rounded-2xl border border-[#181818] bg-[#0e0e0e]">
                <p className="text-[11px] font-semibold text-[#333333] uppercase tracking-widest mb-5">
                  Contact
                </p>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-[11px] text-[#444444] mb-1.5">General inquiries</p>
                    <a
                      href="mailto:hello@optimind000.com"
                      className="text-[#888888] hover:text-white transition-colors text-sm"
                    >
                      hello@optimind000.com
                    </a>
                  </div>
                  <div className="border-t border-[#141414] pt-4">
                    <p className="text-[11px] text-[#444444] mb-1.5">Support</p>
                    <a
                      href="mailto:support@optimind000.com"
                      className="text-[#888888] hover:text-white transition-colors text-sm"
                    >
                      support@optimind000.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Book a call */}
              <div className="p-6 rounded-2xl border border-[#181818] bg-[#0e0e0e]">
                <p className="text-[11px] font-semibold text-[#333333] uppercase tracking-widest mb-3">
                  Book a Call
                </p>
                <p className="text-[#555555] text-sm leading-relaxed">
                  Prefer to schedule a call? Calendly link coming soon.
                </p>
                <p className="text-[#3a3a3a] text-sm mt-2">
                  For now, reach out via the form and we&apos;ll get a time on the calendar.
                </p>
              </div>

              {/* Response indicator */}
              <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-[#161616] bg-[#0a0a0a]">
                <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse flex-shrink-0" />
                <p className="text-[#555555] text-sm">
                  Typical response time:{' '}
                  <span className="text-[#888888]">under 24 hours</span>
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
