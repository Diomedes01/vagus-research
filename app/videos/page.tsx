import { Metadata } from 'next'
import VideoCard from '@/components/VideoCard'
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
    title: 'What Is the Vagus Nerve? An Animated Explainer',
    topic: 'Foundation',
    duration: '6:30',
    description:
      'A clear, animated overview of vagus nerve anatomy, function, and its role in the autonomic nervous system.',
  },
  {
    title: 'How Vagus Nerve Stimulation Works: Mechanism of Action',
    topic: 'Foundation',
    duration: '8:45',
    description:
      'Understanding how electrical stimulation of the vagus nerve modulates neural circuits and inflammatory pathways.',
  },
  {
    title: 'taVNS vs iVNS: Comparing Stimulation Methods',
    topic: 'Foundation',
    duration: '5:15',
    description:
      'A side-by-side comparison of transcutaneous auricular and implanted vagus nerve stimulation approaches.',
  },
  {
    title: 'VNS for Epilepsy: 30 Years of Evidence',
    topic: 'Epilepsy',
    duration: '10:20',
    description:
      'Reviewing three decades of clinical data on vagus nerve stimulation as an adjunctive treatment for drug-resistant epilepsy.',
  },
  {
    title: 'The Vagus Nerve and Inflammation: Research Summary',
    topic: 'Inflammation',
    duration: '7:00',
    description:
      'How the cholinergic anti-inflammatory pathway connects vagal tone to systemic inflammation.',
  },
  {
    title: 'Heart Rate Variability and Vagal Tone Explained',
    topic: 'Heart Health',
    duration: '6:10',
    description:
      'Understanding HRV as a biomarker for vagal function and its clinical significance.',
  },
  {
    title: 'VNS in Mental Health: Depression and Anxiety Research',
    topic: 'Anxiety',
    duration: '9:30',
    description:
      'Reviewing the clinical evidence for vagus nerve stimulation in treatment-resistant depression and anxiety disorders.',
  },
  {
    title: 'The Gut-Brain Axis and the Vagus Nerve',
    topic: 'Gut Health',
    duration: '7:45',
    description:
      'Exploring how the vagus nerve mediates communication between the gut microbiome and the central nervous system.',
  },
]

export default function VideosPage() {
  return (
    <div className="max-w-layout mx-auto px-6 py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-12">
        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-light mb-2">
          Watch & Learn
        </p>
        <h1 className="font-display text-4xl md:text-[44px] text-text-primary mb-4">
          Videos
        </h1>
        <p className="text-text-muted max-w-2xl">
          Educational video content covering vagus nerve stimulation science, mechanisms of
          action, research summaries, and clinical applications.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {['All', 'Foundation', 'Epilepsy', 'Inflammation', 'Heart Health', 'Anxiety', 'Gut Health'].map(
          (cat) => (
            <span
              key={cat}
              className="px-3.5 py-1.5 bg-white border border-border rounded-full text-sm font-medium text-text-muted"
            >
              {cat}
            </span>
          )
        )}
      </div>

      {/* Coming soon notice */}
      <div className="bg-accent-teal-light border border-accent-teal/20 rounded-xl p-6 mb-10">
        <p className="text-sm text-text-body">
          <strong className="text-text-primary">Coming soon:</strong> We are producing original
          video content covering vagus nerve stimulation research. Below are planned topics —
          subscribe to be notified when new videos are published.
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video.title}
            title={video.title}
            topic={video.topic}
            duration={video.duration}
            description={video.description}
          />
        ))}
      </div>
    </div>
  )
}
