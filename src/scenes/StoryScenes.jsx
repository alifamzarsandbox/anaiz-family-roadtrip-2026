import StoryPanel from './StoryPanel.jsx'
import HeroScene from './HeroScene.jsx'
import { OnTheRoadScene, SikScene, MountainScene } from './JourneyScene.jsx'
import ArrivalScene from './ArrivalScene.jsx'

const chapters = [
  { id: 'scene-sabak', start: 0, end: 0.2, className: 'story-hero', Content: HeroScene },
  { id: 'scene-road', start: 0.2, end: 0.4, Content: OnTheRoadScene },
  { id: 'scene-sik', start: 0.4, end: 0.6, Content: SikScene },
  { id: 'scene-mountain', start: 0.6, end: 0.8, Content: MountainScene },
  { id: 'scene-arrival', start: 0.8, end: 1, className: 'story-arrival', Content: ArrivalScene },
]

export default function StoryScenes({ progress, reducedMotion, onNavigate }) {
  return (
    <div className="story-scenes">
      {chapters.map(({ Content, ...chapter }) => (
        <StoryPanel key={chapter.id} {...chapter} progress={progress} reducedMotion={reducedMotion}>
          <Content progress={progress} reducedMotion={reducedMotion} onNavigate={onNavigate} />
        </StoryPanel>
      ))}
    </div>
  )
}
