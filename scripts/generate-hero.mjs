import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

// Homepage hero image — 1920x900, abstract neural/vagus motif
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="900" viewBox="0 0 1920 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="#FAFAFA"/>
      <stop offset="100%" stop-color="#F0F4F8"/>
    </linearGradient>
    <radialGradient id="glowTeal" cx="0.75" cy="0.4" r="0.4">
      <stop offset="0%" stop-color="#00B8A9" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#00B8A9" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowBlue" cx="0.85" cy="0.6" r="0.35">
      <stop offset="0%" stop-color="#2D7DD2" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#2D7DD2" stop-opacity="0"/>
    </radialGradient>
    <!-- Subtle dot grid -->
    <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="0.6" fill="#0A1628" opacity="0.06"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1920" height="900" fill="url(#bg)"/>
  <rect width="1920" height="900" fill="url(#dots)"/>
  <rect width="1920" height="900" fill="url(#glowTeal)"/>
  <rect width="1920" height="900" fill="url(#glowBlue)"/>

  <!-- Abstract vagus nerve pathway — right side -->
  <g opacity="0.07" stroke="#0A1628" fill="none" stroke-linecap="round">
    <!-- Main trunk -->
    <path d="M1400 -20 C1400 60, 1395 140, 1385 220 C1375 300, 1360 360, 1350 440 C1340 520, 1332 600, 1325 680 C1318 760, 1312 840, 1308 920" stroke-width="4"/>
    <!-- Upper branch right -->
    <path d="M1395 140 C1430 132, 1490 148, 1560 125 C1600 112, 1650 95, 1700 82" stroke-width="3"/>
    <!-- Upper branch left -->
    <path d="M1398 110 C1370 104, 1330 118, 1280 100 C1250 90, 1210 76, 1170 68" stroke-width="3"/>
    <!-- Sub-branch -->
    <path d="M1560 125 C1575 150, 1600 172, 1635 182" stroke-width="2"/>
    <!-- Cardiac branch right -->
    <path d="M1370 320 C1410 312, 1470 330, 1530 308 C1560 296, 1600 278, 1640 268" stroke-width="3"/>
    <!-- Cardiac sub-branch -->
    <path d="M1480 325 C1495 355, 1515 380, 1550 392" stroke-width="2"/>
    <!-- Pulmonary branch left -->
    <path d="M1365 370 C1330 364, 1280 380, 1230 358 C1200 346, 1165 330, 1130 318" stroke-width="3"/>
    <!-- Pulmonary sub-branch -->
    <path d="M1280 375 C1265 400, 1245 425, 1215 438" stroke-width="2"/>
    <!-- Hepatic branch -->
    <path d="M1348 530 C1385 522, 1440 540, 1500 518 C1530 506, 1570 488, 1610 478" stroke-width="2.5"/>
    <!-- Gastric branch -->
    <path d="M1340 580 C1310 576, 1265 590, 1220 572 C1195 562, 1165 548, 1135 538" stroke-width="2"/>
    <!-- Intestinal branch -->
    <path d="M1330 680 C1365 672, 1415 690, 1470 672 C1500 662, 1540 645, 1575 635" stroke-width="2"/>
    <!-- Deep left branch -->
    <path d="M1322 730 C1295 726, 1255 740, 1210 722 C1185 712, 1155 698, 1125 688" stroke-width="1.5"/>
    <!-- Terminal branches -->
    <path d="M1315 800 C1345 796, 1385 810, 1420 800" stroke-width="1.5"/>
    <path d="M1312 840 C1285 836, 1255 845, 1225 838" stroke-width="1"/>
  </g>

  <!-- Node dots along trunk -->
  <g opacity="0.08" fill="#0A1628">
    <circle cx="1395" cy="140" r="5"/>
    <circle cx="1385" cy="220" r="4"/>
    <circle cx="1370" cy="320" r="5"/>
    <circle cx="1365" cy="370" r="4"/>
    <circle cx="1350" cy="440" r="5"/>
    <circle cx="1348" cy="530" r="4"/>
    <circle cx="1340" cy="580" r="4"/>
    <circle cx="1330" cy="680" r="4"/>
    <circle cx="1322" cy="730" r="3"/>
  </g>

  <!-- Teal accent nodes -->
  <g opacity="0.12" fill="#00B8A9">
    <circle cx="1370" cy="320" r="6"/>
    <circle cx="1348" cy="530" r="5"/>
    <circle cx="1700" cy="82" r="3"/>
    <circle cx="1640" cy="268" r="3"/>
    <circle cx="1130" cy="318" r="3"/>
  </g>

  <!-- Subtle concentric rings at key nodes -->
  <g opacity="0.04" stroke="#00B8A9" fill="none">
    <circle cx="1370" cy="320" r="20" stroke-width="1"/>
    <circle cx="1370" cy="320" r="35" stroke-width="0.5"/>
    <circle cx="1348" cy="530" r="18" stroke-width="1"/>
    <circle cx="1348" cy="530" r="30" stroke-width="0.5"/>
  </g>

  <!-- Abstract pulse/signal line across bottom -->
  <g opacity="0.05" stroke="#2D7DD2" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M0 780 L400 780 L430 780 L445 740 L460 820 L475 720 L490 800 L505 780 L600 780 L1920 780"/>
  </g>

  <!-- Secondary subtle pulse -->
  <g opacity="0.03" stroke="#00B8A9" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
    <path d="M0 810 L800 810 L820 810 L830 790 L840 830 L850 785 L860 815 L870 810 L1920 810"/>
  </g>
</svg>`

await sharp(Buffer.from(svg))
  .resize(1920, 900)
  .jpeg({ quality: 88 })
  .toFile(join(publicDir, 'images', 'hero.jpg'))

console.log('✓ hero.jpg (1920x900)')
