export default function ArrivalScene({ onNavigate }) {
  return (
    <>
      <p className="scene-eyebrow">DI SINI, KITA CIPTA KENANGAN</p>
      <h2 id="scene-arrival-title" className="scene-title arrival-title" tabIndex={-1}>WE MADE IT! <span className="scene-leaf" aria-hidden="true">🌿</span></h2>
      <p className="arrival-family">ANAIZ FAMILY TRIP 2026</p>
      <p className="arrival-date"><time dateTime="2026-10-24">24 &amp; 25 OKTOBER 2026</time></p>
      <p className="arrival-slogan">One Family, One Journey,<br />Thousand Memories.</p>
      <p className="arrival-quote">Bukan destinasi yang menjadikan perjalanan ini istimewa, tetapi insan yang bersama kita sepanjang perjalanan.</p>
      <button type="button" className="journey-button journey-button-secondary" onClick={() => onNavigate(0, 'scene-sabak-title')}>Ulang Perjalanan <span aria-hidden="true">↺</span></button>
    </>
  )
}
