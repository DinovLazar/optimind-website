import Link from 'next/link'

const nav = [
  { href: '/',         label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/demo',     label: 'Demo' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
]

const legal = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms',   label: 'Terms & Conditions' },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-[#161616] bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <span className="font-heading font-bold text-[17px] text-gray-900 dark:text-white tracking-tight">
                OptiMind
              </span>
            </Link>
            <p className="text-sm text-gray-400 dark:text-[#555555] leading-relaxed max-w-[200px]">
              Intelligent support.<br />Built for you.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold text-gray-400 dark:text-[#3a3a3a] uppercase tracking-widest">
              Navigation
            </p>
            <nav className="flex flex-col gap-2.5">
              {nav.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-gray-400 dark:text-[#555555] hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold text-gray-400 dark:text-[#3a3a3a] uppercase tracking-widest">
              Legal
            </p>
            <nav className="flex flex-col gap-2.5">
              {legal.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-gray-400 dark:text-[#555555] hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold text-gray-400 dark:text-[#3a3a3a] uppercase tracking-widest">
              Contact
            </p>
            <div className="flex flex-col gap-2.5">
              <div>
                <p className="text-[11px] text-gray-400 dark:text-[#3a3a3a] mb-0.5">General</p>
                <a
                  href="mailto:hello@optimind000.com"
                  className="text-sm text-gray-400 dark:text-[#555555] hover:text-gray-900 dark:hover:text-white transition-colors break-all"
                >
                  hello@optimind000.com
                </a>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 dark:text-[#3a3a3a] mb-0.5">Support</p>
                <a
                  href="mailto:support@optimind000.com"
                  className="text-sm text-gray-400 dark:text-[#555555] hover:text-gray-900 dark:hover:text-white transition-colors break-all"
                >
                  support@optimind000.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-[#141414] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-gray-400 dark:text-[#3a3a3a]">
            © 2025 OptiMind. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-[#3a3a3a]">
            Strumica, North Macedonia
          </p>
        </div>
      </div>
    </footer>
  )
}
