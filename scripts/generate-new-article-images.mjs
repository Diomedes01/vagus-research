import { GoogleGenAI } from '@google/genai'
import { writeFileSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

// Load .env.local manually
const envContent = readFileSync(join(__dirname, '..', '.env.local'), 'utf8')
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/)
  if (match) process.env[match[1].trim()] = match[2].trim()
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

async function generateImage(prompt, outputPath) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents: prompt,
      config: {
        responseModalities: ['image', 'text'],
      },
    })

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, 'base64')
        writeFileSync(outputPath, buffer)
        console.log(`✓ ${outputPath.split('/public/')[1]}`)
        return true
      }
    }
    console.log(`⚠ No image in response for ${outputPath}`)
    return false
  } catch (err) {
    console.error(`✗ Failed: ${outputPath.split('/public/')[1]} — ${err.message}`)
    return false
  }
}

const brandStyle = `Minimalist, scientific, academic illustration style. Dark navy background (#0A1628). Subtle, elegant, abstract. No text, no words, no letters, no labels. Clean composition with lots of negative space. Muted teal (#00B8A9) and blue (#2D7DD2) accent colours. High quality, editorial feel like Nature journal or The Lancet. Luminous, ethereal, glowing style with particle effects. 1200x630 aspect ratio.`

const images = [
  {
    file: 'images/articles/vns-ptsd-hero.png',
    prompt: `DO NOT draw a brain silhouette or brain outline. Instead, create an abstract artistic scene: a shattered glass or crystal surface floating in dark space, with fragments slowly reassembling. Teal light threads (#00B8A9) connect the broken pieces, pulling them back together. Some fragments glow with warm amber light (representing trauma) while the reassembled sections glow cool teal (representing healing). Tiny luminous particles drift between the pieces. The mood is one of careful restoration — broken things becoming whole again. ${brandStyle}`,
  },
  {
    file: 'images/articles/vns-migraine-hero.png',
    prompt: `DO NOT draw a brain silhouette or brain outline. Instead, create an abstract artistic scene: concentric pressure rings or ripples emanating from a bright white-hot epicentre point on the left side. The inner rings glow warm red/coral, transitioning through purple to cool blue and teal as they expand outward. Jagged lightning-bolt disruptions radiate from the epicentre but fade and smooth out as they travel right. The right side of the image has calm, smooth sinusoidal waves in teal, representing relief. Like a seismograph visualization of pain dissipating. ${brandStyle}`,
  },
  {
    file: 'images/articles/vns-stroke-hero.png',
    prompt: `DO NOT draw a brain silhouette or brain outline. Instead, create an abstract artistic scene: a beautiful branching vascular tree, like a river delta or botanical root system viewed from above. The left branches are fully illuminated in teal (#00B8A9), representing healthy blood flow. The right branches transition from dim/dark to gradually illuminated, with a bright restoration point where flow is being re-established. Tiny glowing particles flow along the lit pathways like blood cells. The overall feel is organic, like an aerial photograph of a river system at night with bioluminescent water. ${brandStyle}`,
  },
  {
    file: 'images/articles/vns-tinnitus-hero.png',
    prompt: `DO NOT draw a brain silhouette or brain outline. Instead, create an abstract artistic scene: a large elegant cochlea/fibonacci spiral structure in the centre-left, rendered in luminous blue and teal wireframe with delicate hair-cell filaments radiating outward. On the left side, jagged chaotic sound wave patterns in warm red/coral represent the phantom ringing of tinnitus. On the right side, smooth harmonious sine waves in cool teal represent restored hearing. The spiral acts as the transition point — chaos enters, calm exits. Include subtle frequency spectrum bars below and floating particles throughout. ${brandStyle}`,
  },
]

console.log(`Generating ${images.length} images with Gemini...\n`)

for (const img of images) {
  const outPath = join(publicDir, img.file)
  await generateImage(img.prompt, outPath)
  await new Promise(r => setTimeout(r, 3000))
}

console.log('\nDone!')
