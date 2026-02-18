'use client'

import { useState } from 'react'
import Image from 'next/image'
import TopicTag from './TopicTag'

interface VideoCardProps {
  title: string
  topic: string
  duration: string
  thumbnail?: string
  description?: string
  episodeNumber?: number
  youtubeId?: string
}

export default function VideoCard({
  title,
  topic,
  duration,
  thumbnail,
  description,
  episodeNumber,
  youtubeId,
}: VideoCardProps) {
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    if (youtubeId) {
      setPlaying(true)
    }
  }

  return (
    <div className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-200">
      {/* Thumbnail / Player */}
      <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: '#0A1628' }}>
        {playing && youtubeId ? (
          /* YouTube embed */
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <>
            {thumbnail ? (
              <Image src={thumbnail} alt={title} fill className="object-cover" />
            ) : youtubeId ? (
              /* YouTube thumbnail */
              <Image
                src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                alt={title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              /* Solid dark placeholder */
              <div className="absolute inset-0" style={{ backgroundColor: '#0F1D32' }}>
                {episodeNumber && (
                  <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.1em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    EP {String(episodeNumber).padStart(2, '0')}
                  </div>
                )}
              </div>
            )}

            {/* Play button overlay */}
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center"
              aria-label={youtubeId ? `Play ${title}` : title}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-200"
                style={{
                  backgroundColor: youtubeId ? 'rgba(255,0,0,0.85)' : 'rgba(255,255,255,0.15)',
                  border: youtubeId ? 'none' : '2px solid rgba(255,255,255,0.3)',
                }}
              >
                <svg
                  className="w-6 h-6 ml-0.5"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>

            {/* Duration badge */}
            <div
              className="absolute bottom-3 right-3 text-[11px] font-mono px-2 py-0.5 rounded"
              style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'white' }}
            >
              {duration}
            </div>

            {/* Episode number (when no YouTube and no thumbnail) */}
            {!thumbnail && !youtubeId && episodeNumber && (
              <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.1em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                EP {String(episodeNumber).padStart(2, '0')}
              </div>
            )}
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <TopicTag topic={topic} />
        </div>
        <h3 className="text-[15px] font-semibold mb-2 group-hover:text-accent-blue transition-colors leading-snug" style={{ color: '#0A1628' }}>
          {title}
        </h3>
        {description && (
          <p className="text-[13px] leading-relaxed line-clamp-2" style={{ color: '#374151' }}>
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
