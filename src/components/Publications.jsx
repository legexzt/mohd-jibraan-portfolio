import { useEffect, useState } from 'react'
import './Certificates.css'
import './Publications.css'

const PUB = {
  src: '/certs/pub-irjash-fibot.jpg',
  title: 'FI-BOT Smart Fire-Fighting Robot Using Arduino and Sensors',
  org: 'International Research Journal on Advanced Science Hub (IRJASH) · Vol. 07, Issue 04 — April 2025',
  desc: 'Published research paper on an Arduino-based fire-fighting robot using sensors. Author: Mohd Jibraan. e-ISSN: 2582-4376.',
}

export default function Publications() {
  const [lightbox, setLightbox] = useState(false)

  // Spotlight follows mouse inside the card
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches) return
    const card = document.querySelector('.pub-card')
    if (!card) return
    const fn = (e) => {
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    card.addEventListener('mousemove', fn)
    return () => card.removeEventListener('mousemove', fn)
  }, [])

  // Escape closes lightbox
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <section className="certs" id="publications">
      <div className="sec-label" data-reveal><i />RESEARCH</div>
      <h2 className="sec-title" data-reveal>Publi<em>cations</em></h2>
      <p className="certs-hint" data-reveal>Click the certificate to view it full-size</p>

      <div className="certs-grid pubs-grid">
        <button
          className="cert-card cert-photo-card pub-card"
          data-reveal
          onClick={() => setLightbox(true)}
          aria-label={`View ${PUB.title}`}
        >
          <div className="cert-spotlight" />
          <div className="cert-photo-wrap">
            <img src={PUB.src} alt={PUB.title} loading="lazy" />
            <span className="cert-zoom">⤢</span>
          </div>
          <h3 className="cert-title">{PUB.title}</h3>
          <p className="cert-org">{PUB.org}</p>
          <p className="pub-desc">{PUB.desc}</p>
          <div className="cert-shine" />
        </button>
      </div>

      {lightbox && (
        <div className="cert-lightbox" onClick={() => setLightbox(false)}>
          <button className="cert-lb-close" aria-label="Close" onClick={() => setLightbox(false)}>✕</button>
          <figure className="cert-lb-figure" onClick={(e) => e.stopPropagation()}>
            <img src={PUB.src} alt={PUB.title} />
            <figcaption>
              <strong>{PUB.title}</strong>
              <span>{PUB.org}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
