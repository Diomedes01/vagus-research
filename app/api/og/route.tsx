import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') || 'Vagus Research'
  const topic = searchParams.get('topic') || ''

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
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
                color: 'rgba(255,255,255,0.5)',
                padding: '4px 12px',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '9999px',
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
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.4)',
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
