'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: '/library', label: 'Library' },
    { href: '/evidence', label: 'Evidence' },
    { href: '/videos', label: 'Videos' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-layout mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono text-[13px] font-medium tracking-[0.15em] uppercase text-text-primary">
            Vagus Research
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-text-light border border-border rounded-lg hover:border-text-muted transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <kbd className="font-mono text-[10px]">⌘K</kbd>
          </button>
          <Link
            href="/#newsletter"
            className="text-sm font-medium px-4 py-2 bg-accent-teal text-white rounded-lg hover:bg-accent-teal/90 transition-colors"
          >
            Subscribe
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-text-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-6 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#newsletter"
            className="block text-sm font-medium text-accent-teal"
            onClick={() => setMobileOpen(false)}
          >
            Subscribe
          </Link>
        </div>
      )}
    </nav>
  )
}
