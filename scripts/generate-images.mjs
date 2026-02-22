import sharp from 'sharp'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

// Ensure directories exist
mkdirSync(join(publicDir, 'images', 'og'), { recursive: true })
mkdirSync(join(publicDir, 'images', 'articles'), { recursive: true })

// ─── 1. Logo PNG (400x60) ───────────────────────────────────
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="60" viewBox="0 0 400 60" fill="none">
  <g transform="translate(0, 6)">
    <path d="M9 3C9 3 15 12 24 21C33 30 24 33 24 42C24 46.5 27 51 30 51" stroke="#2D7DD2" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M39 3C39 3 33 12 24 21" stroke="#0A1628" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <circle cx="9" cy="3" r="3" fill="#2D7DD2"/>
    <circle cx="39" cy="3" r="3" fill="#0A1628"/>
    <circle cx="30" cy="51" r="3" fill="#2D7DD2"/>
  </g>
  <text x="62" y="26" font-family="Georgia, serif" font-size="22" font-weight="500" letter-spacing="0.12em" fill="#0A1628">VAGUS</text>
  <text x="178" y="26" font-family="Georgia, serif" font-size="22" font-weight="500" letter-spacing="0.12em" fill="#2D7DD2">RESEARCH</text>
  <text x="62" y="48" font-family="Arial, Helvetica, sans-serif" font-size="10" letter-spacing="0.2em" fill="#6B7280">THE SCIENCE OF VAGUS NERVE STIMULATION</text>
</svg>`

await sharp(Buffer.from(logoSvg))
  .resize(400, 60)
  .png()
  .toFile(join(publicDir, 'images', 'logo.png'))
console.log('✓ logo.png')

// ─── 2. Default OG Image (1200x630) ─────────────────────────
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0A1628"/>
      <stop offset="50%" stop-color="#111D33"/>
      <stop offset="100%" stop-color="#0A1628"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2D7DD2"/>
      <stop offset="100%" stop-color="#00B8A9"/>
    </linearGradient>
    <!-- Subtle grid pattern -->
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <!-- Decorative nerve pathway -->
  <g transform="translate(900, 80)" opacity="0.08">
    <path d="M0 0C0 0 40 60 100 130C160 200 100 230 100 310C100 350 120 400 140 400" stroke="#2D7DD2" stroke-width="20" stroke-linecap="round" fill="none"/>
    <path d="M200 0C200 0 160 60 100 130" stroke="white" stroke-width="20" stroke-linecap="round" fill="none"/>
    <circle cx="0" cy="0" r="14" fill="#2D7DD2"/>
    <circle cx="200" cy="0" r="14" fill="white"/>
    <circle cx="140" cy="400" r="14" fill="#2D7DD2"/>
  </g>
  <!-- Accent line -->
  <rect x="100" y="220" width="80" height="3" rx="1.5" fill="url(#accent)"/>
  <!-- Title -->
  <text x="100" y="280" font-family="Georgia, serif" font-size="56" font-weight="500" letter-spacing="0.04em" fill="white">Vagus Research</text>
  <!-- Tagline -->
  <text x="100" y="340" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="rgba(255,255,255,0.6)" letter-spacing="0.06em">Evidence-Based Vagus Nerve Stimulation Science</text>
  <!-- Bottom bar -->
  <rect x="0" y="610" width="1200" height="20" fill="url(#accent)" opacity="0.6"/>
  <!-- Domain -->
  <text x="100" y="560" font-family="monospace" font-size="14" fill="rgba(255,255,255,0.35)" letter-spacing="0.15em">VAGUSRESEARCH.COM.AU</text>
</svg>`

await sharp(Buffer.from(ogSvg))
  .resize(1200, 630)
  .jpeg({ quality: 90 })
  .toFile(join(publicDir, 'images', 'og', 'default.jpg'))
console.log('✓ og/default.jpg')

// ─── 3. Article Hero Images (1200x630 each) ─────────────────

