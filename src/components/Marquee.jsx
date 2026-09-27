import './Marquee.css'

const WORDS = ['WEB DEVELOPMENT', 'WEB APPS', 'AI TOOLS', 'AUTOMATION', 'SOFTWARE', 'RESPONSIVE']

function getItems(words, minCount = 6) {
  const count = words.length || 1
  const multiplier = Math.max(1, Math.ceil(minCount / count))
  const half = Array(multiplier).fill(words).flat()
  return [...half, ...half]
}

function Row({ reverse = false, outline = false, words = WORDS, logo = false }) {
  const items = getItems(words, 6)
  return (
    <div className="marquee-row">
      <div className={`marquee-track ${reverse ? 'reverse' : 'normal'}`}>
        {items.map((w, i) => (
          <span key={i} className={`marquee-word ${outline ? 'outline' : ''}`}>
            {logo ? (
              <span className="lezzflow-logo">
                <span className="lezzflow-lezz">lezz</span><span className="lezzflow-flow">flow</span>
              </span>
            ) : (
              w
            )}
            <i className="marquee-star">✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="marquee" aria-hidden="true">
      <Row />
      <Row reverse outline />
      <Row words={['legezt']} />
      <Row reverse words={['']} logo />
    </section>
  )
}
