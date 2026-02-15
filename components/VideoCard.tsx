import Image from 'next/image'
import TopicTag from './TopicTag'

interface VideoCardProps {
  title: string
  topic: string
  duration: string
  thumbnail?: string
  description?: string
  episodeNumber?: number
}

export default function VideoCard({
  title,
  topic,
  duration,
  thumbnail,
  description,
  episodeNumber,
}: VideoCardProps) {
  return (
    <div className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-200">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-bg-dark overflow-hidden">
        {thumbnail ? (
          <Image src={thumbnail} alt={title} fill className="object-cover" />
        ) : (
          /* Styled placeholder thumbnail */
          <div className="absolute inset-0 bg-gradient-to-br from-bg-dark via-bg-dark-mid to-bg-dark">
            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            {/* Accent glow */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent-teal/10 rounded-full blur-2xl" />

            {/* Episode number */}
            {episodeNumber && (
              <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.1em] uppercase text-white/25">
                EP {String(episodeNumber).padStart(2, '0')}
              </div>
            )}
          </div>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-accent-teal group-hover:border-accent-teal group-hover:scale-110 transition-all duration-200">
            <svg
              className="w-5 h-5 text-white/80 group-hover:text-white ml-0.5 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[11px] font-mono px-2 py-0.5 rounded">
          {duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <TopicTag topic={topic} />
        </div>
        <h3 className="font-body text-[15px] font-semibold text-text-primary mb-2 group-hover:text-accent-blue transition-colors leading-snug">
          {title}
        </h3>
        {description && (
          <p className="text-[13px] text-text-muted leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