const articleHeroes = [
  {
    file: 'vns-guide-hero.jpg',
    title: 'What Is Vagus Nerve\nStimulation?',
    color1: '#2563EB', color2: '#1D4ED8', // blue
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    file: 'vns-safety-hero.jpg',
    title: 'Is Vagus Nerve\nStimulation Safe?',
    color1: '#16A34A', color2: '#15803D', // green
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    file: 'vns-anxiety-hero.jpg',
    title: 'VNS for Anxiety',
    color1: '#9333EA', color2: '#7E22CE', // purple
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  {
    file: 'vns-depression-hero.jpg',
    title: 'VNS for Depression',
    color1: '#4F46E5', color2: '#4338CA', // indigo
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    file: 'vns-sleep-hero.jpg',
    title: 'VNS and Sleep',
    color1: '#0284C7', color2: '#0369A1', // sky
    icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
  },
  {
    file: 'vns-inflammation-hero.jpg',
    title: 'VNS and\nInflammation',
    color1: '#EA580C', color2: '#C2410C', // orange
    icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z',
  },
  {
    file: 'vns-gut-hero.jpg',
    title: 'VNS and\nGut Health',
    color1: '#D97706', color2: '#B45309', // amber
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  },
  {
    file: 'vns-epilepsy-hero.jpg',
    title: 'VNS for Epilepsy',
    color1: '#7C3AED', color2: '#6D28D9', // violet
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    file: 'vns-pain-hero.jpg',
    title: 'VNS for Pain',
    color1: '#DC2626', color2: '#B91C1C', // red
    icon: 'M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3',
  },
  {
    file: 'vns-hrv-hero.jpg',
    title: 'VNS and Heart\nRate Variability',
    color1: '#E11D48', color2: '#BE123C', // rose
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  {
    file: 'vns-neuroplasticity-hero.jpg',
    title: 'VNS and\nNeuroplasticity',
    color1: '#DB2777', color2: '#BE185D', // pink
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    file: 'vns-cognitive-hero.jpg',
    title: 'VNS and Cognitive\nFunction',
    color1: '#0891B2', color2: '#0E7490', // cyan/teal for Cognitive Function
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
]

for (const hero of articleHeroes) {
  const lines = hero.title.split('\n')
  const titleSvg = lines.map((line, i) =>
    `<text x="100" y="${270 + i * 62}" font-family="Georgia, serif" font-size="52" font-weight="500" fill="white" letter-spacing="0.02em">${line}</text>`
  ).join('\n  ')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0A1628"/>
      <stop offset="40%" stop-color="${hero.color1}20"/>
      <stop offset="100%" stop-color="#0A1628"/>
    </linearGradient>
    <linearGradient id="accentLine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${hero.color1}"/>
      <stop offset="100%" stop-color="${hero.color2}"/>
    </linearGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="0.8" cy="0.3" r="0.5">
      <stop offset="0%" stop-color="${hero.color1}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${hero.color1}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <!-- Decorative icon -->
  <g transform="translate(880, 160) scale(6)" opacity="0.07" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="${hero.icon}"/>
  </g>
  <!-- Accent line -->
  <rect x="100" y="220" width="60" height="3" rx="1.5" fill="url(#accentLine)"/>
  <!-- Title -->
  ${titleSvg}
  <!-- Bottom bar -->
  <rect x="0" y="614" width="1200" height="16" fill="url(#accentLine)" opacity="0.5"/>
  <!-- Vagus Research branding -->
  <text x="100" y="560" font-family="monospace" font-size="13" fill="rgba(255,255,255,0.3)" letter-spacing="0.15em">VAGUS RESEARCH</text>
</svg>`

  await sharp(Buffer.from(svg))
    .resize(1200, 630)
    .jpeg({ quality: 85 })
    .toFile(join(publicDir, 'images', 'articles', hero.file))
  console.log(`✓ articles/${hero.file}`)
}

console.log('\nAll images generated successfully!')
