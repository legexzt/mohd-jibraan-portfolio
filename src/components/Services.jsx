import { useState } from 'react'
import './Services.css'

const SERVICES = [
  { id: '01', title: 'Web Development', desc: 'Responsive websites built with modern stacks — fast, clean, and mobile-first. From landing pages to full sites.', tags: ['HTML/CSS', 'JavaScript', 'Responsive'] },
  { id: '02', title: 'Web Apps & Software', desc: 'Full-stack web applications — frontend to backend, databases included. Real software that works.', tags: ['React', 'Node.js', 'Full-Stack'] },
  { id: '03', title: 'AI Tools & Automation', desc: 'AI-powered workflows and automations that save hours — smart tools integrated into your site or business.', tags: ['AI Tools', 'Automation', 'Workflows'] },
  { id: '04', title: 'Debugging & Maintenance', desc: 'Bugs found and fixed — PHP/JS errors, broken layouts, plugin conflicts. Your site stays healthy while you focus on business.', tags: ['Debugging', 'WordPress', 'Maintenance'] },
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
