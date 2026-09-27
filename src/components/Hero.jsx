import { useEffect, useRef, useState } from 'react'
import useMagnetic from '../hooks/useMagnetic'
import './Hero.css'

export default function Hero({ started }) {
  const [par, setPar] = useState({ x: 0, y: 0 })
  const ctaRef = useMagnetic(0.4)
  const rafRef = useRef(null)

  // Subtle mouse parallax
  useEffect(() => {
    const onMove = (e) => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        setPar({
          x: (e.clientX / innerWidth - 0.5) * 2,
          y: (e.clientY / innerHeight - 0.5) * 2,
        })
        rafRef.current = null
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const lines = ['MOHD', 'JIBRAAN']

  return (
    <section className="hero" id="top">
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      <div className="hero-inner">
        <div className={`hero-topline ${started ? 'go' : ''}`}>
          <span className="hero-available"><i /> AVAILABLE FOR FREELANCE</span>
          <span className="hero-folio">FOLIO / 2026</span>
        </div>

        <h1 className="hero-title">
          {lines.map((line, li) => (
            <span className="hero-line" key={line}>
              <span
                className={`hero-line-inner ${started ? 'go' : ''} ${li === 1 ? 'outline' : ''} ${li === 2 ? 'accent' : ''}`}
                style={{
                  transitionDelay: `${0.05 + li * 0.12}s`,
                  transform: `translateY(${started ? 0 : 110}%) translateX(${par.x * (li + 1) * 10}px)`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className={`hero-sub ${started ? 'go' : ''}`}>
          <p className="hero-desc">
            I'm <strong>Mohd Jibraan</strong> — I fix and maintain WordPress
            sites: the bugs, the broken layouts, the little things that drive
            you crazy. Based in <strong>Hyderabad, India</strong>.
          </p>
          <a href="#works" className="hero-cta magnetic" ref={ctaRef}>
            <span>See my work</span>
            <span className="hero-cta-arrow">↗</span>
          </a>
        </div>

        <div className={`hero-stats ${started ? 'go' : ''}`}>
          {[
            ['1+', 'Year fixing WordPress'],
            ['Top 50', 'Smart India Hackathon 2026'],
            ['5th Sem', 'B.E. Computer Science'],
            ['6', 'Members led in Team legezt'],
          ].map(([num, label], i) => (
            <div className="hero-stat" key={label} style={{ transitionDelay: `${0.5 + i * 0.1}s` }}>
              <div className="hero-stat-num">{num}</div>
              <div className="hero-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`hero-scroll ${started ? 'go' : ''}`}>
        <span>SCROLL</span>
        <div className="hero-scroll-line"><div className="hero-scroll-thumb" /></div>
      </div>
    </section>
  )
}
