import { useMemo } from 'react'
import './About.css'

const STATEMENT =
  "I'm Mohd Jibraan, a WordPress developer from Hyderabad. I fix and maintain WordPress sites — the bugs, the broken layouts, the little things that drive site owners crazy. Found, fixed, and kept fixed."

export default function About() {
  // Split statement into words for the reveal animation
  const words = useMemo(() => STATEMENT.split(' '), [])

  return (
    <section className="about" id="about">
      <div className="sec-label" data-reveal><i />ABOUT ME</div>

      <p className="about-statement" data-reveal-words>
        {words.map((w, i) => (
          <span className="about-word-mask" key={i}>
            <span className="about-word" style={{ transitionDelay: `${i * 0.018}s` }}>
              {w}&nbsp;
            </span>
          </span>
        ))}
      </p>

      <div className="about-grid">
        <div className="about-portrait" data-reveal>
          <div className="about-portrait-frame">
            <span className="about-portrait-mono">MJ</span>
            <div className="about-portrait-scan" />
          </div>
          <div className="about-portrait-tag">MOHD JIBRAAN — HYDERABAD, INDIA</div>
        </div>

        <div className="about-body" data-reveal style={{ transitionDelay: '.15s' }}>
          <p>
            WordPress developer with a year of hands-on experience fixing
            and maintaining real sites. I specialize in bug fixing, Elementor
            repair, PHP/JS debugging and responsive fixes.
          </p>
          <p>
            Team Leader of <em>legezt</em> — building LezzFlow, a hyperlocal
            commerce platform selected among the Top 50 in
            <em> Smart India Hackathon 2026</em>. Pursuing B.E. Computer
            Science at Lords Institute of Engineering & Technology.
          </p>

          <div className="about-skills">
            {['WordPress', 'Elementor', 'PHP', 'JavaScript', 'CSS', 'Debugging', 'Responsive Design', 'Site Maintenance']
              .map((s, i) => (
                <span className="about-chip" key={s} style={{ animationDelay: `${i * 0.07}s` }}>{s}</span>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
