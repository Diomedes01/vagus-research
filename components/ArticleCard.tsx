'use client'

import Link from 'next/link'
import TopicTag from './TopicTag'

interface ArticleCardProps {
  title: string
  slug: string
  topic: string
  excerpt: string
  date: string
  readTime: string
}

/* ── Gradient colours per topic: [from, to] ── */
const topicColors: Record<string, [string, string]> = {
  Foundation: ['#0A1628', '#1a3a5c'],
  Safety: ['#065f46', '#0d9488'],
  Anxiety: ['#4c1d95', '#7c3aed'],
  Depression: ['#312e81', '#4f46e5'],
  Sleep: ['#0c4a6e', '#0284c7'],
  Inflammation: ['#9a3412', '#ea580c'],
  Recovery: ['#064e3b', '#059669'],
  Neuroplasticity: ['#831843', '#db2777'],
  'Gut Health': ['#78350f', '#d97706'],
  Pain: ['#7f1d1d', '#dc2626'],
  Epilepsy: ['#4c1d95', '#8b5cf6'],
  'Heart Health': ['#881337', '#e11d48'],
  Tinnitus: ['#134e4a', '#14b8a6'],
  PTSD: ['#1e1b4b', '#6366f1'],
}
const defaultColors: [string, string] = ['#0A1628', '#2D7DD2']

/* ── SVG icons per topic (20×20 viewBox) ── */
function TopicIcon({ topic }: { topic: string }) {
  const cls = 'w-5 h-5'
  switch (topic) {
    case 'Foundation':
      // Brain
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 17V10" />
          <path d="M10 10C10 7 8 5 6 5C4 5 2.5 6.5 2.5 8.5C2.5 9.5 3 10.5 3.5 11C2.5 11.5 2 12.5 2 13.5C2 15.5 3.5 17 5.5 17H10" />
          <path d="M10 10C10 7 12 5 14 5C16 5 17.5 6.5 17.5 8.5C17.5 9.5 17 10.5 16.5 11C17.5 11.5 18 12.5 18 13.5C18 15.5 16.5 17 14.5 17H10" />
          <path d="M6 8.5H4" />
          <path d="M14 8.5H16" />
        </svg>
      )
    case 'Safety':
      // Shield
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2L3 5.5V10C3 14 6 17 10 18.5C14 17 17 14 17 10V5.5L10 2Z" />
          <path d="M7 10L9 12L13 8" />
        </svg>
      )
    case 'Anxiety':
      // Waveform (stress signal)
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 10H5L7 4L10 16L13 7L15 10H18" />
        </svg>
      )
    case 'Depression':
      // Cloud lifting
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13C3.3 13 2 11.7 2 10C2 8.3 3.3 7 5 7C5.2 5.3 6.7 4 8.5 4C9.8 4 10.9 4.7 11.5 5.7C12 5.3 12.7 5 13.5 5C15.4 5 17 6.6 17 8.5C17 8.7 17 8.8 16.9 9C17.6 9.5 18 10.2 18 11C18 12.1 17.1 13 16 13H5Z" />
          <path d="M7 16V14" />
          <path d="M10 17V14" />
          <path d="M13 16V14" />
        </svg>
      )
    case 'Sleep':
      // Moon
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16.5 10.5C16.5 14.4 13.4 17.5 9.5 17.5C5.6 17.5 2.5 14.4 2.5 10.5C2.5 6.6 5.6 3.5 9.5 3.5C9.5 3.5 8 6 8 8.5C8 11 10 13 12.5 13C15 13 16.5 10.5 16.5 10.5Z" />
          <circle cx="15" cy="5" r="0.5" fill="currentColor" />
          <circle cx="17" cy="7" r="0.5" fill="currentColor" />
        </svg>
      )
    case 'Inflammation':
      // Flame
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2C10 2 5 7 5 12C5 15 7.2 17.5 10 17.5C12.8 17.5 15 15 15 12C15 7 10 2 10 2Z" />
          <path d="M10 17.5C8.5 17.5 7.5 16 7.5 14.5C7.5 12 10 10 10 10C10 10 12.5 12 12.5 14.5C12.5 16 11.5 17.5 10 17.5Z" />
        </svg>
      )
    case 'Recovery':
      // Leaf / growth
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17C3 17 4 8 13 3C13 3 14 12 5 17" />
          <path d="M3 17C7 13 10 10 13 3" />
        </svg>
      )
    case 'Neuroplasticity':
      // Lightning bolt
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 2L4 11H10L9 18L16 9H10L11 2Z" />
        </svg>
      )
    case 'Pain':
      // Target / pinpoint
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="10" r="7" />
          <circle cx="10" cy="10" r="4" />
          <circle cx="10" cy="10" r="1" fill="currentColor" />
        </svg>
      )
    case 'Gut Health':
      // Stomach / digestive
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3H11C13.2 3 15 4.8 15 7V8C15 9.7 13.7 11 12 11H10C8.3 11 7 12.3 7 14C7 15.7 8.3 17 10 17H13" />
          <path d="M7 3V7" />
        </svg>
      )
    case 'Heart Health':
      // Heart
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 17L3.5 10.5C1.5 8.5 1.5 5.5 3.5 3.5C5.5 1.5 8.5 1.5 10 4C11.5 1.5 14.5 1.5 16.5 3.5C18.5 5.5 18.5 8.5 16.5 10.5L10 17Z" />
        </svg>
      )
    case 'Epilepsy':
      // Zap / neural spike
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 10H5L7 6L9 14L11 4L13 12L15 10H18" />
        </svg>
      )
    case 'Tinnitus':
      // Ear / sound wave
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 12C4.3 12 3 10.2 3 8C3 5.8 4.3 4 6 4C6 4 7 4 8 5C9 6 9 7 9 8" />
          <path d="M9 8C9 9 8.5 10 8 11C7 13 7.5 15 9.5 16" />
          <path d="M13 6C14 7 14.5 8.5 14.5 10" />
          <path d="M15.5 4C17 5.5 18 8 18 10.5" />
        </svg>
      )
    case 'PTSD':
      // Mind / awareness
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="8" r="6" />
          <path d="M7 14.5C7 14.5 8 16.5 10 16.5C12 16.5 13 14.5 13 14.5" />
          <circle cx="10" cy="8" r="2" />
          <path d="M10 6V4" />
          <path d="M12 8H14" />
          <path d="M8 8H6" />
          <path d="M10 10V12" />
        </svg>
      )
    default:
      // Atom / generic science
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="10" r="2" />
          <ellipse cx="10" cy="10" rx="8" ry="3" />
          <ellipse cx="10" cy="10" rx="8" ry="3" transform="rotate(60 10 10)" />
          <ellipse cx="10" cy="10" rx="8" ry="3" transform="rotate(120 10 10)" />
        </svg>
      )
  }
}

