export function Cloud({ x = 0, y = 0, scale = 1, opacity = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} data-part="cloud"><path d="M0 23 Q-7 9 10 8 Q16-12 35 0 Q49-7 57 9 Q76 8 77 23Z" fill="#FAF6EB" /></g>
}

export function CoconutTree({ x = 0, y = 0, scale = 1, flip = false, sway = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <path d="M-5 0 Q16-66 0-131 L7-132 Q27-63 6 0Z" fill="#A58E69" />
      <path d="M6-21L15-20 M10-44L19-43 M12-67L21-66 M10-90L19-90" stroke="#857A56" strokeWidth="3" />
      <motion.g data-part="palm-crown" fill="#496B55" style={{ rotate: sway, transformOrigin: '4px -131px' }}>
        <path d="M4-131 Q-40-182-76-126 Q-31-150 4-131Z M4-131 Q-21-195 18-200 Q3-160 4-131Z M4-131 Q37-190 73-152 Q36-155 4-131Z M4-131 Q66-152 88-99 Q44-129 4-131Z M4-131 Q-45-153-60-93 Q-24-127 4-131Z M4-131 Q36-144 47-89 Q25-120 4-131Z" />
        <path d="M4-131 Q-17-166-45-148 M4-131 Q31-174 54-161" fill="none" stroke="#8B9C75" strokeWidth="2" />
        <g fill="#8B9C75"><circle cx="0" cy="-126" r="7" /><circle cx="10" cy="-123" r="6" /></g>
      </motion.g>
    </g>
  )
}

export function ForestTree({ x = 0, y = 0, scale = 1, tone = '#496B55', sway = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 0V-64 M0-30L-14-43 M0-42L15-53" stroke="#817758" strokeWidth="5" strokeLinecap="round" />
      <motion.g data-part="tree-crown" style={{ rotate: sway, transformOrigin: '0px -43px' }}>
      <path d="M-29-49 Q-44-67-23-80 Q-28-104-5-104 Q14-122 25-98 Q49-93 35-72 Q46-48 23-43 Q0-32-12-46 Q-20-40-29-49Z" fill={tone} />
      <path d="M-22-76Q-15-88-6-85" fill="none" stroke="#FAF6EB" opacity=".15" strokeWidth="4" strokeLinecap="round" />
      </motion.g>
    </g>
  )
}

export function PaddyFields({ continuous = false }) {
  return (
    <g data-layer="paddy-fields">
      <path d={continuous ? 'M0 330Q250 310 500 330T1000 330V560H0Z' : 'M0 322Q250 289 514 326T1000 318V560H0Z'} fill="#B8C79B" />
      <path d={continuous ? 'M0 370Q250 340 500 370T1000 370V420Q750 450 500 420T0 420Z' : 'M0 370Q310 304 1000 357V407Q380 338 0 420Z'} fill="#D4D6A7" />
      <path d={continuous ? 'M0 432Q250 402 500 432T1000 432V486Q750 516 500 486T0 486Z' : 'M0 432Q410 349 1000 416V460Q390 400 0 486Z'} fill="#9FB68B" />
      <path d={continuous ? 'M0 370Q250 340 500 370T1000 370 M0 420Q250 390 500 420T1000 420 M0 486Q250 456 500 486T1000 486' : 'M0 361Q400 309 1000 348 M0 421Q400 342 1000 401 M0 484Q400 396 1000 454'} fill="none" stroke="#F3E8C6" strokeWidth="4" />
      {[60, 110, 170, 240, 320, 410, 515, 630, 760, 905].map((x) => <path key={x} d={`M${x} 380l-4-12m4 12 5-9 M${x + 20} 442l-4-13m4 13 6-10`} fill="none" stroke="#7D9A6C" strokeWidth="2" strokeLinecap="round" />)}
    </g>
  )
}

export function MountainLayers() {
  return (
    <g data-layer="mountains">
      <path d="M-40 345Q92 248 159 215Q223 178 282 218L367 134Q394 106 416 129L493 182Q552 74 583 72Q620 70 688 181Q732 218 778 184Q824 148 861 196L1040 345Z" fill="#BCCEC6" />
      <path d="M63 350Q232 246 332 273Q403 194 477 210L566 104Q579 89 590 103L658 204Q691 224 738 214Q827 200 976 350Z" fill="#8FAE9D" />
      <path d="M311 325Q445 270 503 207L580 103L539 213Q579 214 603 245Q645 257 695 319Z" fill="#A8BFA3" />
      <path d="M-2000 410Q-500 400 0 360Q132 263 219 289T393 319Q491 232 576 296Q665 238 744 292Q890 250 1000 326Q1500 410 3000 410V470H-2000Z" fill="#708F77" />
    </g>
  )
}

export function Mist({ y = 270 }) {
  return <g data-layer="mist" fill="none" stroke="#FAF6EB" strokeLinecap="round" opacity=".42"><path d={`M110 ${y}Q370 ${y - 22} 643 ${y}`} strokeWidth="13" /><path d={`M480 ${y + 30}Q720 ${y + 8} 911 ${y + 30}`} strokeWidth="8" /></g>
}

export function CountryRoad() {
  return (
    <g data-layer="road">
      <path d="M1000 335Q637 321 622 354Q609 378 830 398Q1070 426 924 468Q751 515 0 495" fill="none" stroke="#FAF6EB" strokeWidth="55" />
      <path d="M1000 335Q637 321 622 354Q609 378 830 398Q1070 426 924 468Q751 515 0 495" fill="none" stroke="#C9BAA0" strokeWidth="44" />
      <path d="M1000 335Q637 321 622 354Q609 378 830 398Q1070 426 924 468Q751 515 0 495" fill="none" stroke="#F9F1DB" strokeWidth="2" strokeDasharray="16 22" />
    </g>
  )
}
import { motion } from 'motion/react'

