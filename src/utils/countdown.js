import { trip } from '../data/trip.js'

const departure = Date.parse(trip.startsAt)

export function getCountdown(now = Date.now()) {
  const total = Math.max(0, Math.ceil((departure - now) / 1000))
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor(total / 3600) % 24,
    minutes: Math.floor(total / 60) % 60,
    seconds: total % 60,
    expired: total === 0,
  }
}
