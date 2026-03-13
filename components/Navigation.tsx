'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

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
          ? 'bg-white/85 dark:bg-[#0a0a0a]/85 backdrop-blur-2xl border-b border-gray-200 dark:border-[#181818]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-[64px]">

          {/* Home button */}
          <Link href="/" aria-label="Home" className="flex items-center justify-center w-9 h-9 rounded-md text-gray-900 dark:text-white hover:bg-gray-900/[0.08] dark:hover:bg-white/[0.08] transition-colors shrink-0">
            <Home size={22} strokeWidth={2} />
          </Link>

          {/* Desktop links — absolutely centered */}
          <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm rounded-md transition-all duration-150 ${
                    active
                      ? 'text-gray-900 dark:text-white bg-gray-900/[0.06] dark:bg-white/[0.06]'
                      : 'text-gray-500 dark:text-[#888888] hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/[0.04] dark:hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* ThemeToggle + mobile toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 -mr-1 text-gray-500 dark:text-[#888888] hover:text-gray-900 dark:hover:text-white transition-colors"
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
            className="md:hidden bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-gray-200 dark:border-[#181818] overflow-hidden"
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
                        ? 'text-gray-900 dark:text-white bg-gray-900/[0.06] dark:bg-white/[0.06]'
                        : 'text-gray-500 dark:text-[#888888] hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
