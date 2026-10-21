import { useSyncExternalStore } from 'react'
import { useScroll, useSpring, useTransform } from 'motion/react'

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
const subscribePreference = (notify) => {
  motionPreference.addEventListener('change', notify)
  return () => motionPreference.removeEventListener('change', notify)
}
const readPreference = () => motionPreference.matches

export default function useJourneyMotion(target) {
  // The page scroll is the sole input. No timers, wheel interception or React scroll state.
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end end'] })
  const reducedMotion = useSyncExternalStore(subscribePreference, readPreference)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140, damping: 18, mass: 0.4, restDelta: 0.00001,
  })
  const progress = useTransform(reducedMotion ? scrollYProgress : smoothProgress, (p) => Math.max(0, Math.min(1, p)))
  // Continuous speed at the final approach, easing to a stop at the end.
  const distance = useTransform(progress, (p) => {
    if (p <= 0.85) return p
    const t = (p - 0.85) / 0.15
    return 0.85 + 0.15 * (t + t * t - t * t * t)
  })
  const wheelRotation = useTransform(distance, (d) => reducedMotion ? 0 : d * 2520)
  const bodyOffset = useTransform(distance, (d) => reducedMotion ? 0 : Math.sin(d * Math.PI * 64) * 1.4 * Math.sin(Math.PI * d))

  return { progress, distance, wheelRotation, bodyOffset, reducedMotion }
}
