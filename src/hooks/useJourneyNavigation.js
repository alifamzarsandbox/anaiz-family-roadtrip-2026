import { useCallback, useEffect, useRef } from 'react'

export default function useJourneyNavigation(target, progress, reducedMotion) {
  const pending = useRef(null)
  const focusFrame = useRef(0)
  useEffect(() => {
    const focusDestination = (p) => {
      if (!pending.current || Math.abs(p - pending.current.progress) > 0.0005) return
      // An instant scroll can finish before Motion has painted visibility.
      // Wait for that paint before focusing, without polling or changing scroll state.
      cancelAnimationFrame(focusFrame.current)
      focusFrame.current = requestAnimationFrame(() => {
        focusFrame.current = requestAnimationFrame(() => {
          if (!pending.current || Math.abs(progress.get() - pending.current.progress) > 0.0005) return
          const heading = document.getElementById(pending.current.heading)
          if (heading && getComputedStyle(heading).visibility === 'visible') {
            heading.focus({ preventScroll: true })
            pending.current = null
          }
        })
      })
    }
    const unsubscribe = progress.on('change', focusDestination)
    const cancel = () => { pending.current = null; cancelAnimationFrame(focusFrame.current) }
    for (const event of ['wheel', 'touchstart', 'pointerdown', 'keydown']) window.addEventListener(event, cancel, { passive: true })
    return () => {
      unsubscribe()
      cancelAnimationFrame(focusFrame.current)
      pending.current = null
      for (const event of ['wheel', 'touchstart', 'pointerdown', 'keydown']) window.removeEventListener(event, cancel)
    }
  }, [progress])

  return useCallback((destination, heading) => {
    const track = target.current
    if (!track) return
    const stage = track.querySelector('.journey-stage')
    const top = track.getBoundingClientRect().top + window.scrollY
    pending.current = { progress: destination, heading }
    window.scrollTo({ top: top + destination * (track.offsetHeight - stage.offsetHeight), behavior: reducedMotion ? 'instant' : 'smooth' })
    // Also handle navigation to a position that is already selected.
    if (Math.abs(progress.get() - destination) <= 0.0005) {
      const element = document.getElementById(heading)
      if (element && getComputedStyle(element).visibility === 'visible') {
        element.focus({ preventScroll: true })
        pending.current = null
      }
    }
  }, [target, progress, reducedMotion])
}
