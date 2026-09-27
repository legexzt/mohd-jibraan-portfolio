import { useEffect, useState } from 'react'
import './Certificates.css'

const CERTS = [
  {
    src: '/certs/cert-sih-internal.webp',
    title: 'Smart India Hackathon 2026',
    org: 'Top 50 Finalist — Team legezt',
  },
  {
    src: '/certs/cert-python.webp',
    title: 'Python with AI',
    org: 'Internshala Trainings',
  },
  {
    src: '/certs/cert-gdg-winterbreak.webp',
    title: 'Google Cloud GenAI Study Jams',
    org: '5th Place — GDG on Campus',
  },
  {
    src: '/certs/cert-talent-hunt.webp',
    title: 'Talent Hunt — Robotics',
    org: 'Robotic Firefighter Car — Lords Institute',
  },
  {
    src: '/certs/cert-sanketika.webp',
    title: 'Sanketika — Designing Lead',
    org: 'Certificate + Memento — Lords Institute',
  },
]

export default function Certificates() {
  const [lightbox, setLightbox] = useState(null)

  // Spotlight follows mouse inside each card
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches) return
    const cards = document.querySelectorAll('.cert-card')
    const handlers = []
    cards.forEach((card) => {
      const fn = (e) => {
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - r.left}px`)
        card.style.setProperty('--my', `${e.clientY - r.top}px`)
      }
      card.addEventListener('mousemove', fn)
      handlers.push([card, fn])
    })
    return () => handlers.forEach(([c, fn]) => c.removeEventListener('mousemove', fn))
  }, [])

  // Keyboard nav for lightbox
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((lightbox + 1) % CERTS.length)
      if (e.key === 'ArrowLeft') setLightbox((lightbox - 1 + CERTS.length) % CERTS.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <section className="certs" id="certificates">
      <div className="sec-label" data-reveal><i />CREDENTIALS</div>
      <h2 className="sec-title" data-reveal>Certificates & <em>achievements</em></h2>
      <p className="certs-hint" data-reveal>Click any certificate to view it full-size</p>

      <div className="certs-grid">
        {CERTS.map((c, i) => (
          <button
            className="cert-card cert-photo-card"
            key={c.src}
            data-reveal
            style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
            onClick={() => setLightbox(i)}
            aria-label={`View ${c.title}`}
          >
            <div className="cert-spotlight" />
            <div className="cert-photo-wrap">
              <img src={c.src} alt={c.title} loading="lazy" />
              <span className="cert-zoom">⤢</span>
            </div>
            <h3 className="cert-title">{c.title}</h3>
            <p className="cert-org">{c.org}</p>
            <div className="cert-shine" />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div className="cert-lightbox" onClick={() => setLightbox(null)}>
          <button className="cert-lb-close" aria-label="Close" onClick={() => setLightbox(null)}>✕</button>
          <button
            className="cert-lb-prev"
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + CERTS.length) % CERTS.length) }}
          >‹</button>
          <figure className="cert-lb-figure" onClick={(e) => e.stopPropagation()}>
            <img src={CERTS[lightbox].src} alt={CERTS[lightbox].title} />
            <figcaption>
              <strong>{CERTS[lightbox].title}</strong>
              <span>{CERTS[lightbox].org}</span>
            </figcaption>
          </figure>
          <button
            className="cert-lb-next"
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % CERTS.length) }}
          >›</button>
        </div>
      )}
    </section>
  )
}
