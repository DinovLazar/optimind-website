'use client'

import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'

interface PricingFeature {
  text: string
}

interface PricingPlan {
  name: string
  annualPrice: string
  monthlyPrice?: string
  annualNote: string
  description?: string
  setupFee?: string
  features: PricingFeature[]
  buttonText: string
  buttonStyle: 'outline' | 'solid' | 'ghost'
  featured?: boolean
  badge?: string
}

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    annualPrice: '$79',
    monthlyPrice: '$99',
    annualNote: '20% off if paid annually · $950/yr',
    setupFee: '$199 one-time setup fee',
    features: [
      { text: 'Website chat agent' },
      { text: 'Up to 500 conversations/mo' },
      { text: 'Trained on your FAQs & products' },
      { text: 'Weekly performance report' },
      { text: 'Email support' },
    ],
    buttonText: 'Get Started',
    buttonStyle: 'outline',
  },
  {
    name: 'Growth',
    annualPrice: '$159',
    monthlyPrice: '$199',
    annualNote: '20% off if paid annually · $1,910/yr',
    setupFee: '$299 one-time setup fee',
    features: [
      { text: 'Everything in Starter' },
      { text: 'Email support agent' },
      { text: 'Up to 2,000 conversations/mo' },
      { text: 'Human handoff when needed' },
      { text: 'Priority support' },
      { text: 'Monthly strategy call' },
    ],
    buttonText: 'Get Started',
    buttonStyle: 'solid',
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    annualPrice: 'Custom',
    annualNote: 'Volume discounts available',
    description: 'Tailored pricing based on your needs',
    features: [
      { text: 'Everything in Growth' },
      { text: 'Unlimited conversations' },
      { text: 'Multi-channel support' },
      { text: 'Custom integrations' },
      { text: 'Dedicated account manager' },
      { text: 'SLA guarantee' },
    ],
    buttonText: 'Contact Us',
    buttonStyle: 'ghost',
  },
]

function FilledCheck() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="8" fill="#4a7fd4" />
      <path
        d="M4.5 8.5l2.25 2.25L11.5 6"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function PricingSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-[#4a7fd4] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
              Pricing
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-5">
              Simple, transparent pricing.
            </h2>
            <p className="text-gray-500 dark:text-[#666666] text-lg max-w-2xl mx-auto leading-relaxed">
              No hidden fees. No long-term lock-in. Pick the plan that fits your business.
            </p>
          </div>
        </AnimatedSection>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <AnimatedSection key={plan.name} delay={index * 0.1} className="h-full">
              <div
                className={`
                  relative h-full flex flex-col transition-all duration-200 group
                  ${plan.featured
                    ? 'border-[#1a3a6e] hover:border-[#4a7fd4]'
                    : 'border-[#1e1e1e] hover:border-[#1a3a6e]'
                  }
                `}
                style={{
                  backgroundColor: plan.featured ? '#0d1a2e' : '#111111',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderRadius: '16px',
                  boxShadow: plan.featured
                    ? '0 0 56px rgba(74,127,212,0.10), 0 0 96px rgba(26,58,110,0.07)'
                    : undefined,
                }}
              >
                {/* Most Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                    <span
                      className="inline-block px-4 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: '#4a7fd4' }}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="flex flex-col h-full p-8">
                  {/* Plan name */}
                  <p className="text-sm font-medium text-[#888888] mb-5">{plan.name}</p>

                  {/* Price row */}
                  <div className="mb-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-heading text-[42px] font-bold leading-none text-white">
                        {plan.annualPrice}
                      </span>
                      {plan.annualPrice !== 'Custom' && (
                        <>
                          <span className="text-sm text-[#666666]">/mo</span>
                          {plan.monthlyPrice && (
                            <span
                              className="text-sm line-through"
                              style={{
                                color: plan.featured ? '#4a6a9a' : '#555555',
                                textDecoration: 'line-through',
                              }}
                            >
                              {plan.monthlyPrice}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Annual note */}
                  <p className="text-xs font-medium mb-1" style={{ color: '#4a7fd4' }}>
                    {plan.annualNote}
                  </p>

                  {/* Description (Enterprise only) */}
                  {plan.description && (
                    <p className="text-sm text-[#555555] mt-1">{plan.description}</p>
                  )}

                  {/* Setup fee */}
                  {plan.setupFee ? (
                    <p className="text-xs text-[#4d4d4d] mt-3 mb-6">{plan.setupFee}</p>
                  ) : (
                    <div className="mt-3 mb-6" />
                  )}

                  {/* Divider */}
                  <div className="w-full h-px mb-6" style={{ backgroundColor: '#1e1e1e' }} />

                  {/* Features */}
                  <ul className="flex flex-col gap-3 flex-1 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-2.5">
                        <FilledCheck />
                        <span className="text-sm leading-snug text-[#aaaaaa]">{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  {plan.buttonStyle === 'solid' && (
                    <Link
                      href="/contact"
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-85 hover:shadow-[0_0_28px_rgba(74,127,212,0.35)]"
                      style={{ backgroundColor: '#4a7fd4' }}
                    >
                      {plan.buttonText}
                    </Link>
                  )}
                  {plan.buttonStyle === 'outline' && (
                    <Link
                      href="/contact"
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium text-white border border-white/20 transition-all duration-200 hover:bg-white/5 hover:border-white/35"
                    >
                      {plan.buttonText}
                    </Link>
                  )}
                  {plan.buttonStyle === 'ghost' && (
                    <Link
                      href="/contact"
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium text-[#888888] transition-all duration-200 hover:text-white hover:bg-white/5"
                      style={{ border: '1px solid #1a3a6e' }}
                    >
                      {plan.buttonText}
                    </Link>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Below-cards note */}
        <AnimatedSection delay={0.35}>
          <p className="text-center text-sm text-[#555555] mt-12">
            Not sure which plan is right for you?{' '}
            <Link
              href="/contact"
              className="font-medium hover:underline underline-offset-2"
              style={{ color: '#4a7fd4' }}
            >
              Book a free 20-min call
            </Link>{' '}
            and we&apos;ll figure it out together. No commitment required.
          </p>
        </AnimatedSection>

      </div>
    </section>
  )
}
