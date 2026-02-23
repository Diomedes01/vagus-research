import satori from 'satori'
import sharp from 'sharp'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')
const fontsDir = join(__dirname, 'fonts')

// Load fonts
const newsreaderLight = readFileSync(join(fontsDir, 'Newsreader-Light.ttf'))
const newsreaderRegular = readFileSync(join(fontsDir, 'Newsreader-Regular.ttf'))
const newsreaderMedium = readFileSync(join(fontsDir, 'Newsreader-Medium.ttf'))
const interRegular = readFileSync(join(fontsDir, 'Inter-Regular.ttf'))
const interMedium = readFileSync(join(fontsDir, 'Inter-Medium.ttf'))
const interSemiBold = readFileSync(join(fontsDir, 'Inter-SemiBold.ttf'))
const jetbrainsMono = readFileSync(join(fontsDir, 'JetBrainsMono-Regular.ttf'))

const fonts = [
  { name: 'Newsreader', data: newsreaderLight, weight: 300, style: 'normal' },
  { name: 'Newsreader', data: newsreaderRegular, weight: 400, style: 'normal' },
  { name: 'Newsreader', data: newsreaderMedium, weight: 500, style: 'normal' },
  { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
  { name: 'Inter', data: interMedium, weight: 500, style: 'normal' },
  { name: 'Inter', data: interSemiBold, weight: 600, style: 'normal' },
  { name: 'JetBrains Mono', data: jetbrainsMono, weight: 400, style: 'normal' },
]

async function render(jsx, width, height, outputPath, format = 'jpeg') {
  const svg = await satori(jsx, { width, height, fonts })
  const pipeline = sharp(Buffer.from(svg))
  if (format === 'jpeg') {
    await pipeline.jpeg({ quality: 90 }).toFile(outputPath)
  } else {
    await pipeline.png().toFile(outputPath)
  }
}

// ─── 1. Logo PNG (400x60) ───────────────────────────────────
await render(
  {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        gap: '16px',
        padding: '4px 0',
      },
      children: [
        // Pulse icon
        {
          type: 'svg',
          props: {
            width: 44,
            height: 44,
            viewBox: '0 0 44 44',
            children: [
              {
                type: 'circle',
                props: { cx: 22, cy: 22, r: 19, stroke: '#00B8A9', strokeWidth: 1.2, fill: 'none', opacity: 0.2 },
              },
              {
                type: 'path',
                props: {
                  d: 'M4 22 L12 22 L15 12 L18 32 L21 8 L24 30 L27 22 L40 22',
                  stroke: '#00B8A9', strokeWidth: 2.2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round',
                },
              },
            ],
          },
        },
        // Text
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: '2px' },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', gap: '6px' },
                  children: [
                    {
                      type: 'span',
                      props: {
                        style: { fontFamily: 'Newsreader', fontSize: 22, fontWeight: 500, color: '#0A1628', letterSpacing: '0.06em' },
                        children: 'VAGUS',
                      },
                    },
                    {
                      type: 'span',
                      props: {
                        style: { fontFamily: 'Newsreader', fontSize: 22, fontWeight: 400, color: '#0A1628', letterSpacing: '0.06em' },
                        children: 'RESEARCH',
                      },
                    },
                  ],
                },
              },
              {
                type: 'span',
                props: {
                  style: { fontFamily: 'JetBrains Mono', fontSize: 8, color: '#94a3b8', letterSpacing: '0.2em' },
                  children: 'EVIDENCE-BASED VNS SCIENCE',
                },
              },
            ],
          },
        },
      ],
    },
  },
  400, 60,
  join(publicDir, 'images', 'logo.png'),
  'png'
)
console.log('✓ logo.png')

