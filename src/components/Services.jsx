import { useState } from 'react'
import './Services.css'

const SERVICES = [
  { id: '01', title: 'WordPress Bug Fixing', desc: 'PHP/JS errors, broken layouts, plugin conflicts — found, fixed, and kept fixed. Your site works the way it should.', tags: ['PHP', 'JavaScript', 'Debugging'] },
  { id: '02', title: 'Elementor Repair', desc: 'Elementor layouts repaired and rebuilt — pixel-faithful, responsive, and clean. No more broken sections.', tags: ['Elementor', 'Page Builders'] },
  { id: '03', title: 'Responsive Fixes', desc: 'Sites that break on mobile, fixed. Clean, working layouts on every screen size — phone, tablet, desktop.', tags: ['CSS', 'Mobile-First'] },
  { id: '04', title: 'Site Maintenance', desc: 'Updates, backups, speed basics — your WordPress site stays healthy and fast while you focus on business.', tags: ['Updates', 'Backups', 'Speed'] },
]

export default function Services() {
  const [open, setOpen] = useState(0)

  return (
    <section className="services" id="services">
      <div className="sec-label" data-reveal><i />WHAT I DO</div>
      <h2 className="sec-title" data-reveal>Services & <em>expertise</em></h2>

      <div className="services-list">
        {SERVICES.map((s, i) => (
          <div className={`service-row ${open === i ? 'open' : ''}`} key={s.id} data-reveal>
            <button className="service-head" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="service-num">({s.id})</span>
              <span className="service-title">{s.title}</span>
              <span className="service-icon">{open === i ? '−' : '+'}</span>
            </button>
            <div className="service-body">
              <div className="service-body-inner">
                <p>{s.desc}</p>
                <div className="service-tags">
                  {s.tags.map((t) => <span key={t} className="service-tag">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
