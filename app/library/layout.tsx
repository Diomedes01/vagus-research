import type { Metadata } from 'next'
import { generateMetadata as genMeta, generateCollectionPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Research Library',
  description:
    'Explore our collection of evidence-based articles on vagus nerve stimulation, covering mechanisms, clinical applications, and the latest research findings.',
  path: '/library',
})

const jsonLd = generateCollectionPageJsonLd({
  name: 'Vagus Research Library',
  description:
    'A curated collection of evidence-based articles on vagus nerve stimulation science.',
  url: 'https://vagusresearch.com.au/library',
})

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