// ─── 2. Default OG Image (1200x630) ─────────────────────────
await render(
  {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0A1628 0%, #111D33 50%, #0A1628 100%)',
        padding: '60px 80px',
      },
      children: [
        // Top: brand label
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', gap: '12px' },
            children: [
              {
                type: 'div',
                props: {
                  style: { width: 4, height: 28, background: '#00B8A9', borderRadius: 2 },
                },
              },
              {
                type: 'span',
                props: {
                  style: { fontFamily: 'JetBrains Mono', fontSize: 14, letterSpacing: '0.15em', color: '#00B8A9' },
                  children: 'VAGUS RESEARCH',
                },
              },
            ],
          },
        },
        // Middle: title + tagline
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: '20px' },
            children: [
              {
                type: 'div',
                props: {
                  style: { fontFamily: 'Newsreader', fontSize: 58, fontWeight: 300, color: 'white', lineHeight: 1.15, letterSpacing: '-0.01em' },
                  children: 'The Science of Vagus\nNerve Stimulation',
                },
              },
              {
                type: 'div',
                props: {
                  style: { fontFamily: 'Inter', fontSize: 20, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 },
                  children: 'Evidence-Based Vagus Nerve Stimulation Science',
                },
              },
            ],
          },
        },
        // Bottom: domain + accent bar
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
            children: [
              {
                type: 'span',
                props: {
                  style: { fontFamily: 'JetBrains Mono', fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' },
                  children: 'vagusresearch.com',
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', gap: '8px' },
                  children: [
                    { type: 'div', props: { style: { width: 40, height: 3, background: '#2D7DD2', borderRadius: 2 } } },
                    { type: 'div', props: { style: { width: 40, height: 3, background: '#00B8A9', borderRadius: 2 } } },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  1200, 630,
  join(publicDir, 'images', 'og', 'default.jpg')
)
console.log('✓ og/default.jpg')

// ─── 3. Homepage Hero (1920x900) ─────────────────────────────
await render(
  {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(160deg, #FAFAFA 0%, #F0F4F8 60%, #E8EFF6 100%)',
        position: 'relative',
      },
      children: [
        // Right side decorative elements
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              position: 'absolute',
              right: 120,
              top: 0,
              bottom: 0,
              width: 500,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.06,
            },
            children: [
              {
                type: 'svg',
                props: {
                  width: 400,
                  height: 800,
                  viewBox: '0 0 400 800',
                  children: [
                    // Main trunk
                    { type: 'path', props: { d: 'M200 0 C200 50,197 100,192 160 C187 220,180 260,175 320 C170 380,165 420,160 480 C155 540,152 600,148 660 C145 720,143 760,140 800', stroke: '#0A1628', strokeWidth: 4, fill: 'none', strokeLinecap: 'round' } },
                    // Branches
                    { type: 'path', props: { d: 'M197 100 C225 94,270 110,320 90 C345 80,370 65,390 55', stroke: '#0A1628', strokeWidth: 3, fill: 'none', strokeLinecap: 'round' } },
                    { type: 'path', props: { d: 'M198 80 C175 74,140 88,100 72 C80 64,55 50,30 42', stroke: '#0A1628', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round' } },
                    { type: 'path', props: { d: 'M185 240 C215 234,260 250,310 230 C335 220,365 205,385 195', stroke: '#0A1628', strokeWidth: 3, fill: 'none', strokeLinecap: 'round' } },
                    { type: 'path', props: { d: 'M180 280 C155 274,115 290,70 272 C50 264,25 250,5 240', stroke: '#0A1628', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round' } },
                    { type: 'path', props: { d: 'M170 400 C200 394,245 410,300 392 C325 382,355 366,380 356', stroke: '#0A1628', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round' } },
                    { type: 'path', props: { d: 'M165 440 C140 436,100 450,55 434 C35 426,15 412,0 404', stroke: '#0A1628', strokeWidth: 2, fill: 'none', strokeLinecap: 'round' } },
                    { type: 'path', props: { d: 'M158 540 C185 534,230 550,280 534 C305 524,335 510,360 500', stroke: '#0A1628', strokeWidth: 2, fill: 'none', strokeLinecap: 'round' } },
                    { type: 'path', props: { d: 'M152 600 C130 596,95 610,55 596', stroke: '#0A1628', strokeWidth: 1.5, fill: 'none', strokeLinecap: 'round' } },
                    // Nodes
                    { type: 'circle', props: { cx: 197, cy: 100, r: 5, fill: '#0A1628' } },
                    { type: 'circle', props: { cx: 185, cy: 240, r: 5, fill: '#0A1628' } },
                    { type: 'circle', props: { cx: 175, cy: 320, r: 5, fill: '#0A1628' } },
                    { type: 'circle', props: { cx: 170, cy: 400, r: 4, fill: '#0A1628' } },
                    { type: 'circle', props: { cx: 160, cy: 480, r: 5, fill: '#0A1628' } },
                    { type: 'circle', props: { cx: 155, cy: 540, r: 4, fill: '#0A1628' } },
                    { type: 'circle', props: { cx: 148, cy: 660, r: 4, fill: '#0A1628' } },
                    // Teal accent nodes
                    { type: 'circle', props: { cx: 185, cy: 240, r: 8, fill: 'none', stroke: '#00B8A9', strokeWidth: 1.5 } },
                    { type: 'circle', props: { cx: 185, cy: 240, r: 16, fill: 'none', stroke: '#00B8A9', strokeWidth: 0.5 } },
                    { type: 'circle', props: { cx: 160, cy: 480, r: 8, fill: 'none', stroke: '#00B8A9', strokeWidth: 1.5 } },
                    { type: 'circle', props: { cx: 160, cy: 480, r: 16, fill: 'none', stroke: '#00B8A9', strokeWidth: 0.5 } },
                  ],
                },
              },
            ],
          },
        },
        // Bottom pulse line
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              position: 'absolute',
              bottom: 80,
              left: 0,
              right: 0,
              height: 60,
              opacity: 0.05,
            },
            children: [
              {
                type: 'svg',
                props: {
                  width: 1920,
                  height: 60,
                  viewBox: '0 0 1920 60',
                  children: [
                    { type: 'path', props: { d: 'M0 30 L600 30 L630 30 L645 10 L660 50 L675 5 L690 45 L705 30 L1920 30', stroke: '#2D7DD2', strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  1920, 900,
  join(publicDir, 'images', 'hero.jpg')
)
console.log('✓ hero.jpg')

// ─── 4. Article Hero Images ─────────────────────────────────
const articles = [
  { file: 'vns-guide-hero.jpg', title: 'What Is Vagus Nerve Stimulation?', topic: 'Foundation', color: '#2563EB' },
  { file: 'vns-safety-hero.jpg', title: 'Is Vagus Nerve Stimulation Safe?', topic: 'Safety', color: '#16A34A' },
  { file: 'vns-anxiety-hero.jpg', title: 'VNS for Anxiety', topic: 'Anxiety', color: '#9333EA' },
  { file: 'vns-depression-hero.jpg', title: 'VNS for Depression', topic: 'Depression', color: '#4F46E5' },
  { file: 'vns-sleep-hero.jpg', title: 'VNS and Sleep', topic: 'Sleep', color: '#0284C7' },
  { file: 'vns-inflammation-hero.jpg', title: 'VNS and Inflammation', topic: 'Inflammation', color: '#EA580C' },
  { file: 'vns-gut-hero.jpg', title: 'VNS and Gut Health', topic: 'Gut Health', color: '#D97706' },
  { file: 'vns-epilepsy-hero.jpg', title: 'VNS for Epilepsy', topic: 'Epilepsy', color: '#7C3AED' },
  { file: 'vns-pain-hero.jpg', title: 'VNS for Pain', topic: 'Pain', color: '#DC2626' },
  { file: 'vns-hrv-hero.jpg', title: 'VNS and Heart Rate Variability', topic: 'Heart Health', color: '#E11D48' },
  { file: 'vns-neuroplasticity-hero.jpg', title: 'VNS and Neuroplasticity', topic: 'Neuroplasticity', color: '#DB2777' },
  { file: 'vns-cognitive-hero.jpg', title: 'VNS and Cognitive Function', topic: 'Cognitive Function', color: '#0891B2' },
]

for (const article of articles) {
  const jsx = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        background: `linear-gradient(145deg, #0A1628 0%, ${article.color}18 45%, #0A1628 100%)`,
        padding: '60px 80px',
      },
      children: [
        // Top: topic badge + brand
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px 16px',
                    borderRadius: 999,
                    border: `1px solid ${article.color}60`,
                    background: `${article.color}15`,
                  },
                  children: [
                    {
                      type: 'span',
                      props: {
                        style: { fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: article.color, letterSpacing: '0.04em' },
                        children: article.topic,
                      },
                    },
                  ],
                },
              },
              {
                type: 'span',
                props: {
                  style: { fontFamily: 'JetBrains Mono', fontSize: 13, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em' },
                  children: 'VAGUS RESEARCH',
                },
              },
            ],
          },
        },
        // Middle: title
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: '24px' },
            children: [
              {
                type: 'div',
                props: {
                  style: { width: 60, height: 3, background: article.color, borderRadius: 2, opacity: 0.7 },
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Newsreader',
                    fontSize: article.title.length > 30 ? 48 : 56,
                    fontWeight: 400,
                    color: 'white',
                    lineHeight: 1.2,
                    maxWidth: 900,
                    letterSpacing: '-0.01em',
                  },
                  children: article.title,
                },
              },
              {
                type: 'div',
                props: {
                  style: { fontFamily: 'Inter', fontSize: 18, color: 'rgba(255,255,255,0.45)' },
                  children: 'What the Research Shows',
                },
              },
            ],
          },
        },
        // Bottom: accent bar
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', gap: '8px' },
            children: [
              { type: 'div', props: { style: { width: 80, height: 3, background: article.color, borderRadius: 2, opacity: 0.5 } } },
              { type: 'div', props: { style: { width: 40, height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 2 } } },
            ],
          },
        },
      ],
    },
  }

  await render(jsx, 1200, 630, join(publicDir, 'images', 'articles', article.file))
  console.log(`✓ articles/${article.file}`)
}

console.log('\nAll images regenerated with brand fonts!')
