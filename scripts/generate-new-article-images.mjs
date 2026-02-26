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

const brandStyle = `Minimalist, scientific, academic illustration style. Dark navy background (#0A1628). Subtle, elegant, abstract. No text, no words, no letters, no labels. Clean composition with lots of negative space. Muted teal (#00B8A9) and blue (#2D7DD2) accent colours. High quality, editorial feel like Nature journal or The Lancet. Luminous, ethereal, glowing wireframe style with particle effects. 1200x630 aspect ratio.`

const images = [
  {
    file: 'images/articles/vns-ptsd-hero.png',
    prompt: `Abstract scientific illustration of PTSD and fear extinction neuroscience. Show a stylised brain with the amygdala highlighted in warm tones being gradually calmed by descending vagal pathways depicted as cool teal flowing light. Include subtle representations of the locus coeruleus and prefrontal cortex connected by luminous neural pathways. The overall mood should convey transformation from hyperarousal to calm regulation. ${brandStyle}`,
  },
  {
    file: 'images/articles/vns-migraine-hero.png',
    prompt: `Abstract scientific illustration of migraine pathophysiology and the trigeminal-vagal connection. Show a stylised brain with the trigeminal nerve system and vagus nerve converging at the brainstem. Depict cortical spreading depression as a subtle wave being suppressed by vagal input. Include flowing light paths representing descending pain modulation from the brainstem. ${brandStyle}`,
  },
  {
    file: 'images/articles/vns-stroke-hero.png',
    prompt: `Abstract scientific illustration of stroke rehabilitation and targeted neuroplasticity. Show a stylised brain with the motor cortex highlighted, where damaged neural pathways are being rebuilt and strengthened. Depict new synaptic connections forming as luminous bridges of light, with the vagus nerve providing neuromodulatory signals represented as gentle pulses of teal energy flowing to the cortex. ${brandStyle}`,
  },
  {
    file: 'images/articles/vns-tinnitus-hero.png',
    prompt: `Abstract scientific illustration of auditory cortex reorganisation in tinnitus. Show a stylised representation of the auditory cortex with a tonotopic frequency map. Depict maladaptive neural synchrony being reversed — chaotic hypersynchronous patterns transforming into balanced, orderly frequency representations. Include subtle sound wave elements and the vagus nerve pathway providing modulatory input. ${brandStyle}`,
  },
]

console.log(`Generating ${images.length} images with Gemini...\n`)

for (const img of images) {
  const outPath = join(publicDir, img.file)
  await generateImage(img.prompt, outPath)
  await new Promise(r => setTimeout(r, 3000))
}

console.log('\nDone!')
