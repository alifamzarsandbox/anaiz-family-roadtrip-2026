import { motion, useTransform } from 'motion/react'

function FloatingPiece({ progress, index }) {
  const leaf = index % 3 === 0
  const x = useTransform(progress, (p) => Math.sin(Math.max(0, p - 0.8) * 24 + index) * 16)
  const y = useTransform(progress, [0.8, 1], [20 + index % 3 * 8, -44 - index % 4 * 12])
  const rotate = useTransform(progress, [0.8, 1], [index * 25, index * 25 + 65])
  return (
    <motion.span className={leaf ? 'arrival-piece arrival-leaf' : 'arrival-piece arrival-spark'} style={{ left: `${7 + index * 7.6}%`, top: `${44 + index % 4 * 8}%`, x, y, rotate }}>
      {leaf && <svg viewBox="0 0 24 24" focusable="false"><path d="M3 20Q-1 3 21 3Q21 23 3 20Z" fill="currentColor" /><path d="M3 21L16 8" fill="none" stroke="#FAF6EB" strokeWidth="1.2" /></svg>}
    </motion.span>
  )
}

export default function ArrivalEffects({ progress, reducedMotion }) {
  const opacity = useTransform(progress, [0.8, 0.86, 1], [0, 0.7, 0.55])
  const visibility = useTransform(opacity, (v) => v > 0.001 ? 'visible' : 'hidden')
  if (reducedMotion) return null
  return (
    <motion.div className="arrival-effects" style={{ opacity, visibility }} aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => <FloatingPiece key={index} index={index} progress={progress} />)}
    </motion.div>
  )
}
