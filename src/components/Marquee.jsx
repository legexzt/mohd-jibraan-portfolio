import { useEffect, useRef } from 'react'
import './Marquee.css'

const WORDS = ['WEB DEVELOPMENT', 'WEB APPS', 'AI TOOLS', 'AUTOMATION', 'SOFTWARE', 'RESPONSIVE']

function Row({ reverse = false, outline = false, speedRef, words = WORDS, logo = false }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let pos = reverse ? -50 : 0
    let raf
    const loop = () => {
      const speed = speedRef.current * (reverse ? -1 : 1)
      pos -= speed
      if (pos <= -50) pos += 50
      if (pos > 0) pos -= 50
      track.style.transform = `translateX(${pos}%)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reverse, speedRef])

  const items = [...words, ...words]
  return (
    <div className="marquee-row">
      <div className="marquee-track" ref={trackRef}>
        {items.map((w, i) => (
          <span key={i} className={`marquee-word ${outline ? 'outline' : ''}`}>
            {logo ? (
              <span className="lezzflow-logo">
                <span className="lezzflow-lezz">lezz</span><span className="lezzflow-flow">flow</span>
              </span>
            ) : (
              w
            )}
            <i className="marquee-star">✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  const speedRef = useRef(0.05)

  return (
    <section className="marquee" aria-hidden="true">
      <Row speedRef={speedRef} />
      <Row reverse outline speedRef={speedRef} />
      <Row speedRef={speedRef} words={['legezt']} />
      <Row reverse speedRef={speedRef} words={['']} logo />
    </section>
  )
}
