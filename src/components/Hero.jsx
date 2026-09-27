import { useEffect, useRef, useState } from 'react'
import useMagnetic from '../hooks/useMagnetic'
import './Hero.css'

export default function Hero({ started }) {
  const heroRef = useRef(null)
  const ctaRef = useMagnetic(0.4)
  const rafRef = useRef(null)

  // Subtle mouse parallax via CSS variable — avoids re-rendering the Hero tree
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches) return
    const el = heroRef.current
    if (!el) return

    const onMove = (e) => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        const px = (e.clientX / window.innerWidth - 0.5) * 2
        el.style.setProperty('--par-x', px.toFixed(3))
        rafRef.current = null
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const lines = ['MOHD', 'JIBRAAN']

  return (
    <section className="hero" id="top" ref={heroRef}>
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
                  transform: `translateY(${started ? 0 : 110}%) translateX(calc(var(--par-x, 0) * ${(li + 1) * 10}px))`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className={`hero-sub ${started ? 'go' : ''}`}>
          <p className="hero-desc">
            I'm <strong>Mohd Jibraan</strong> — I build websites, web apps
            & AI-powered automations: responsive sites, full-stack apps, and
            smart workflows that ship fast. Based in <strong>Hyderabad, India</strong>.
          </p>
          <a href="#works" className="hero-cta magnetic" ref={ctaRef}>
            <span>See my work</span>
            <span className="hero-cta-arrow">↗</span>
          </a>
        </div>

        <div className={`hero-stats ${started ? 'go' : ''}`}>
          {[
            ['1+', 'Year building for the web'],
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
