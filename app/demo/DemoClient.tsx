'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function DemoClient() {
  const [form, setForm]           = useState({ name: '', email: '' })
  const [loading, setLoading]     = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate network call; swap for real API if desired
    await new Promise((r) => setTimeout(r, 900))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">

      {/* Animated background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 grid-overlay opacity-40" />

        <motion.div
          className="absolute top-[22%] left-[18%] w-[520px] h-[520px] bg-[#1a3a6e]/11 rounded-full blur-[130px]"
          animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[18%] right-[15%] w-[340px] h-[340px] bg-[#2563eb]/7 rounded-full blur-[90px]"
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        />

        {/* Floating particles */}
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#4a7fd4]/25"
            style={{
              left: `${8 + i * 6.5}%`,
              top: `${15 + ((i * 13) % 65)}%`,
            }}
            animate={{ y: [-8, 12, -8], opacity: [0.15, 0.55, 0.15] }}
            transition={{
              duration: 3.5 + (i % 4) * 0.8,
              repeat: Infinity,
              delay: i * 0.25,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#1a3a6e]/40 bg-[#1a3a6e]/10 text-[#6ba3e8] text-xs font-medium mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#6ba3e8] animate-pulse" />
          In Development
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-5xl sm:text-6xl font-bold text-white tracking-tight mb-5 leading-[1.08]"
        >
          Live Demo —{' '}
          <span className="gradient-text">Coming Soon</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#777777] text-lg leading-relaxed mb-12"
        >
          We&apos;re building an interactive demo of our Customer Support Agent. Leave your email
          and we&apos;ll notify you the moment it&apos;s live.
        </motion.p>

        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3.5 max-w-sm mx-auto"
          >
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0e0e0e] border border-[#1f1f1f] text-white placeholder-[#383838] focus:outline-none focus:border-[#1a3a6e] transition-colors text-sm"
            />
            <input
              type="email"
              placeholder="Your email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0e0e0e] border border-[#1f1f1f] text-white placeholder-[#383838] focus:outline-none focus:border-[#1a3a6e] transition-colors text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#1a3a6e] hover:bg-[#2a5298] text-white font-medium transition-all duration-200 border border-[#2a5298]/40 hover:shadow-[0_0_30px_rgba(74,127,212,0.25)] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Notify Me <ArrowRight size={15} />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 0.4, 0.22, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-[#1a3a6e]/20 border border-[#1a3a6e]/35 flex items-center justify-center">
              <CheckCircle size={28} className="text-[#4a7fd4]" strokeWidth={1.8} />
            </div>
            <p className="font-heading font-bold text-white text-xl">You&apos;re on the list!</p>
            <p className="text-[#666666] text-sm max-w-xs">
              We&apos;ll email you at{' '}
              <span className="text-[#888888]">{form.email}</span> the moment the demo goes live.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
