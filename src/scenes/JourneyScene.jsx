import { MapPin } from 'lucide-react'
import { motion, useTransform } from 'motion/react'

export function OnTheRoadScene() {
  return (
    <>
      <p className="scene-eyebrow">02 / ON THE ROAD</p>
      <h2 id="scene-road-title" className="scene-title narrative-title" tabIndex={-1}>Setiap perjalanan<br />ada ceritanya...</h2>
      <p className="scene-body">Dan cerita paling indah adalah yang kita cipta bersama.</p>
      <p className="scene-footnote">Dari jendela kecil, dunia terasa lebih indah.</p>
    </>
  )
}

export function SikScene({ progress, reducedMotion }) {
  const milestoneY = useTransform(progress, [0.4, 0.46], [8, 0])
  return (
    <>
      <motion.p className="scene-eyebrow location-milestone" style={{ y: reducedMotion ? 0 : milestoneY }}><MapPin size={15} aria-hidden="true" />DESTINASI PERTAMA · KEDAH</motion.p>
      <h2 id="scene-sik-title" className="scene-title" tabIndex={-1}>HELLO,<br />SIK KEDAH! <span className="scene-leaf" aria-hidden="true">🌿</span></h2>
      <p className="scene-body">Jauh perjalanan, indah pemandangan.</p>
      <p className="scene-support">Lebih indah apabila kita bersama keluarga tersayang.</p>
    </>
  )
}

export function MountainScene() {
  return (
    <>
      <p className="scene-eyebrow">04 / MENDEKATI AWAN</p>
      <h2 id="scene-mountain-title" className="scene-title" tabIndex={-1}>GUNUNG JERAI<br /><em>AWAITS</em></h2>
      <p className="scene-body">Semakin dekat ke destinasi...</p>
      <p className="scene-support">Semakin banyak kenangan menanti.</p>
    </>
  )
}
