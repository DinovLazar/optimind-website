'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home } from 'lucide-react'

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/demo',     label: 'Demo' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname                     = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/85 backdrop-blur-2xl border-b border-[#181818]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[64px]">

          {/* Home button */}
          <Link href="/" aria-label="Home" className="flex items-center justify-center w-9 h-9 rounded-md text-white hover:bg-white/[0.08] transition-colors shrink-0">
            <Home size={22} strokeWidth={2} />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm rounded-md transition-all duration-150 ${
                    active
                      ? 'text-white bg-white/[0.06]'
                      : 'text-[#888888] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-[#1a3a6e] hover:bg-[#2a5298] text-white transition-all duration-200 border border-[#2a5298]/40 hover:border-[#4a7fd4]/50 hover:shadow-[0_0_24px_rgba(74,127,212,0.22)]"
            >
              Book a Demo
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 -mr-1 text-[#888888] hover:text-white transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-[#181818] overflow-hidden"
          >
            <div className="px-4 pt-2 pb-5 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 text-sm rounded-lg transition-colors ${
                      active
                        ? 'text-white bg-white/[0.06]'
                        : 'text-[#888888] hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                href="/contact"
                className="mt-2 px-4 py-3 text-sm font-medium rounded-lg bg-[#1a3a6e] hover:bg-[#2a5298] text-white text-center transition-colors"
              >
                Book a Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
