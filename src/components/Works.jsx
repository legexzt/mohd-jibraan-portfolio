import './Works.css'

const PROJECTS = [
  { id: '01', title: 'LEZZFLOW', cat: 'Hyperlocal Commerce — SIH 2026 Top 50', year: '2026', c1: '#c8f542', c2: '#1a2605', span: 'wide', url: 'https://info.legezt.in', live: true },
]

export default function Works() {
  return (
    <section className="works" id="works">
      <div className="sec-label" data-reveal><i />SELECTED WORKS</div>
      <h2 className="sec-title" data-reveal>Projects that <em>speak</em> for themselves</h2>

      <div className="works-grid">
        {PROJECTS.map((p, i) => (
          <a
            href={p.url || '#works'}
            key={p.id}
            target={p.url ? '_blank' : undefined}
            rel={p.url ? 'noreferrer' : undefined}
            className={`work-item work-${p.span}`}
            data-reveal
            style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
            onClick={p.url ? undefined : (e) => e.preventDefault()}
          >
            <div className="work-canvas" style={{ background: `radial-gradient(circle at 30% 25%, ${p.c1}33, transparent 55%), linear-gradient(150deg, ${p.c2}, #0e0e0e)` }}>
              {p.live && <span className="work-live-badge"><i />LIVE</span>}
              <span className="work-big-title" style={{ WebkitTextStrokeColor: `${p.c1}aa` }}>{p.title}</span>
              <div className="work-badge" style={{ borderColor: `${p.c1}66`, color: p.c1 }}>{p.cat}</div>
              <div className="work-hover-fill" style={{ background: p.c1 }} />
              <span className="work-arrow">↗</span>
            </div>
            <div className="work-meta">
              <span className="work-name">{p.title}</span>
              <span className="work-year">{p.year}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
