'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

interface FormState {
  name:    string
  company: string
  email:   string
  message: string
}

export default function ContactForm() {
  const [form, setForm]           = useState<FormState>({ name: '', company: '', email: '', message: '' })
  const [loading, setLoading]     = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]         = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please email us directly at hello@optimind000.com')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-5">
        <div className="w-16 h-16 rounded-full bg-[#1a3a6e]/10 dark:bg-[#1a3a6e]/18 border border-[#1a3a6e]/35 flex items-center justify-center">
          <CheckCircle size={28} className="text-[#4a7fd4]" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="font-heading font-bold text-gray-900 dark:text-white text-2xl mb-2">Message sent!</h3>
          <p className="text-gray-500 dark:text-[#666666] text-sm max-w-xs">
            Thanks for reaching out. We&apos;ll get back to you at{' '}
            <span className="text-gray-700 dark:text-[#888888]">{form.email}</span> within 24 hours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-gray-500 dark:text-[#555555] uppercase tracking-wider">
            Name <span className="text-gray-300 dark:text-[#333333]">*</span>
          </label>
          <input
            type="text"
            placeholder="John Smith"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="px-4 py-3 rounded-lg bg-white dark:bg-[#0e0e0e] border border-gray-200 dark:border-[#1d1d1d] text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-[#333333] focus:outline-none focus:border-[#1a3a6e] transition-colors text-sm"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-gray-500 dark:text-[#555555] uppercase tracking-wider">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Acme Corp"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="px-4 py-3 rounded-lg bg-white dark:bg-[#0e0e0e] border border-gray-200 dark:border-[#1d1d1d] text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-[#333333] focus:outline-none focus:border-[#1a3a6e] transition-colors text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold text-gray-500 dark:text-[#555555] uppercase tracking-wider">
          Email <span className="text-gray-300 dark:text-[#333333]">*</span>
        </label>
        <input
          type="email"
          placeholder="john@company.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="px-4 py-3 rounded-lg bg-white dark:bg-[#0e0e0e] border border-gray-200 dark:border-[#1d1d1d] text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-[#333333] focus:outline-none focus:border-[#1a3a6e] transition-colors text-sm"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold text-gray-500 dark:text-[#555555] uppercase tracking-wider">
          Message <span className="text-gray-300 dark:text-[#333333]">*</span>
        </label>
        <textarea
          placeholder="Tell us about your business and what you're looking for..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          rows={6}
          className="px-4 py-3 rounded-lg bg-white dark:bg-[#0e0e0e] border border-gray-200 dark:border-[#1d1d1d] text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-[#333333] focus:outline-none focus:border-[#1a3a6e] transition-colors text-sm resize-none"
        />
      </div>

      {error && <p className="text-red-500 dark:text-red-400/90 text-xs leading-relaxed">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#1a3a6e] hover:bg-[#2a5298] text-white font-medium transition-all duration-200 border border-[#2a5298]/40 hover:shadow-[0_0_28px_rgba(74,127,212,0.22)] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Send Message <ArrowRight size={15} />
          </>
        )}
      </button>
    </form>
  )
}
