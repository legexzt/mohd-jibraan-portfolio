import { useEffect, useRef, useState } from 'react'
import useMagnetic from '../hooks/useMagnetic'
import AiFab from './AiFab'
import './Nav.css'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Profile', href: '#profile' },
  { label: 'Works', href: '#works' },
  { label: 'Services', href: '#services' },
  { label: 'AI Tools', href: '#ai-tools' },
  { label: 'Hire Me', href: '#hire' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Ask AI', href: '#ai' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useMagnetic(0.4)
  const logoRef = useMagnetic(0.3)
  const clockRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const tick = () => {
      if (clockRef.current) {
        clockRef.current.textContent = new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit', minute: '2-digit', second: '2-digit',
          timeZone: 'Asia/Kolkata',
        })
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}>
        <div className="nav-left">
          <a href="#top" className="nav-logo magnetic" ref={logoRef}>MJ©</a>
          <AiFab />
        </div>
        <div className="nav-loc">
          <span>Hyderabad, IN</span>
          <span className="nav-dot">·</span>
          <span ref={clockRef} />
        </div>
        <button
          className="nav-menu magnetic"
          ref={menuRef}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`nav-menu-line ${open ? 'open' : ''}`} />
          <span className={`nav-menu-line ${open ? 'open' : ''}`} />
        </button>
      </header>

      <div className={`menu-overlay ${open ? 'open' : ''}`}>
        <nav className="menu-links">
          {LINKS.map((l, i) => (
            <div className="menu-link-mask" key={l.label}>
              <a
                href={l.href}
                className="menu-link"
                style={{ transitionDelay: open ? `${0.12 + i * 0.07}s` : '0s' }}
                onClick={(e) => {
                  setOpen(false)
                  if (l.label === 'Ask AI') {
                    e.preventDefault()
                    window.dispatchEvent(new CustomEvent('open-ai-drawer'))
                  }
                }}
              >
                <span className="menu-link-num">0{i + 1}</span>
                <span className="menu-link-text">{l.label}</span>
              </a>
            </div>
          ))}
        </nav>
        <div className="menu-meta">
          <span>mdjibjibran@gmail.com</span>
          <span>©2026 — Folio v3.0</span>
        </div>
      </div>
    </>
  )
}
