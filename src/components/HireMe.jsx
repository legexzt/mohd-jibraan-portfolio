import useMagnetic from '../hooks/useMagnetic'
import './HireMe.css'

const WHATSAPP_NUMBER = '919182481181'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`

const OFFERINGS = [
  {
    id: '01',
    title: 'Award-Winning Style Website Design',
    tag: 'Aesthetics & Experience',
    desc: 'Break free from cookie-cutter templates. I craft striking, modern website designs featuring premium dark aesthetics, bold typography, fluid micro-interactions, and an uncompromising visual standard that commands attention.',
    bullets: [
      'Distinctive visual identity & typography',
      'Smooth micro-interactions & high-polish UI',
      'Flawless responsive layouts for all viewports',
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Complete Websites with Domain & Email Setup',
    tag: 'All-In-One Launch',
    desc: 'Get a fully operational website delivered without the technical headache. The complete package includes full site development plus custom domain configuration and professional business email setup included from day one.',
    bullets: [
      'Full website development from concept to deploy',
      'Custom domain setup included in the package',
      'Professional business email setup included',
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Website Management & Maintenance',
    tag: 'Ongoing Reliability',
    desc: 'Keep your digital storefront fast, secure, and always up to date. I manage and maintain your website for you so you can focus on your business without worrying about broken links, bugs, or outdated content.',
    bullets: [
      'Routine maintenance & active health monitoring',
      'Bug fixes, layout adjustments & content updates',
      'Performance tuning & reliability upkeep',
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Video Editing (10 to 30 Minutes)',
    tag: 'Video Post-Production',
    desc: 'Clean, engaging video editing tailored for long-form content, educational videos, tutorials, or YouTube uploads between 10 and 30 minutes in length. Client provides footage and covers production costs; I deliver paced, polished cuts.',
    bullets: [
      'Edits videos of 10 to 30 minutes duration',
      'Client provides footage & bears video production costs',
      'Tight narrative flow, audio balance & clean polish',
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
]

export default function HireMe() {
  const ctaRef = useMagnetic(0.35)

  return (
    <section className="hire" id="hire">
      <div className="sec-label" data-reveal><i />COLLABORATION</div>
      <h2 className="sec-title" data-reveal>
        What I can <em>do for you</em>
      </h2>

      <p className="hire-intro" data-reveal>
        Clear communication, dedicated focus, and end-to-end execution. Here are the core services
        I provide to bring your ideas to life:
      </p>

      {/* Offerings Grid */}
      <div className="hire-grid">
        {OFFERINGS.map((offer, i) => (
          <div
            key={offer.id}
            className="hire-card"
            data-reveal
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="hire-card-top">
              <div className="hire-card-icon">{offer.icon}</div>
              <span className="hire-card-tag">{offer.tag}</span>
              <span className="hire-card-num">({offer.id})</span>
            </div>

            <h3 className="hire-card-title">{offer.title}</h3>
            <p className="hire-card-desc">{offer.desc}</p>

            <ul className="hire-card-bullets">
              {offer.bullets.map((b, bi) => (
                <li key={bi}>
                  <i />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="hire-card-border-glow" />
          </div>
        ))}
      </div>

      {/* Pricing discussion note */}
      <div className="hire-pricing-note" data-reveal>
        <div className="hire-pricing-inner">
          <div className="hire-pricing-icon">💬</div>
          <div className="hire-pricing-text">
            <strong>Transparent & Custom Pricing:</strong> I do not charge rigid fixed packages.
            Pricing is discussed directly based on your specific requirements, project scope, and timeline.
          </div>
        </div>
      </div>

      {/* Internship Line — Confident, highlighted strip */}
      <div className="hire-internship-strip" data-reveal>
        <div className="internship-badge">
          <span className="internship-dot" /> OPEN TO INTERNSHIPS
        </div>
        <p className="internship-quote">
          "Open to internships — any internship opportunity, I'm in."
        </p>
        <p className="internship-sub">
          Ready to dive into fast-paced teams, contribute clean code, and learn on real production systems.
        </p>
      </div>

      {/* BIG prominent WhatsApp CTA Button */}
      <div className="hire-cta-wrap" data-reveal>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="hire-whatsapp-btn magnetic"
          ref={ctaRef}
        >
          <span className="hire-wa-icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01s-.52.07-.79.37c-.27.3-1.04 1.02-1.04 2.48s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.27-.2-.57-.34m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.37l-.36-.22-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.44h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41z" />
            </svg>
          </span>
          <span className="hire-wa-content">
            <span className="hire-wa-main">Chat on WhatsApp</span>
            <span className="hire-wa-sub">Direct discussion & quick response · +91 9182481181</span>
          </span>
          <span className="hire-wa-arrow">↗</span>
        </a>
      </div>
    </section>
  )
}
