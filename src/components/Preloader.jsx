import { useEffect, useState } from 'react'
import './Preloader.css'

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let raf
    const start = performance.now()
    const DURATION = 1700

    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        setLeaving(true)
        setTimeout(onDone, 850)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <div className={`preloader ${leaving ? 'leaving' : ''}`}>
      <div className="preloader-center">
        <div className="preloader-name">
          {'MOHD JIBRAAN©'.split('').map((ch, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.045}s` }}>
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </div>
        <div className="preloader-sub">CREATIVE DEVELOPER — FOLIO 2026</div>
      </div>
      <div className="preloader-count">{count}%</div>
      <div className="preloader-bar">
        <div className="preloader-bar-fill" style={{ width: `${count}%` }} />
      </div>
    </div>
  )
}