export default function ArticleCard({
  title,
  slug,
  topic,
  excerpt,
  date,
  readTime,
}: ArticleCardProps) {
  const [from, to] = topicColors[topic] || defaultColors

  return (
    <Link href={`/library/${slug}`} className="group block">
      <article
        className="bg-white border border-border rounded-xl overflow-hidden h-full transition-all duration-200 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5"
        style={{ borderLeft: `4px solid ${from}` }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${from}08`)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
      >
        {/* Gradient header band */}
        <div
          className="relative h-2.5"
          style={{ background: `linear-gradient(to right, ${from}, ${to})` }}
        >
          {/* Topic icon */}
          <div
            className="absolute -bottom-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-sm"
            style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
          >
            <TopicIcon topic={topic} />
          </div>
        </div>

        <div className="p-6 pt-5">
          <div className="flex items-center gap-3 mb-4">
            <TopicTag topic={topic} />
            <span className="text-xs text-text-light font-mono">{readTime}</span>
          </div>
          <h3 className="font-display text-xl font-medium text-text-primary mb-3 group-hover:text-accent-blue transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-sm text-text-muted leading-relaxed line-clamp-2 mb-4">
            {excerpt}
          </p>
          <time className="text-xs text-text-light font-mono">
            {new Date(date).toLocaleDateString('en-AU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </article>
    </Link>
  )
}
