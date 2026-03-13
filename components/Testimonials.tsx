'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const testimonials = [
  {
    name: "James Carter",
    company: "CartHub E-commerce",
    role: "CEO",
    review: "Great service, very happy with the results. Response times went way down and customers noticed. Does what it says it does."
  },
  {
    name: "Sofia Reyes",
    company: "FitLife Studios",
    role: "Operations Manager",
    review: "honestly such a time saver. we get so many of the same questions every day and now i dont have to deal with any of them. setup was easy too, the team helped with everything"
  },
  {
    name: "Marcus Webb",
    company: "Novalux SaaS",
    role: "Founder",
    review: "Good product. Does what it promises. The weekly report is useful and the handoff to human agents works well. Would recommend to anyone running a small team."
  },
  {
    name: "Priya Nair",
    company: "ShopBridge",
    role: "Head of Support",
    review: "We've been using it for 3 months now and honestly can't imagine going back. The agent handles the boring stuff and my team focuses on the harder cases. Works really well for us."
  },
  {
    name: "Tom Eriksson",
    company: "Northwave Agency",
    role: "Co-Founder",
    review: "Pretty impressed overall. Had a few questions during setup and the support was quick. Been running smooth for weeks now with no issues. Good value."
  },
  {
    name: "Aisha Okonkwo",
    company: "Zara Boutique",
    role: "Owner",
    review: "5 stars. I run the shop by myself and customer emails were taking up half my day. Now they just get answered automatically. Wish I found this sooner honestly."
  }
]

const DESKTOP_PER_PAGE = 3
const MOBILE_PER_PAGE = 1

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

interface TestimonialCardProps {
  testimonial: typeof testimonials[number]
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex flex-col h-full p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111111] hover:border-[#1a3a6e]/50 dark:hover:border-[#4a7fd4]/30 transition-colors duration-200 group">
      {/* Quote mark */}
      <span className="text-5xl font-serif leading-none text-[#1a3a6e] mb-3 select-none">&ldquo;</span>

      {/* Review text */}
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex-1 mb-6">
        {testimonial.review}
      </p>

      {/* Bottom row */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#1a3a6e] text-white flex items-center justify-center text-xs font-bold shrink-0">
          {getInitials(testimonial.name)}
        </div>
        <div>
          <p className="text-gray-900 dark:text-white font-semibold text-sm leading-tight">
            {testimonial.name}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs leading-tight">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [perPage, setPerPage] = useState(DESKTOP_PER_PAGE)
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)

  const totalPages = Math.ceil(testimonials.length / perPage)

  // Sync perPage with viewport width
  useEffect(() => {
    function handleResize() {
      setPerPage(window.innerWidth < 768 ? MOBILE_PER_PAGE : DESKTOP_PER_PAGE)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Reset page when perPage changes to avoid out-of-range state
  useEffect(() => {
    setPage(0)
  }, [perPage])

  const advance = useCallback(() => {
    setPage((p) => (p + 1) % Math.ceil(testimonials.length / perPage))
  }, [perPage])

  // Auto-rotate
  useEffect(() => {
    if (paused) return
    const id = setInterval(advance, 4000)
    return () => clearInterval(id)
  }, [paused, advance])

  const visibleTestimonials = testimonials.slice(
    page * perPage,
    page * perPage + perPage
  )

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#1a3a6e] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
            Testimonials
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Trusted by businesses like yours
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
            See what our clients say about working with OptiMind
          </p>
        </div>

        {/* Cards */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${page}-${perPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {visibleTestimonials.map((t) => (
                <TestimonialCard key={t.name} testimonial={t} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === page
                  ? 'bg-[#1a3a6e] w-5'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
