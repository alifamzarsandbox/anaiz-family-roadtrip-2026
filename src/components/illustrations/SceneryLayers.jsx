import { useId } from 'react'
import { Cloud, CoconutTree, CountryRoad, ForestTree, Mist, MountainLayers, PaddyFields } from './SceneryElements.jsx'

/** Independent, named SVG layers ready for scroll transforms in Phase 3. */
export default function SceneryLayers({ landscape = 'countryside', className = '' }) {
  const id = useId()
  const mountain = landscape === 'mountain'
  const hills = landscape === 'hills'
  return (
    <svg className={className} viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>{mountain ? 'Gunung berlapis berinspirasikan Gunung Jerai, hutan dan kabus lembut' : hills ? 'Bukit hijau Kedah, sungai dan suasana desa' : 'Sawah padi, pokok kelapa dan jalan desa pada waktu pagi'}</title>
      <defs>
        <linearGradient id={`${id}-sky`} x2="0" y2="1"><stop stopColor={mountain ? '#E8D9C5' : '#C9DFE8'} /><stop offset="1" stopColor="#FAF6EB" /></linearGradient>
        <radialGradient id={`${id}-glow`}><stop stopColor="#EBCB8B" stopOpacity=".5" /><stop offset="1" stopColor="#EBCB8B" stopOpacity="0" /></radialGradient>
      </defs>
      <path d="M0 0H1000V560H0Z" fill={`url(#${id}-sky)`} />
      <g data-layer="sun"><circle cx="728" cy="115" r="112" fill={`url(#${id}-glow)`} /><circle cx="728" cy="115" r="38" fill="#EBCB8B" opacity=".85" /></g>
      <g data-layer="clouds"><Cloud x={107} y={70} scale={1.3} opacity={.8} /><Cloud x={425} y={48} scale={.75} opacity={.75} /><Cloud x={800} y={136} scale={1.2} opacity={.8} /></g>
      {mountain ? <MountainLayers /> : <g data-layer="hills"><path d="M0 325Q110 217 229 274Q364 157 494 264Q625 182 751 273Q904 213 1000 288V410H0Z" fill="#B5C7AF" /><path d="M0 339Q123 275 258 323Q431 220 573 301Q775 238 1000 333V419H0Z" fill="#8FA884" /></g>}
      {mountain && <Mist />}
      <PaddyFields />
      {hills && <path data-layer="river" d="M411 326Q330 358 478 377Q625 401 489 439L431 459H534Q681 408 548 380Q385 351 456 326Z" fill="#C9DFE8" stroke="#E5E9CE" strokeWidth="3" />}
      <g data-layer="distant-trees">
        {[40, 90, 150, 820, 870, 940, 980].map((x, i) => <ForestTree key={x} x={x} y={338 + (i % 2) * 12} scale={.35 + (i % 3) * .08} tone="#708F77" />)}
      </g>
      {!mountain && <g data-layer="kampung-house"><path d="M249 332V295H296V333" fill="#E8D9C5" /><path d="M237 299L273 273L309 299Z" fill="#9F7C62" /><path d="M257 332V311H268V332 M280 307H290V317H280Z" fill="#7C8E75" /><path d="M248 333H297" stroke="#8B9C75" strokeWidth="3" /></g>}
      <CountryRoad />
      <g data-layer="foreground">
        {mountain ? <><ForestTree x={139} y={459} scale={1.4} /><ForestTree x={885} y={399} scale={1.1} /></> : <><CoconutTree x={172} y={444} scale={1.2} /><CoconutTree x={860} y={380} scale={.8} flip /></>}
        <path d="M0 539Q152 499 287 535Q499 517 645 548Q831 491 1000 518V560H0Z" fill="#8B9C75" />
        {[35, 290, 760, 945].map((x) => <g key={x} transform={`translate(${x} 539)`} fill="none" stroke="#496B55" strokeWidth="2" strokeLinecap="round"><path d="M0 7Q2-11-6-19 M0 7Q6-15 14-17 M0 7Q-10-6-16-7" /></g>)}
        <g fill="#FAF6EB"><circle cx="290" cy="520" r="3" /><circle cx="304" cy="529" r="2" /><circle cx="754" cy="523" r="3" /></g>
      </g>
      <g data-layer="birds" fill="none" stroke="#496B55" strokeWidth="2" strokeLinecap="round" opacity=".6"><path d="M286 126q7-7 14 0q7-7 14 0 M326 110q5-5 10 0q5-5 10 0" /></g>
    </svg>
  )
}
