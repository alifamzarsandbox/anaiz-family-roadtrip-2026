import { useEffect, useId, useRef, useState } from 'react'
import { motion, useMotionTemplate, useTransform } from 'motion/react'
import { Cloud, CoconutTree, ForestTree, Mist, MountainLayers, PaddyFields } from './SceneryElements.jsx'

const tiles = [-1000, 0, 1000, 2000, 3000]

export default function JourneyScenery({ progress, distance, reducedMotion }) {
  const id = useId()
  const svgRef = useRef(null)
  const [worldWidth, setWorldWidth] = useState(1000)
  useEffect(() => {
    // Camera adapts on resize only; SVG artwork keeps its proportions on phones.
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.height) setWorldWidth(700 * entry.contentRect.width / entry.contentRect.height)
    })
    observer.observe(svgRef.current)
    return () => observer.disconnect()
  }, [])

  const cloudsX = useTransform(distance, (d) => reducedMotion ? 0 : -d * 110)
  const fieldsX = useTransform(distance, (d) => reducedMotion ? 0 : -d * 450)
  const riverX = useTransform(distance, (d) => reducedMotion ? 0 : -d * 60)
  const treesX = useTransform(distance, (d) => reducedMotion ? 0 : -d * 1400)
  const treeSway = useTransform(distance, (d) => reducedMotion ? 0 : Math.sin(d * Math.PI * 16) * 1.4)
  const hillsX = useTransform(distance, (d) => reducedMotion ? 0 : -d * 90)
  const mistX = useTransform(distance, (d) => reducedMotion ? 0 : -d * 70)
  const roadX = useTransform(distance, (d) => reducedMotion ? 0 : -d * 2400)
  const mountainOpacity = useTransform(progress, [0.54, 0.76], [0, 1])
  const hillsOpacity = useTransform(progress, [0.58, 0.82], [1, 0])
  const countrysideOpacity = useTransform(progress, [0.34, 0.64], [1, 0])
  const palmOpacity = useTransform(progress, [0.36, 0.44], [1, 0])
  const forestOpacity = useTransform(progress, [0.36, 0.44], [0, 1])
  const riverOpacity = useTransform(progress, [0.34, 0.44, 0.56, 0.72], [0, 1, 1, 0])
  const viewpointOpacity = useTransform(progress, [0.82, 0.94], [0, 1])
  const sunsetOpacity = useTransform(progress, [0.55, 1], [0, 0.85])
  const mountainScale = useTransform(progress, (p) => reducedMotion ? 1 : 0.55 + p * 0.45)
  const mountainTransform = useMotionTemplate`translate(580px, 340px) scale(${mountainScale}) translate(-580px, -340px)`

  return (
    <svg ref={svgRef} className="journey-scenery" viewBox={`${500 - worldWidth / 2} 0 ${worldWidth} 700`} role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>Sawah Sabak Bernam berubah menjadi bukit Kedah dan Gunung Jerai mengikut perjalanan</title>
      <defs>
        <linearGradient id={`${id}-sky`} x2="0" y2="1"><stop stopColor="#C9DFE8" /><stop offset="1" stopColor="#FAF6EB" /></linearGradient>
        <linearGradient id={`${id}-sunset`} x2="0" y2="1"><stop stopColor="#EBCB8B" /><stop offset="1" stopColor="#FAF6EB" stopOpacity="0" /></linearGradient>
      </defs>
      <path d="M-2000 0H4000V700H-2000Z" fill={`url(#${id}-sky)`} />
      <motion.path d="M-2000 0H4000V700H-2000Z" fill={`url(#${id}-sunset)`} style={{ opacity: sunsetOpacity }} />
      <circle cx="595" cy="239" r="38" fill="#EBCB8B" opacity=".8" />
      <motion.g data-layer="journey-clouds" style={{ x: cloudsX }}>
        {[-600, 0, 600, 1200].map((x) => <g key={x} transform={`translate(${x} 0)`}><Cloud x={200} y={185} scale={1.1} opacity={.7} /><Cloud x={460} y={266} scale={.65} opacity={.65} /></g>)}
      </motion.g>
      <g transform="translate(0 80)">
        <motion.g data-layer="journey-mountain" style={{ opacity: mountainOpacity, transform: mountainTransform, transformOrigin: '0px 0px' }}><MountainLayers /></motion.g>
        <motion.g data-layer="journey-hills" style={{ opacity: hillsOpacity, x: hillsX }}>
          <path d="M-1500 345Q-600 220 0 320Q155 198 290 299Q410 207 561 297Q750 188 1000 316Q1800 200 2500 345V470H-1500Z" fill="#B5C7AF" />
          <path d="M-1500 366Q-500 269 0 347Q178 270 312 332Q520 250 685 338Q930 272 1200 355Q1800 250 2500 365V470H-1500Z" fill="#8FA884" />
        </motion.g>
        <motion.g style={{ opacity: mountainOpacity, x: mistX }}><Mist y={290} /></motion.g>
      </g>
      <path d="M-2000 420H4000V700H-2000Z" fill="#A8BFA3" />
      <g transform="translate(0 90)">
        <motion.g data-layer="journey-fields" style={{ x: fieldsX, opacity: countrysideOpacity }}>
          {tiles.map((x) => <g key={x} transform={`translate(${x} 0)`}><PaddyFields continuous /></g>)}
        </motion.g>
        <motion.path data-layer="journey-river" d="M411 326Q330 358 478 377Q625 401 489 439L431 459H534Q681 408 548 380Q385 351 456 326Z" fill="#C9DFE8" stroke="#E5E9CE" strokeWidth="3" style={{ opacity: riverOpacity, x: riverX }} />
      </g>
      <g data-layer="winding-road" fill="none" strokeLinecap="round">
        <path d="M925 433Q700 421 788 453Q882 482 690 497Q633 502 610 518" stroke="#FAF6EB" strokeWidth="18" />
        <path d="M925 433Q700 421 788 453Q882 482 690 497Q633 502 610 518" stroke="#C9BAA0" strokeWidth="12" />
      </g>
      <motion.g data-layer="journey-trees" style={{ x: treesX }}>
        {tiles.map((x) => <g key={x} transform={`translate(${x} 0)`}>
          <motion.g style={{ opacity: palmOpacity }}><CoconutTree x={250} y={503} scale={.88} sway={treeSway} /><CoconutTree x={870} y={490} scale={.65} flip sway={treeSway} /></motion.g>
          <motion.g style={{ opacity: forestOpacity }}><ForestTree x={250} y={505} scale={1.05} sway={treeSway} /><ForestTree x={720} y={498} scale={.7} sway={treeSway} /><ForestTree x={870} y={492} scale={.9} tone="#708F77" sway={treeSway} /></motion.g>
          <ForestTree x={580} y={447} scale={.35} tone="#708F77" />
        </g>)}
      </motion.g>
      <motion.g data-layer="viewpoint" style={{ opacity: viewpointOpacity }} stroke="#A58E69" strokeLinecap="round">
        <path d="M-2000 490H4000" strokeWidth="5" />
        {Array.from({ length: 25 }, (_, i) => <path key={i} d={`M${i * 150 - 1300} 488V515`} strokeWidth="5" />)}
      </motion.g>
      <g data-layer="journey-road">
        <path d="M-2000 514H4000V566H-2000Z" fill="#FAF6EB" />
        <path d="M-2000 519H4000V561H-2000Z" fill="#C9BAA0" />
        <motion.path data-part="road-markings" d="M-2000 545H5000" fill="none" stroke="#FAF6EB" strokeWidth="2" strokeDasharray="20 25" style={{ x: roadX }} />
      </g>
      <path d="M-2000 581Q-1000 560 0 587Q350 554 650 584Q1000 559 1800 580H4000V700H-2000Z" fill="#8B9C75" />
      <motion.g style={{ x: treesX }} fill="none" stroke="#496B55" strokeWidth="2" strokeLinecap="round">
        {tiles.map((x) => <g key={x} transform={`translate(${x} 0)`}><path d="M100 606q0-18-10-22m10 22q8-17 17-20 M440 632q0-18-10-22m10 22q8-17 17-20 M790 594q0-18-10-22m10 22q8-17 17-20" /></g>)}
      </motion.g>
    </svg>
  )
}
