import { useState } from 'react'
import './Profile.css'

export default function Profile() {
  const [imgError, setImgError] = useState(false)

  return (
    <section className="profile" id="profile">
      <div className="sec-label" data-reveal><i />THE FACE BEHIND</div>
      <h2 className="sec-title" data-reveal>Hello, <em>it's me</em></h2>

      <div className="profile-grid">
        {/* Photo with animated glow ring */}
        <div className="profile-photo-wrap" data-reveal>
          <div className="profile-ring" />
          <div className="profile-ring profile-ring-2" />
          <div className="profile-photo">
            {!imgError ? (
              <img src="/profile.jpg" alt="Mohd Jibraan" onError={() => setImgError(true)} />
            ) : (
              <span className="profile-photo-mono">MJ</span>
            )}
          </div>
          <div className="profile-badge">
            <span className="profile-badge-dot" /> Open to work
          </div>
        </div>

        {/* Text + socials */}
        <div className="profile-info" data-reveal style={{ transitionDelay: '.15s' }}>
          <h3 className="profile-name">Mohd Jibraan</h3>
          <p className="profile-role">WordPress Developer — Hyderabad, India</p>
          <p className="profile-bio">
            I fix and maintain WordPress sites — Elementor layouts, PHP/JS errors,
            responsive fixes. Team Leader of legezt, building LezzFlow, selected
            among the Top 50 in Smart India Hackathon 2026.
          </p>

          <div className="profile-socials">
            <a href="https://www.linkedin.com/in/mohd-jibraan/" target="_blank" rel="noreferrer" className="profile-social" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/legexzt" target="_blank" rel="noreferrer" className="profile-social" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a11.04 11.04 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.38-5.26 5.66.41.35.77 1.05.77 2.12v3.14c0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
              </svg>
              <span>GitHub</span>
            </a>
            <a href="https://info.legezt.in" target="_blank" rel="noreferrer" className="profile-social" aria-label="Website">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9.5" />
                <path d="M2.5 12h19M12 2.5c2.8 2.6 4.2 5.8 4.2 9.5s-1.4 6.9-4.2 9.5c-2.8-2.6-4.2-5.8-4.2-9.5s1.4-6.9 4.2-9.5z" />
              </svg>
              <span>Website</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
