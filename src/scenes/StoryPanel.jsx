import { motion, useTransform } from 'motion/react'

/** A deterministic reveal window, driven by the same progress as the scenery. */
export default function StoryPanel({ progress, reducedMotion, start, end, id, className = '', children }) {
  const opacity = useTransform(progress, (p) => {
    const entrance = start === 0 ? 1 : Math.max(0, Math.min(1, (p - start) / 0.04))
    const exit = end === 1 ? 1 : Math.max(0, Math.min(1, (end - p) / 0.04))
    return Math.min(entrance, exit)
  })
  const visibility = useTransform(opacity, (value) => value > 0.001 ? 'visible' : 'hidden')
  const y = useTransform(() => {
    if (reducedMotion) return 0
    const entering = progress.get() < start + 0.04
    return (1 - opacity.get()) * (entering ? 12 : -12)
  })

  return (
    <motion.section id={id} className={`story-panel ${className}`} aria-labelledby={`${id}-title`} style={{ opacity, y, visibility }}>
      {children}
    </motion.section>
  )
}
