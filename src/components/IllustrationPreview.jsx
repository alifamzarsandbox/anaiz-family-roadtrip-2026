import AnimatedCar from './illustrations/AnimatedCar.jsx'
import SceneryLayers from './illustrations/SceneryLayers.jsx'

export default function IllustrationPreview() {
  return (
    <div className="illustration-preview">
      <figure className="landscape-main">
        <div className="illustration-stage">
          <SceneryLayers className="landscape-svg" />
          <AnimatedCar className="family-car" />
          <span className="postcard-caption" aria-hidden="true">Salam dari Sabak Bernam</span>
        </div>
        <figcaption><span>01 / SAWAH & LANGIT PAGI</span><span>Sabak Bernam, Selangor</span></figcaption>
      </figure>
      <div className="landscape-studies">
        <figure><div className="study-stage"><SceneryLayers landscape="hills" className="landscape-svg" /></div><figcaption>02 / BUKIT & SUNGAI KEDAH</figcaption></figure>
        <figure><div className="study-stage"><SceneryLayers landscape="mountain" className="landscape-svg" /></div><figcaption>03 / MENUJU GUNUNG JERAI</figcaption></figure>
      </div>
      <p className="art-preview-note">Kajian ilustrasi · Bab perjalanan akan disambungkan dalam fasa seterusnya.</p>
    </div>
  )
}
