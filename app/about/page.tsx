import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about OptiMind — built by developers who believe support should be smarter, faster, and more affordable.',
}

const team = [
  { initials: 'LD', name: 'Larry Davis',    role: 'Co-Founder & Developer' },
  { initials: 'PJ', name: 'Petar Jakimov',  role: 'Co-Founder & Developer' },
  { initials: 'AJ', name: 'Andrej Jakimov', role: 'Consultant & Partner'   },
]

const values = [
  {
    label: 'Practical AI',
    description:
      "We build AI that solves real business problems — not demos, not experiments. Every product we ship is production-ready and delivers results from day one.",
  },
  {
    label: 'Client First',
    description:
      "Our success is measured by yours. We work closely with every client to ensure their AI agent is accurate, on-brand, and genuinely useful to their customers.",
  },
  {
    label: 'Transparency',
    description:
      "No black boxes. We explain how your agent works, share performance data weekly, and tell you honestly when something can or can't be done.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <AnimatedSection>
              <p className="text-[#1a3a6e] text-xs font-semibold uppercase tracking-[0.18em] mb-5">
                About Us
              </p>
              <h1 className="font-heading text-5xl sm:text-6xl font-bold text-white tracking-tight leading-[1.08] mb-6">
                Built by developers who believe support should be smarter.
              </h1>
              <p className="text-[#777777] text-xl leading-relaxed">
                OptiMind was founded with one goal: use AI to make customer support faster,
                cheaper, and better for everyone. We&apos;re a small, focused team building
                practical AI tools for real businesses — starting with the most painful part:
                support.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Location badge ───────────────────────────────── */}
      <section className="pb-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#1a1a1a] bg-[#0e0e0e] text-[#555555] text-sm">
              <span className="text-base select-none">📍</span>
              Based in Strumica, North Macedonia
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────── */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-12">
              <p className="text-[#1a3a6e] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
                Team
              </p>
              <h2 className="font-heading text-4xl font-bold text-white tracking-tight">
                Meet the team.
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.1}>
                <div className="p-6 rounded-2xl border border-[#181818] bg-[#0e0e0e] hover:border-[#1a3a6e]/30 transition-all hover:shadow-[0_0_28px_rgba(26,58,110,0.10)] text-center group">
                  {/* Avatar */}
                  <div className="w-[68px] h-[68px] rounded-full bg-gradient-to-br from-[#1a3a6e] to-[#0d1f3e] border border-[#2a5298]/30 flex items-center justify-center mx-auto mb-4 group-hover:border-[#3b6fd4]/35 transition-colors">
                    <span className="font-heading font-bold text-white text-[18px] tracking-widest select-none">
                      {member.initials}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-white text-[17px] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#555555] text-sm">{member.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0c0e14] to-[#0a0a0a]" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#1a3a6e]/7 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-12">
              <p className="text-[#1a3a6e] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
                Values
              </p>
              <h2 className="font-heading text-4xl font-bold text-white tracking-tight">
                What we stand for.
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <AnimatedSection key={v.label} delay={i * 0.1}>
                <div className="h-full p-6 rounded-2xl border border-[#181818] bg-[#0e0e0e] hover:border-[#1a3a6e]/25 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#1a3a6e]/18 border border-[#1a3a6e]/20 flex items-center justify-center mb-4">
                    <div className="w-2.5 h-2.5 rounded-[3px] bg-[#4a7fd4]" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-xl mb-3">{v.label}</h3>
                  <p className="text-[#5a5a5a] text-sm leading-relaxed">{v.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
