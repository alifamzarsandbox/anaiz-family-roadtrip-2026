import { useEffect, useState } from 'react'
import { motion, useTransform } from 'motion/react'
import { getCountdown } from '../utils/countdown.js'

export default function CountdownTimer({ progress }) {
  const [remaining, setRemaining] = useState(getCountdown)
  const opacity = useTransform(progress, [0, 0.16, 0.2], [1, 1, 0])
  const visibility = useTransform(opacity, (value) => value > 0.001 ? 'visible' : 'hidden')
  useEffect(() => {
    let interval
    const sync = () => {
      clearInterval(interval)
      const next = getCountdown()
      setRemaining(next)
      if (!document.hidden && !next.expired) interval = setInterval(() => {
        const current = getCountdown()
        setRemaining(current)
        if (current.expired) clearInterval(interval)
      }, 1000)
    }
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  return (
    <motion.div className="departure-countdown" style={{ opacity, visibility }}>
      {remaining.expired ? <p className="departure-day" role="status">IT'S ROAD TRIP DAY! 🚗</p> : (
        <div role="timer" aria-live="off" aria-label="Masa sehingga 24 Oktober 2026, jam 12 tengah malam waktu Malaysia">
        <dl className="countdown-digits">
          {[[remaining.days, 'Hari'], [remaining.hours, 'Jam'], [remaining.minutes, 'Minit'], [remaining.seconds, 'Saat']].map(([value, label]) => (
            <div key={label}><dt>{label}</dt><dd>{String(value).padStart(2, '0')}</dd></div>
          ))}
        </dl>
        </div>
      )}
    </motion.div>
  )
}
