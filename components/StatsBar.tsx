import FadeIn from './FadeIn'

const stats = [
  { value: '177', label: 'Studies Analysed' },
  { value: '6,322+', label: 'Subjects' },
  { value: '21+', label: 'Clinical Populations' },
  { value: '30+', label: 'Years of Research' },
]

export default function StatsBar() {
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
                <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/50">
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
