import { Metadata } from 'next'
import VideoCard from '@/components/VideoCard'
import FadeIn from '@/components/FadeIn'
import { generateMetadata as genMeta, generateVideoPageJsonLd } from '@/lib/seo'

const jsonLd = generateVideoPageJsonLd({
  name: 'Vagus Nerve Stimulation Videos',
  description:
    'Educational video content covering vagus nerve stimulation science, mechanisms of action, research summaries, and clinical applications.',
  url: 'https://vagusresearch.com/videos',
})

export const metadata: Metadata = genMeta({
  title: 'Videos',
  description:
    'Educational videos on vagus nerve stimulation — explainers, mechanism of action, research summaries, and more.',
  path: '/videos',
})

const videos = [
  {
    title: 'What Is Vagus Nerve Stimulation?',
    topic: 'Foundation',
    duration: '2:11',
    youtubeId: 'Dz4VvI46448',
    description:
      'Dr Kevin Tracey, pioneer of bioelectronic medicine and CEO of the Feinstein Institutes, explains how VNS works and its FDA-approved applications for epilepsy, depression, and stroke rehabilitation.',
  },
  {
    title: 'Vagus Nerve — Neuroanatomy and Functions',
    topic: 'Foundation',
    duration: '4:10',
    youtubeId: 'NSjHvaGnX5A',
    description:
      'A professionally animated overview of cranial nerve X anatomy, fibre composition, nuclei in the medulla, parasympathetic functions, and clinical implications of vagus nerve damage.',
  },
  {
    title: 'Vagus Nerve Stimulation Explained (VNS/tVNS)',
    topic: 'Foundation',
    duration: '4:26',
    youtubeId: 'PVw-kJkb5BY',
    description:
      'Neuroscience researcher Miles Wischnewski explains both invasive VNS and transcutaneous VNS, covering cervical vs auricular stimulation, parameters, and FDA-approved applications.',
  },
  {
    title: 'VNS and the Immune System — Kevin Tracey Interview',
    topic: 'Inflammation',
    duration: '64:00',
    youtubeId: 'CU31kjTMaKk',
    description:
      'Dr Eric Topol interviews Dr Kevin Tracey on the inflammatory reflex, vagus nerve control of the immune system, FDA approval of VNS for rheumatoid arthritis, and the future of bioelectronic medicine.',
  },
  {
    title: 'How VNS Helps Tackle Treatment-Resistant Depression',
    topic: 'Depression',
    duration: '23:55',
    youtubeId: '6muvBCBAsJ8',
    description:
      'Professor Hamish McAllister-Williams of Newcastle University presents on how VNS is being used for difficult-to-treat depression, covering clinical trial evidence and neurostimulatory treatments.',
  },
  {
    title: 'Vagus Nerve Stimulation (VNS) for Epilepsy',
    topic: 'Epilepsy',
    duration: '25:56',
    youtubeId: 'SMhT3yOrmNE',
    description:
      'Dr Omar Danoun, a board-certified epileptologist, provides a comprehensive educational overview of VNS for epilepsy — how the device works, implantation, expected outcomes, and side effects.',
  },
  {
    title: 'VNS for Stroke Rehabilitation',
    topic: 'Recovery',
    duration: '27:04',
    youtubeId: 'Stt6_j2hvcM',
    description:
      'Dr Timea Hodics presents at the Stroke 360 Symposium (2024) on VNS paired with rehabilitation to improve upper-limb motor recovery after ischaemic stroke, including the FDA approval story.',
  },
  {
    title: 'VNS for Enhancing Plasticity and Brain Health',
    topic: 'Neuroplasticity',
    duration: '66:15',
    youtubeId: 'qi0y0CKHZM4',
    description:
      'An academic research presentation from the Center for BrainHealth on how non-invasive auricular VNS shows promise for improving brain health, function, and neural plasticity.',
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
          <h1 className="font-display text-4xl md:text-[44px] text-text-primary mb-4">
            Videos
          </h1>
          <p className="max-w-2xl text-text-body">
            Curated educational videos from researchers, universities, and medical institutions
            covering vagus nerve stimulation science, mechanisms of action, and clinical applications.
          </p>
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
              youtubeId={video.youtubeId || undefined}
            />
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
