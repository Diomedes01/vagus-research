import { Metadata } from 'next'
import EvidenceTable from '@/components/EvidenceTable'
import { generateMetadata as genMeta, generateDatasetJsonLd } from '@/lib/seo'
import evidenceData from '@/content/evidence.json'
import { Study } from '@/lib/evidence'

export const metadata: Metadata = genMeta({
  title: 'Evidence Database',
  description:
    'A curated collection of peer-reviewed research on vagus nerve stimulation. Search and filter studies by condition, study type, and more.',
  path: '/evidence',
})

export default function EvidencePage() {
  const studies = evidenceData as Study[]

  const jsonLd = generateDatasetJsonLd({
    name: 'Vagus Nerve Stimulation Evidence Database',
    description:
      'A curated collection of peer-reviewed research on vagus nerve stimulation, including RCTs, meta-analyses, and systematic reviews.',
    url: 'https://vagusresearch.com.au/evidence',
    size: studies.length,
  })

  return (
    <div className="max-w-layout mx-auto px-6 py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-12">
        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-light mb-2">
          Peer-Reviewed Research
        </p>
        <h1 className="font-display text-4xl md:text-[44px] text-text-primary mb-4">
          Evidence Database
        </h1>
        <p className="text-text-muted max-w-2xl">
          A curated collection of peer-reviewed research on vagus nerve stimulation.
          Search by condition, study type, or keyword to explore the evidence.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { value: studies.length.toString(), label: 'Studies' },
          {
            value: new Set(studies.map((s) => s.condition)).size.toString(),
            label: 'Conditions',
          },
          {
            value: new Set(studies.map((s) => s.journal)).size.toString(),
            label: 'Journals',
          },
          {
            value: `${Math.min(...studies.map((s) => s.year))}\u2013${Math.max(
              ...studies.map((s) => s.year)
            )}`,
            label: 'Year Range',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-border rounded-xl p-4 text-center"
          >
            <div className="font-mono text-2xl font-medium text-accent-teal">
              {stat.value}
            </div>
            <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-light mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <EvidenceTable studies={studies} />
    </div>
  )
}
