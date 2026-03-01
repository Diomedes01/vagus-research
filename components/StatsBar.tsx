import FadeIn from './FadeIn'
import evidenceData from '@/content/evidence.json'

function getStats() {
  const studies = evidenceData as { subjects: number | null; condition: string; year: number }[]
  const totalStudies = studies.length
  const totalSubjects = studies.reduce((sum, s) => sum + (s.subjects || 0), 0)
  const conditions = new Set(studies.map((s) => s.condition))
  const years = studies.map((s) => s.year)
  const yearSpan = Math.max(...years) - Math.min(...years)

  return [
    { value: totalStudies.toLocaleString(), label: 'Studies Analysed' },
    { value: `${totalSubjects.toLocaleString()}+`, label: 'Subjects' },
    { value: `${conditions.size}+`, label: 'Clinical Populations' },
    { value: `${yearSpan}+`, label: 'Years of Research' },
  ]
}

export default function StatsBar() {
  const stats = getStats()

  return (
    <section className="bg-bg-dark">
      <div className="max-w-layout mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 80}>
              <div className="text-center">
                <div className="font-mono text-3xl md:text-4xl font-medium text-accent-teal mb-2">
                  {stat.value}
                </div>
                <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/70">
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
