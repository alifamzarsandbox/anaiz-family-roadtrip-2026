import { useRef, useState } from 'react'
import { motion, useMotionValueEvent } from 'motion/react'

const locations = [
  { label: 'Sabak Bernam', progress: 0, heading: 'scene-sabak-title' },
  { label: 'Sik', progress: 0.5, heading: 'scene-sik-title' },
  { label: 'Gunung Jerai', progress: 0.97, heading: 'scene-arrival-title' },
]

export default function JourneyProgress({ progress, onNavigate }) {
  const initial = progress.get() < 0.4 ? 0 : progress.get() < 0.6 ? 1 : 2
  const [active, setActive] = useState(initial)
  const activeRef = useRef(initial)
  useMotionValueEvent(progress, 'change', (p) => {
    const next = p < 0.4 ? 0 : p < 0.6 ? 1 : 2
    if (next !== activeRef.current) {
      activeRef.current = next
      setActive(next)
    }
  })

  return (
    <nav className="journey-progress" aria-label="Lokasi perjalanan">
      <div className="progress-rail" aria-hidden="true"><motion.div style={{ scaleX: progress }} /></div>
      <ol>
        {locations.map((location, index) => (
          <li key={location.label}>
            <button type="button" onClick={() => onNavigate(location.progress, location.heading)} aria-current={index === active ? 'step' : undefined}>
              <span className="milestone-dot" aria-hidden="true" />
              <span>{location.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
