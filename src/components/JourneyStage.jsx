import { useRef } from 'react'
import AnimatedCar from './illustrations/AnimatedCar.jsx'
import JourneyScenery from './illustrations/JourneyScenery.jsx'
import useJourneyMotion from '../hooks/useJourneyMotion.js'
import StoryScenes from '../scenes/StoryScenes.jsx'
import useJourneyNavigation from '../hooks/useJourneyNavigation.js'
import JourneyProgress from './JourneyProgress.jsx'
import CountdownTimer from './CountdownTimer.jsx'
import ArrivalEffects from './ArrivalEffects.jsx'

export default function JourneyStage() {
  const journeyRef = useRef(null)
  const journey = useJourneyMotion(journeyRef)
  const navigate = useJourneyNavigation(journeyRef, journey.progress, journey.reducedMotion)

  return (
    <section ref={journeyRef} id="journey" className="journey-track" aria-label="Perjalanan interaktif dari Sabak Bernam ke Gunung Jerai">
      <div className="journey-stage">
        <JourneyScenery {...journey} />
        <div className="story-sky-veil" aria-hidden="true" />
        <ArrivalEffects progress={journey.progress} reducedMotion={journey.reducedMotion} />
        <StoryScenes progress={journey.progress} reducedMotion={journey.reducedMotion} onNavigate={navigate} />
        <AnimatedCar className="journey-car" wheelRotation={journey.wheelRotation} bodyOffset={journey.bodyOffset} />
        <CountdownTimer progress={journey.progress} />
        <JourneyProgress progress={journey.progress} onNavigate={navigate} />
      </div>
    </section>
  )
}
