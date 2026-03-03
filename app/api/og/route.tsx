import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') || 'Vagus Research'
  const topic = searchParams.get('topic') || ''
  const image = searchParams.get('image') || ''

  // Build absolute URL for the hero image
  const baseUrl = new URL(request.url).origin
  const imageUrl = image ? `${baseUrl}${image}` : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A1628',
          padding: '60px 80px',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background hero image */}
        {imageUrl && (
          <img
            src={imageUrl}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}

        {/* Dark overlay for text readability */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: imageUrl
              ? 'linear-gradient(to bottom, rgba(10,22,40,0.75) 0%, rgba(10,22,40,0.55) 40%, rgba(10,22,40,0.85) 100%)'
              : 'transparent',
          }}
        />

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
          <div
            style={{
              fontSize: '14px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: '#00B8A9',
              fontFamily: 'monospace',
            }}
          >
            VAGUS RESEARCH
          </div>
          {topic && (
            <div
              style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.7)',
                padding: '4px 12px',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '9999px',
                backgroundColor: 'rgba(0,184,169,0.15)',
              }}
            >
              {topic}
            </div>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? '42px' : '52px',
            fontWeight: 400,
            color: '#FFFFFF',
            lineHeight: 1.2,
            maxWidth: '900px',
            position: 'relative',
            textShadow: imageUrl ? '0 2px 20px rgba(0,0,0,0.5)' : 'none',
          }}
        >
          {title}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            vagusresearch.com.au
          </div>
          <div
            style={{
              fontSize: '13px',
              color: '#00B8A9',
            }}
          >
            The Science of Vagus Nerve Stimulation
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
