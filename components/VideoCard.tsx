import Image from 'next/image'
import TopicTag from './TopicTag'

interface VideoCardProps {
  title: string
  topic: string
  duration: string
  thumbnail?: string
  description?: string
}

export default function VideoCard({
  title,
  topic,
  duration,
  thumbnail,
  description,
}: VideoCardProps) {
  return (
    <div className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-bg-dark flex items-center justify-center">
        {thumbnail ? (
          <Image src={thumbnail} alt={title} fill className="object-cover" />
        ) : (
          <div className="text-white/20">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-mono px-2 py-1 rounded">
          {duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <TopicTag topic={topic} />
        </div>
        <h3 className="font-body text-base font-semibold text-text-primary mb-2 group-hover:text-accent-blue transition-colors leading-snug">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
