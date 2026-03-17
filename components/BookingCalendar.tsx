'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Calendar helpers ────────────────────────────────────────────────────────

function buildCalendarWeeks(year: number, month: number): (number | null)[][] {
  const firstDay    = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  let startDow = firstDay.getDay()
  startDow = startDow === 0 ? 6 : startDow - 1 // Mon = 0, Sun = 6

  const weeks: (number | null)[][] = []
  let week: (number | null)[] = Array(startDow).fill(null) as null[]

  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null)
    weeks.push(week)
  }
  return weeks
}

function padTwo(n: number): string {
  return String(n).padStart(2, '0')
}

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${padTwo(month + 1)}-${padTwo(day)}`
}

function formatSlotLocal(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso))
}

function formatDateLabel(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  })
}

const MONTH_NAMES = [
  'January', 'February', 'March',     'April',   'May',      'June',
  'July',    'August',   'September', 'October', 'November', 'December',
]
const DAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// ── Step indicator ──────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  const steps = [
    { num: 1 as const, label: 'Date' },
    { num: 2 as const, label: 'Time' },
    { num: 3 as const, label: 'Details' },
  ]
  return (
    <div className="flex items-center gap-2 mb-6 flex-wrap">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center gap-2">
          <div
            className={cn(
              'flex items-center gap-1.5 text-sm font-medium transition-colors',
              s.num <= current ? 'text-[#4a7fd4]' : 'text-[#555555] dark:text-[#444444]'
            )}
          >
            {s.num < current ? (
              <CheckCircle size={14} strokeWidth={2} className="text-[#4a7fd4]" />
            ) : (
              <span
                className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold border',
                  s.num === current
                    ? 'border-[#4a7fd4] text-[#4a7fd4]'
                    : 'border-[#333333] text-[#555555]'
                )}
              >
                {s.num}
              </span>
            )}
            <span>
              {s.num} · {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                'w-6 h-px hidden sm:block',
                s.num < current ? 'bg-[#4a7fd4]' : 'bg-[#2a2a2a]'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// ── Shared class constants ──────────────────────────────────────────────────

const INPUT_CLASS =
  'px-4 py-3 rounded-lg bg-white dark:bg-[#0e0e0e] border border-gray-200 dark:border-[#1d1d1d] text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-[#333333] focus:outline-none focus:border-[#1a3a6e] transition-colors text-sm w-full'

const LABEL_CLASS =
  'text-[11px] font-semibold text-gray-500 dark:text-[#555555] uppercase tracking-wider'

// ── Main component ──────────────────────────────────────────────────────────

export default function BookingCalendar() {
  const today    = new Date()
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate())

  const maxDate = new Date(today)
  maxDate.setDate(today.getDate() + 60)

  const [step,         setStep]         = useState<1 | 2 | 3>(1)
  const [viewYear,     setViewYear]     = useState(today.getFullYear())
  const [viewMonth,    setViewMonth]    = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [slots,        setSlots]        = useState<string[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError,   setSlotsError]   = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [form,         setForm]         = useState({ name: '', email: '', company: '', message: '' })
  const [submitting,   setSubmitting]   = useState(false)
  const [submitted,    setSubmitted]    = useState(false)
  const [submitError,  setSubmitError]  = useState<string | null>(null)

  function isDateDisabled(year: number, month: number, day: number): boolean {
    const d          = new Date(year, month, day)
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return d < todayStart || d > maxDate
  }

  async function handleDateSelect(dateStr: string) {
    setSelectedDate(dateStr)
    setSlotsLoading(true)
    setSlotsError(null)
    setSlots([])
    setSelectedSlot(null)
    try {
      const res = await fetch(`/api/book/slots?date=${dateStr}`)
      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as Record<string, unknown>
        const msg = typeof data.error === 'string' ? data.error : 'Unable to load availability.'
        throw new Error(msg)
      }
      const data = await res.json() as { slots: string[] }
      setSlots(data.slots)
      setStep(2)
    } catch (err: unknown) {
      setSlotsError(
        err instanceof Error
          ? err.message
          : 'Unable to load availability. Please try again or email us at hello@optimind000.com'
      )
    } finally {
      setSlotsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting || submitted || !selectedSlot) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/book/confirm', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slot:    selectedSlot,
          name:    form.name,
          email:   form.email,
          company: form.company || undefined,
          message: form.message || undefined,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as Record<string, unknown>
        throw new Error(typeof data.error === 'string' ? data.error : 'Booking failed.')
      }
      setSubmitted(true)
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  // ── Success state ───────────────────────────────────────────────────────
  if (submitted && selectedSlot) {
    return (
      <div className="text-center py-10 flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-[#1a3a6e]/10 dark:bg-[#1a3a6e]/18 border border-[#1a3a6e]/35 flex items-center justify-center">
          <CheckCircle size={24} className="text-[#4a7fd4]" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-2">
            You&apos;re booked!
          </h3>
          <p className="text-gray-500 dark:text-[#666666] text-sm leading-relaxed">
            Confirmation sent to{' '}
            <span className="text-gray-700 dark:text-[#888888]">{form.email}</span>.<br />
            We&apos;ll see you on{' '}
            <span className="text-gray-700 dark:text-[#888888]">
              {selectedDate ? formatDateLabel(selectedDate) : ''} at {formatSlotLocal(selectedSlot)}
            </span>.
          </p>
        </div>
        <Link
          href="/"
          className="mt-1 px-5 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-[#666666] border border-gray-200 dark:border-[#222222] hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-[#333333] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  const weeks = buildCalendarWeeks(viewYear, viewMonth)

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1) }
    else setViewMonth((m) => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1) }
    else setViewMonth((m) => m + 1)
  }

  return (
    <div>
      <StepIndicator current={step} />

      {/* ── Step 1: Calendar ──────────────────────────────────────────────── */}
      {step === 1 && (
        <div>
          {slotsError && (
            <div className="mb-4 p-3 rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 text-sm flex justify-between items-start gap-3">
              <span>{slotsError}</span>
              <button
                onClick={() => setSlotsError(null)}
                className="shrink-0 text-red-400/60 hover:text-red-400 text-xl leading-none"
                aria-label="Dismiss error"
              >
                ×
              </button>
            </div>
          )}

          <div className="rounded-2xl border border-gray-200 dark:border-[#181818] bg-white dark:bg-[#0e0e0e] p-4 sm:p-5">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg text-gray-400 dark:text-[#555555] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft size={15} />
              </button>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg text-gray-400 dark:text-[#555555] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                aria-label="Next month"
              >
                <ChevronRight size={15} />
              </button>
            </div>

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAY_HEADERS.map((d) => (
                <div
                  key={d}
                  className="text-center text-[10px] font-semibold text-gray-400 dark:text-[#444444] uppercase tracking-wider py-1"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="flex flex-col gap-0.5">
              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7">
                  {week.map((day, di) => {
                    if (day === null) return <div key={di} />
                    const dateStr    = toDateStr(viewYear, viewMonth, day)
                    const disabled   = isDateDisabled(viewYear, viewMonth, day)
                    const isSelected = selectedDate === dateStr
                    const isToday    = dateStr === todayStr
                    return (
                      <button
                        key={di}
                        disabled={disabled || slotsLoading}
                        onClick={() => handleDateSelect(dateStr)}
                        className={cn(
                          'mx-auto w-8 h-8 rounded-lg text-xs font-medium transition-all duration-150 flex items-center justify-center',
                          disabled
                            ? 'text-gray-200 dark:text-[#2a2a2a] cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#4a7fd4] text-white'
                            : isToday
                            ? 'text-[#4a7fd4] ring-1 ring-[#4a7fd4]/40 hover:bg-[#4a7fd4]/10'
                            : 'text-gray-700 dark:text-[#aaaaaa] hover:bg-gray-100 dark:hover:bg-white/5',
                          slotsLoading && isSelected && 'cursor-wait'
                        )}
                      >
                        {slotsLoading && isSelected ? (
                          <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          day
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-400 dark:text-[#444444] text-center">
            Select a date to see available time slots
          </p>
        </div>
      )}

      {/* ── Step 2: Time slots ────────────────────────────────────────────── */}
      {step === 2 && (
        <div>
          {selectedDate && (
            <p className="text-sm font-medium text-gray-500 dark:text-[#666666] mb-4">
              Available times for{' '}
              <span className="text-gray-900 dark:text-white">{formatDateLabel(selectedDate)}</span>
            </p>
          )}

          {slots.length === 0 ? (
            <div className="py-10 text-center rounded-2xl border border-gray-200 dark:border-[#181818] bg-white dark:bg-[#0e0e0e]">
              <p className="text-gray-500 dark:text-[#666666] text-sm mb-4">
                No availability on this day. Please pick another date.
              </p>
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-sm text-[#4a7fd4] hover:underline underline-offset-2"
              >
                <ChevronLeft size={14} /> Back to calendar
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => { setSelectedSlot(slot); setStep(3) }}
                    className={cn(
                      'px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 border',
                      selectedSlot === slot
                        ? 'bg-[#4a7fd4] border-[#4a7fd4] text-white'
                        : 'bg-white dark:bg-[#0e0e0e] border-gray-200 dark:border-[#1d1d1d] text-gray-700 dark:text-[#aaaaaa] hover:border-[#4a7fd4]/50 hover:text-gray-900 dark:hover:text-white'
                    )}
                  >
                    {formatSlotLocal(slot)}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-400 dark:text-[#444444] leading-relaxed mb-4">
                Lazar is available 2:00 PM – 12:00 AM Macedonia Time (CET · UTC+1 / CEST · UTC+2 in summer).
                Times above are shown in your local timezone.
              </p>

              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-[#555555] hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ChevronLeft size={14} /> Back
              </button>
            </>
          )}
        </div>
      )}

      {/* ── Step 3: Details ───────────────────────────────────────────────── */}
      {step === 3 && selectedSlot && (
        <div>
          {/* Booking summary card */}
          <div className="mb-5 p-3.5 rounded-xl border border-[#1a3a6e] bg-[#0d1a2e]/20 dark:bg-[#0d1a2e]/50">
            <p className="text-[10px] font-semibold text-[#4a7fd4] uppercase tracking-wider mb-1">
              Your booking
            </p>
            <p className="text-gray-900 dark:text-white text-sm font-medium">
              15-min call on {selectedDate ? formatDateLabel(selectedDate) : ''} at{' '}
              {formatSlotLocal(selectedSlot)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className={LABEL_CLASS}>
                Full Name <span className="text-gray-300 dark:text-[#333333]">*</span>
              </label>
              <input
                type="text"
                placeholder="John Smith"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
                className={INPUT_CLASS}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={LABEL_CLASS}>
                Email <span className="text-gray-300 dark:text-[#333333]">*</span>
              </label>
              <input
                type="email"
                placeholder="john@company.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
                className={INPUT_CLASS}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={LABEL_CLASS}>Company Name</label>
              <input
                type="text"
                placeholder="Acme Corp"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                className={INPUT_CLASS}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={LABEL_CLASS}>What do you want to talk about?</label>
              <textarea
                placeholder="Tell us about your business..."
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                rows={3}
                className={cn(INPUT_CLASS, 'resize-none')}
              />
            </div>

            {submitError && (
              <p className="text-red-500 dark:text-red-400/90 text-xs leading-relaxed">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#4a7fd4] hover:bg-[#3b6fd4] text-white font-medium transition-all duration-200 hover:shadow-[0_0_28px_rgba(74,127,212,0.35)] disabled:opacity-50 disabled:cursor-not-allowed text-sm w-full"
            >
              {submitting ? (
                <span className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" />
              ) : (
                'Confirm Booking'
              )}
            </button>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-[#555555] hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ChevronLeft size={14} /> Back
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
