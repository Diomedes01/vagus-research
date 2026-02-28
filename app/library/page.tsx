import { generateMetadata as genMeta, generateCollectionPageJsonLd } from '@/lib/seo'
import LibraryContent from './LibraryContent'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'Research Library',
  description:
    'Explore evidence-based articles on vagus nerve stimulation — covering mechanisms, clinical applications, safety, and the latest research findings.',
  path: '/library',
})

export default function LibraryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateCollectionPageJsonLd({
              name: 'Vagus Research Library',
              description:
                'A curated collection of evidence-based articles on vagus nerve stimulation science.',
              url: 'https://vagusresearch.com/library',
            })
          ),
        }}
      />
      <LibraryContent />
    </>
  )
}
