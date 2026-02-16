import { Metadata } from 'next'
import VideoCard from '@/components/VideoCard'
import FadeIn from '@/components/FadeIn'
import { generateMetadata as genMeta, generateVideoPageJsonLd } from '@/lib/seo'

const jsonLd = generateVideoPageJsonLd({
  name: 'Vagus Nerve Stimulation Videos',
  description:
    'Educational video content covering vagus nerve stimulation science, mechanisms of action, research summaries, and clinical applications.',
  url: 'https://vagusresearch.com.au/videos',
})

export const metadata: Metadata = genMeta({
  title: 'Videos',
  description:
    'Educational videos on vagus nerve stimulation — explainers, mechanism of action, research summaries, and more.',
  path: '/videos',
})

const videos = [
  {
    title: 'How Vagus Nerve Stimulation Works',
    topic: 'Foundation',
    duration: '8:45',
    description:
      'A clear explanation of how electrical stimulation of the vagus nerve modulates neural circuits, autonomic balance, and inflammatory pathways.',
  },
  {
    title: 'The Cholinergic Anti-Inflammatory Pathway',
    topic: 'Inflammation',
    duration: '7:20',
    description:
      'How the vagus nerve regulates systemic inflammation through acetylcholine signalling and the spleen — the basis of bioelectronic medicine.',
  },
  {
    title: 'taVNS vs Implanted VNS',
    topic: 'Foundation',
    duration: '6:10',
    description:
      'Comparing transcutaneous auricular stimulation with surgically implanted devices — mechanisms, evidence, safety profiles, and clinical applications.',
  },
  {
    title: 'Vagus Nerve and Sleep',
    topic: 'Sleep',
    duration: '9:15',
    description:
      'Exploring the relationship between vagal tone, parasympathetic activity, and sleep architecture — what the research shows about VNS and sleep quality.',
  },
  {
    title: 'Understanding the Auricular Branch',
    topic: 'Foundation',
    duration: '5:30',
    description:
      'The anatomy of the auricular branch of the vagus nerve (ABVN) — why the ear is a gateway to non-invasive vagus nerve stimulation.',
  },
  {
    title: 'VNS for Anxiety and Stress',
    topic: 'Anxiety',
    duration: '10:00',
    description:
      'Reviewing the clinical evidence for vagus nerve stimulation in anxiety disorders — from autonomic regulation to amygdala modulation.',
  },
  {
    title: 'The Safety Profile of taVNS',
    topic: 'Safety',
    duration: '6:45',
    description:
      'What 177 studies and 6,322 subjects tell us about the safety and tolerability of transcutaneous auricular vagus nerve stimulation.',
  },
  {
    title: 'Future of Neuromodulation',
    topic: 'Foundation',
    duration: '11:30',
    description:
      'Where the field is heading — personalised stimulation protocols, closed-loop systems, biomarker-guided dosing, and combination therapies.',
  },
]

export default function VideosPage() {
  return (
    <div className="max-w-layout mx-auto px-6 py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <FadeIn>
        <div className="mb-12">
          <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-accent-teal mb-2">
            Watch & Learn
          </p>
          <h1 className="font-display text-4xl md:text-[44px] mb-4" style={{ color: '#0A1628' }}>
            Videos
          </h1>
          <p className="max-w-2xl" style={{ color: '#374151' }}>
            Educational video content covering vagus nerve stimulation science, mechanisms of
            action, research summaries, and clinical applications.
          </p>
        </div>
      </FadeIn>

      {/* Coming soon notice */}
      <FadeIn>
        <div className="bg-accent-teal-light border border-accent-teal/20 rounded-xl p-5 mb-10 flex items-start gap-3">
          <svg className="w-5 h-5 text-accent-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: '#0A1628' }}>Video content coming soon</p>
            <p className="text-sm" style={{ color: '#374151' }}>
              We are producing original research explainers and educational videos.
              Subscribe to be notified when new videos are published.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Video Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, i) => (
          <FadeIn key={video.title} delay={i * 60}>
            <VideoCard
              title={video.title}
              topic={video.topic}
              duration={video.duration}
              description={video.description}
              episodeNumber={i + 1}
            />
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
