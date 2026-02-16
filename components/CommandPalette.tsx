'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'

interface SearchItem {
  title: string
  type: 'article' | 'study' | 'video' | 'page'
  href: string
  meta?: string
}

interface CommandPaletteProps {
  items: SearchItem[]
}

export default function CommandPalette({ items }: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: 'title', weight: 0.7 },
          { name: 'meta', weight: 0.3 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [items]
  )

  const results = useMemo(() => {
    if (!query.trim()) return items.slice(0, 8)
    return fuse.search(query).slice(0, 8).map((r) => r.item)
  }, [query, fuse, items])

  useEffect(() => setSelectedIndex(0), [results])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
  }, [])

  const navigate = useCallback(
    (href: string) => {
      close()
      router.push(href)
    },
    [close, router]
  )

  // Keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [close])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Arrow keys & enter
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      navigate(results[selectedIndex].href)
    }
  }

  const typeIcons: Record<string, React.ReactNode> = {
    article: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    study: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    video: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
    ),
    page: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    ),
  }

  const typeLabels: Record<string, string> = {
    article: 'Article',
    study: 'Study',
    video: 'Video',
    page: 'Page',
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100]" onClick={close}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative flex justify-center pt-[15vh] px-4">
        <div
          className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-border overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 border-b border-border">
            <svg className="w-4 h-4 text-text-light shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Search articles, studies, videos..."
              className="flex-1 py-3.5 text-sm text-text-body placeholder:text-text-light bg-transparent focus:outline-none"
            />
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-text-light border border-border-light rounded">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto py-2">
            {results.length === 0 && query.trim() && (
              <div className="px-4 py-8 text-center text-sm text-text-muted">
                No results for &ldquo;{query}&rdquo;
              </div>
            )}
            {results.map((item, i) => (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                  i === selectedIndex ? 'bg-bg-primary' : ''
                }`}
              >
                <span className="text-text-light shrink-0">{typeIcons[item.type]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary truncate">{item.title}</p>
                  {item.meta && (
                    <p className="text-xs text-text-muted truncate">{item.meta}</p>
                  )}
                </div>
                <span className="text-[10px] font-mono text-text-light shrink-0">
                  {typeLabels[item.type]}
                </span>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-border-light flex items-center gap-4 text-[10px] font-mono text-text-light">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 border border-border-light rounded">↑↓</kbd> navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 border border-border-light rounded">↵</kbd> open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 border border-border-light rounded">esc</kbd> close
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
