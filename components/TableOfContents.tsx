'use client'

import { useEffect, useState, useCallback } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState('')

  // Scan article headings and ensure they all have IDs
  useEffect(() => {
    const article = document.querySelector('article')
    if (!article) return

    const elements = article.querySelectorAll('h2, h3')
    const items: TocItem[] = []

    elements.forEach((el) => {
      const text = el.textContent?.trim() || ''
      if (!text) return

      // Generate a stable ID if the heading doesn't have one
      if (!el.id) {
        el.id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')
      }

      items.push({
        id: el.id,
        text,
        level: parseInt(el.tagName[1]),
      })
    })

    setHeadings(items)

    // Set first heading as active by default
    if (items.length > 0) {
      setActiveId(items[0].id)
    }
  }, [])

  // Track which heading is in view using scroll position
  const handleScroll = useCallback(() => {
    if (headings.length === 0) return

    const scrollY = window.scrollY + 100 // offset for sticky nav

    // Find the last heading that's above the current scroll position
    let currentId = headings[0].id
    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el && el.offsetTop <= scrollY) {
        currentId = heading.id
      }
    }

    setActiveId(currentId)
  }, [headings])

  useEffect(() => {
    if (headings.length === 0) return

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // run once on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings, handleScroll])

  if (headings.length === 0) return null

  return (
    <nav className="hidden xl:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h4 className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-light mb-4">
        On this page
      </h4>
      <ul className="space-y-1 border-l border-border-light">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById(heading.id)
                if (el) {
                  const y = el.offsetTop - 80
                  window.scrollTo({ top: y, behavior: 'smooth' })
                  setActiveId(heading.id)
                }
              }}
              className={`block py-1 text-[13px] leading-snug transition-all duration-150 border-l-2 -ml-px ${
                heading.level === 3 ? 'pl-6' : 'pl-4'
              } ${
                activeId === heading.id
                  ? 'border-accent-teal text-accent-teal font-medium'
                  : 'border-transparent text-text-muted hover:text-text-body hover:border-border'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
