import { useMemo } from 'react'
import './About.css'

const STATEMENT =
  "I'm Mohd Jibraan, a web developer from Hyderabad. I build websites, web apps & AI-powered automations — responsive sites, full-stack applications, and smart workflows. Designed, built and shipped fast."

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
            Web developer with a year of hands-on experience building and
            fixing real sites. I build responsive websites and web apps, and
            use AI tools and automation to design, build and ship faster.
          </p>
          <p>
            Team Leader of <em>legezt</em> — building LezzFlow, a hyperlocal
            commerce platform selected among the Top 50 in
            <em> Smart India Hackathon 2026</em>. Pursuing B.E. Computer
            Science at Lords Institute of Engineering & Technology.
          </p>

          <div className="about-skills">
            {['Web Development', 'JavaScript', 'React', 'Node.js', 'AI Tools', 'Automation', 'Debugging', 'Responsive Design']
              .map((s, i) => (
                <span className="about-chip" key={s} style={{ animationDelay: `${i * 0.07}s` }}>{s}</span>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
