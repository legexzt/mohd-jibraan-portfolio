import useMagnetic from '../hooks/useMagnetic'
import './Footer.css'

// WhatsApp number — same as on his freelance profiles (+91 9182481181).
// If he confirms a different number, update here.
const WHATSAPP_NUMBER = '919182481181'

const SOCIALS = [
  {
    label: 'LinkedIn', url: 'https://www.linkedin.com/in/mohd-jibraan/',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub', url: 'https://github.com/legexzt',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a11.04 11.04 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.38-5.26 5.66.41.35.77 1.05.77 2.12v3.14c0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
      </svg>
    ),
  },
  {
    label: 'info.legezt.in', url: 'https://info.legezt.in',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9.5" />
        <path d="M2.5 12h19M12 2.5c2.8 2.6 4.2 5.8 4.2 9.5s-1.4 6.9-4.2 9.5c-2.8-2.6-4.2-5.8-4.2-9.5s1.4-6.9 4.2-9.5z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp', url: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01s-.52.07-.79.37c-.27.3-1.04 1.02-1.04 2.48s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.27-.2-.57-.34m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.37l-.36-.22-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.44h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const mailRef = useMagnetic(0.25)
  const waRef = useMagnetic(0.25)
  const topRef = useMagnetic(0.4)

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer" id="contact">
      <div className="footer-glow" />

      <div className="sec-label" data-reveal><i />GET IN TOUCH</div>

      <h2 className="footer-title" data-reveal>
        LET'S WORK<br />
        <span className="footer-title-outline">TOGETHER</span>
        <span className="footer-star">✦</span>
      </h2>

      <div className="footer-ctas" data-reveal>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="footer-whatsapp-btn magnetic"
          ref={waRef}
        >
          <span className="footer-wa-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01s-.52.07-.79.37c-.27.3-1.04 1.02-1.04 2.48s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.27-.2-.57-.34m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.37l-.36-.22-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.44h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41z"/>
            </svg>
          </span>
          <span className="footer-wa-label">
            <span className="footer-wa-heading">Chat on WhatsApp</span>
            <span className="footer-wa-sub">+91 9182481181</span>
          </span>
          <span className="footer-wa-arrow">↗</span>
        </a>

        <a href="mailto:mdjibjibran@gmail.com" className="footer-mail magnetic" ref={mailRef}>
          <span className="footer-mail-text">mdjibjibran@gmail.com</span>
          <span className="footer-mail-circle">↗</span>
        </a>
      </div>

      <div className="footer-bottom" data-reveal>
        <div className="footer-socials">
          {SOCIALS.map((s) => (
            <a href={s.url} key={s.label} target="_blank" rel="noreferrer" className="footer-social">
              {s.icon}
              <span className="footer-social-label">{s.label}</span>
              <span className="footer-social-arrow">↗</span>
            </a>
          ))}
        </div>

        <div className="footer-meta">
          <span>©2026 Mohd Jibraan</span>
          <span>Hyderabad — 17.3850° N, 78.4867° E</span>
        </div>

        <button className="footer-top magnetic" ref={topRef} onClick={toTop} aria-label="Back to top">
          ↑
        </button>
      </div>
    </footer>
  )
}
