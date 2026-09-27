import { useEffect } from 'react'
import './Certificates.css'

const CERTS = [
  {
    icon: '◆',
    title: 'Smart India Hackathon 2026',
    org: 'Top 50 Finalist — Team legezt',
    year: '2026',
    code: 'SIH-2026-TOP50',
  },
  {
    icon: '▲',
    title: 'Python with AI',
    org: 'Internshala Trainings',
    year: '',
    code: 'INTERNSHALA',
  },
  {
    icon: '●',
    title: 'Google Cloud GenAI Study Jams',
    org: '5th Place — GDG on Campus',
    year: '2025',
    code: 'GDG-GENAI',
  },
  {
    icon: '■',
    title: 'Talent Hunt — Robotics',
    org: 'Robotic Firefighter Car — Lords Institute',
    year: '',
    code: 'TALENT-HUNT',
  },
  {
    icon: '✦',
    title: 'Sanketika — Designing Lead',
    org: 'Certificate + Memento — Lords Institute',
    year: '',
    code: 'SANKETIKA-LEAD',
  },
]

export default function Certificates() {
  // Spotlight follows mouse inside each card
  useEffect(() => {
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

  return (
    <section className="certs" id="certificates">
      <div className="sec-label" data-reveal><i />CREDENTIALS</div>
      <h2 className="sec-title" data-reveal>Certificates & <em>badges</em></h2>

      <div className="certs-grid">
        {CERTS.map((c, i) => (
          <div className="cert-card" key={c.code} data-reveal style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
            <div className="cert-spotlight" />
            <div className="cert-top">
              <span className="cert-icon">{c.icon}</span>
              {c.year && <span className="cert-year">{c.year}</span>}
            </div>
            <h3 className="cert-title">{c.title}</h3>
            <p className="cert-org">{c.org}</p>
            <div className="cert-foot">
              <span className="cert-code">{c.code}</span>
              <span className="cert-verify">VERIFIED ✓</span>
            </div>
            <div className="cert-shine" />
          </div>
        ))}
      </div>
    </section>
  )
}
