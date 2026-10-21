import { useId } from 'react'
import { motion } from 'motion/react'

function Passenger({ x, y, child = false, headscarf = false }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-15 28 Q-16 9 0 9 Q16 9 15 28" fill={child ? '#EBCB8B' : '#A8BFA3'} />
      {headscarf && <path d="M-15 23 Q-20-16 0-17 Q20-16 15 23Z" fill="#FAF6EB" />}
      <ellipse cy="0" rx={child ? 10 : 12} ry="13" fill="#EBC3A4" />
      {!headscarf && <path d="M-12-2 Q-15-17 0-15 Q15-17 12-3 L7-8 Q0-4-5-8Z" fill="#4C493B" />}
      <g fill="#4C493B"><circle cx="-4" r="1.1" /><circle cx="4" r="1.1" /></g>
      <path d="M-3 5 Q0 8 3 5" fill="none" stroke="#8A5946" strokeWidth="1.2" strokeLinecap="round" />
      <g fill="#D89C7B" opacity=".55"><ellipse cx="-7" cy="4" rx="2.5" ry="1.5" /><ellipse cx="7" cy="4" rx="2.5" ry="1.5" /></g>
    </g>
  )
}

function Wheel({ x, rotation }) {
  return (
    <g transform={`translate(${x} 167)`}>
      <circle r="25" fill="#3D493F" />
      <circle r="17" fill="#FAF6EB" />
      <motion.g data-part="wheel" style={{ rotate: rotation, transformOrigin: '0px 0px' }} stroke="#BCAD94" strokeWidth="3" strokeLinecap="round">
        <path d="M0-12V12 M-12 0H12 M-8-8L8 8 M8-8L-8 8" />
      </motion.g>
      <circle r="6" fill="#D89C7B" stroke="#9D7057" strokeWidth="1.5" />
    </g>
  )
}

/** Accepts numbers or MotionValues; wheel/body updates never require React rerenders. */
export default function AnimatedCar({ wheelRotation = 0, bodyOffset = 0, className = '' }) {
  const id = useId()
  return (
    <svg className={className} viewBox="0 0 360 215" role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>Kereta retro terracotta dengan empat penumpang keluarga dan bagasi di atas bumbung</title>
      <defs>
        <linearGradient id={`${id}-paint`} x2="0" y2="1">
          <stop stopColor="#E6B18E" /><stop offset="1" stopColor="#CD8D70" />
        </linearGradient>
        <clipPath id={`${id}-window`}>
          <path d="M82 84 Q85 69 102 69 H213 Q226 69 235 84 L253 112 H76Z" />
        </clipPath>
      </defs>
      <ellipse cx="183" cy="194" rx="153" ry="10" fill="#496B55" opacity=".14" />
      <motion.g data-part="car-body" style={{ y: bodyOffset }} strokeLinejoin="round">
        <g data-part="luggage">
          <path d="M110 57V49 H212 V57" fill="none" stroke="#796B55" strokeWidth="4" strokeLinecap="round" />
          <rect x="122" y="27" width="58" height="24" rx="6" fill="#8B9C75" stroke="#647758" strokeWidth="2" />
          <path d="M142 27V22 Q152 17 162 22V27 M135 28V50 M167 28V50" fill="none" stroke="#596B50" strokeWidth="3" />
          <rect x="182" y="32" width="27" height="19" rx="5" fill="#E8D9C5" stroke="#BDA78C" strokeWidth="2" />
          <path d="M190 33V50 M200 33V50" stroke="#BDA78C" strokeWidth="2" />
        </g>
        <path d="M43 116 L65 110 L76 76 Q81 58 105 58 H212 Q233 58 247 80 L273 116 L310 123 Q328 127 329 144 V163 Q329 175 313 175 H49 Q31 175 31 158 V137 Q31 123 43 116Z" fill={`url(#${id}-paint)`} stroke="#9C6A54" strokeWidth="2.5" />
        <path d="M82 84 Q85 69 102 69 H213 Q226 69 235 84 L253 112 H76Z" fill="#C9DFE8" stroke="#FAF6EB" strokeWidth="5" />
        <g clipPath={`url(#${id}-window)`}>
          <path d="M70 107H260V117H70Z" fill="#8B9C75" />
          <Passenger x={102} y={91} headscarf />
          <Passenger x={139} y={97} child />
          <Passenger x={174} y={97} child />
          <Passenger x={215} y={90} />
          <path d="M225 111 Q231 95 243 109" fill="none" stroke="#596B50" strokeWidth="3" />
          <path d="M77 78L110 110 M177 70L202 95" stroke="#FFF" opacity=".2" strokeWidth="6" />
        </g>
        <path d="M123 68V114 M190 68V114" stroke="#FAF6EB" strokeWidth="5" />
        <path d="M123 117V157 Q123 161 129 161 H238 Q244 161 244 155 V120" fill="none" stroke="#B57E63" strokeWidth="1.7" />
        <path d="M45 132H310" stroke="#F2C6A5" strokeWidth="4" />
        <path d="M137 124H149 M203 124H215" stroke="#FAF6EB" strokeWidth="3" strokeLinecap="round" />
        <rect x="247" y="101" width="14" height="9" rx="4" fill="#E8D9C5" stroke="#9C6A54" strokeWidth="2" />
        <path d="M51 174A29 29 0 0 1 58 146 Q81 127 104 146 A29 29 0 0 1 111 174 M249 174A29 29 0 0 1 256 146 Q279 127 302 146 A29 29 0 0 1 309 174" fill="#B57E63" />
        <rect x="313" y="131" width="12" height="18" rx="5" fill="#FAE9BB" />
        <rect x="33" y="130" width="7" height="13" rx="3" fill="#AA6553" />
        <path d="M29 161H44 M314 161H333" stroke="#E8D9C5" strokeWidth="7" strokeLinecap="round" />
      </motion.g>
      <Wheel x={81} rotation={wheelRotation} />
      <Wheel x={279} rotation={wheelRotation} />
    </svg>
  )
}
