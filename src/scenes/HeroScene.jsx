import { CalendarDays, MapPin } from 'lucide-react'
import { trip } from '../data/trip.js'

export default function HeroScene({ onNavigate }) {
  return (
    <>
      <p className="scene-eyebrow">PACK YOUR BAGS!</p>
      <h1 id="scene-sabak-title" className="hero-title" tabIndex={-1}><span className="hero-family">ANAIZ FAMILY</span><span className="hero-road">ROAD TRIP <span>2026<span className="title-period">.</span></span></span></h1>
      <p className="scene-date"><CalendarDays size={14} aria-hidden="true" /><time dateTime="2026-10-24">{trip.dateLabel}</time></p>
      <p className="scene-duration">{trip.daysLabel}<span aria-hidden="true"> · </span>{trip.duration}</p>
      <p className="hero-route"><MapPin size={14} aria-hidden="true" />Sabak Bernam → Sik → Gunung Jerai</p>
      <p className="hero-slogan">Perjalanan kecil, kenangan besar.</p>
      <button type="button" className="journey-button" onClick={() => onNavigate(0.3, 'scene-road-title')}>Jom Mulakan Perjalanan <span aria-hidden="true">🚗</span></button>
    </>
  )
}
