import { GoogleGenAI } from '@google/genai'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

mkdirSync(join(publicDir, 'images', 'articles'), { recursive: true })
mkdirSync(join(publicDir, 'images', 'og'), { recursive: true })

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

async function generateImage(prompt, outputPath) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
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

const brandStyle = `Minimalist, scientific, academic illustration style. Dark navy background (#0A1628). Subtle, elegant, abstract. No text, no words, no letters, no labels. Clean composition with lots of negative space. Muted teal (#00B8A9) and blue (#2D7DD2) accent colours. High quality, editorial feel like Nature journal or The Lancet. 1200x630 aspect ratio.`

const images = [
  {
    file: 'hero.jpg',
    prompt: `Abstract scientific illustration of the human vagus nerve pathway. Show an elegant, simplified anatomical view of the vagus nerve branching from the brainstem down through the body, connecting to the heart, lungs, and gut. Use flowing, graceful lines suggesting neural connections. ${brandStyle} Wide panoramic 1920x900 ratio.`,
  },
  {
    file: 'articles/vns-guide-hero.jpg',
    prompt: `Abstract scientific illustration of vagus nerve stimulation. Show a stylised vagus nerve with subtle electrical pulse signals traveling along it, depicted as gentle waves or light pulses. ${brandStyle}`,
  },
  {
    file: 'articles/vns-safety-hero.jpg',
    prompt: `Abstract scientific illustration representing medical safety and clinical research. Show a stylised shield or protective element integrated with neural pathways and gentle pulse waveforms. ${brandStyle}`,
  },
  {
    file: 'articles/vns-anxiety-hero.jpg',
    prompt: `Abstract scientific illustration of the brain's anxiety circuits. Show a stylised brain with calming neural connections, suggesting the amygdala being regulated by descending vagal pathways. Peaceful, calming atmosphere. ${brandStyle}`,
  },
  {
    file: 'articles/vns-depression-hero.jpg',
    prompt: `Abstract scientific illustration of neural pathways related to mood regulation. Show a stylised brain with serotonergic and noradrenergic pathways being activated, depicted as gentle flowing light paths. ${brandStyle}`,
  },
  {
    file: 'articles/vns-sleep-hero.jpg',
    prompt: `Abstract scientific illustration representing sleep and the autonomic nervous system. Show a stylised brain transitioning into a calm sleep state with slow wave patterns and parasympathetic neural activity. ${brandStyle}`,
  },
  {
    file: 'articles/vns-inflammation-hero.jpg',
    prompt: `Abstract scientific illustration of the cholinergic anti-inflammatory pathway. Show the vagus nerve sending signals that calm an inflammatory response at the cellular level, depicted as cool calming waves meeting warm inflammatory elements. ${brandStyle}`,
  },
  {
    file: 'articles/vns-gut-hero.jpg',
    prompt: `Abstract scientific illustration of the gut-brain axis via the vagus nerve. Show a stylised connection between the brain and the digestive system through an elegant vagus nerve pathway, with the enteric nervous system visible. ${brandStyle}`,
  },
  {
    file: 'articles/vns-epilepsy-hero.jpg',
    prompt: `Abstract scientific illustration of neural activity and seizure modulation. Show a stylised brain with electrical discharge patterns being regulated and calmed by vagal input, transforming chaotic signals into ordered patterns. ${brandStyle}`,
  },
  {
    file: 'articles/vns-pain-hero.jpg',
    prompt: `Abstract scientific illustration of pain pathways being modulated. Show descending inhibitory pathways from the brainstem through the periaqueductal grey, with pain signals being dampened by vagal nerve activation. ${brandStyle}`,
  },
  {
    file: 'articles/vns-hrv-hero.jpg',
    prompt: `Abstract scientific illustration of heart rate variability. Show a stylised heart with an elegant ECG/HRV waveform, connected to the vagus nerve. The waveform shows healthy variability. ${brandStyle}`,
  },
  {
    file: 'articles/vns-neuroplasticity-hero.jpg',
    prompt: `Abstract scientific illustration of neuroplasticity and synaptic remodelling. Show neurons forming new connections, with synapses strengthening and neural pathways reorganising, facilitated by neuromodulatory signals. ${brandStyle}`,
  },
  {
    file: 'articles/vns-cognitive-hero.jpg',
    prompt: `Abstract scientific illustration of cognitive enhancement and memory. Show a stylised brain with the hippocampus and prefrontal cortex highlighted by noradrenergic and cholinergic pathways being activated. ${brandStyle}`,
  },
]

console.log(`Generating ${images.length} images with Gemini...\n`)

for (const img of images) {
  const outPath = join(publicDir, 'images', img.file)
  await generateImage(img.prompt, outPath)
  // Small delay to avoid rate limiting
  await new Promise(r => setTimeout(r, 2000))
}

console.log('\nDone!')
