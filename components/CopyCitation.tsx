'use client'

import { useState } from 'react'

interface CopyCitationProps {
  authors: string
  title: string
  journal: string
  year: number
  doi?: string
  pubmedUrl: string
}

function formatCitation({ authors, title, journal, year, doi }: CopyCitationProps) {
  // Vancouver style
  const doiStr = doi ? ` doi:${doi.replace('https://doi.org/', '')}` : ''
  return `${authors} ${title}. ${journal}. ${year}.${doiStr}`
}

export default function CopyCitation(props: CopyCitationProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatCitation(props))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for non-secure context
    }
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        handleCopy()
      }}
      className={`inline-flex items-center gap-1 text-[11px] font-mono font-medium transition-colors ${
        copied
          ? 'text-accent-teal'
          : 'text-text-muted hover:text-accent-blue'
      }`}
      title="Copy citation"
    >
      {copied ? (
        <>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Cite
        </>
      )}
    </button>
  )
}
