import { useEffect, useRef, useState } from 'react'
import './AskAI.css'

const PROFILE = {
  name: 'Mohd Jibraan',
  role: 'WordPress Bug Fixing & Maintenance',
  location: 'Hyderabad, India',
  email: 'mdjibjibran@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohd-jibraan/',
  github: 'https://github.com/legexzt',
  whatsapp: 'https://wa.me/919182481181',
}

const KB = [
  {
    keys: ['certificate', 'certificates', 'certification', 'award', 'achieve'],
    reply: `Here are Mohd Jibraan's certificates:\n\n1. **Smart India Hackathon 2026** — Top 50 Finalist with Team legezt (his 6-member team)\n2. **Python with AI** — Internshala Trainings\n3. **Google Cloud GenAI Study Jams** — 5th Place, GDG on Campus\n4. **Talent Hunt** — built a robotic firefighter car (Lords Institute)\n5. **Sanketika** — Designing Lead (certificate + memento, Lords Institute)\n\nYou can see the actual certificate images in the Certificates section above.`,
  },
  {
    keys: ['experience', 'work', 'job', 'skill', 'wordpress', 'elementor', 'service'],
    reply: `Mohd Jibraan has **~1 year of hands-on experience** in:\n\n• **WordPress bug fixing** — PHP errors, JS/console errors, white screen, plugin conflicts\n• **Elementor** — layout repair, broken sections, responsive fixes\n• **Responsive fixes** — mobile/tablet layout issues\n• **Website maintenance** — updates, backups, speed & security basics\n\nHe's currently open to freelance bug-fixing and maintenance work.`,
  },
  {
    keys: ['education', 'study', 'college', 'degree', 'semester', 'lords', 'university'],
    reply: `He's pursuing a **B.E. in Computer Science** at **Lords Institute of Engineering & Technology, Hyderabad** — currently in his **5th semester** (2024–2028).\n\nHe's also the **Team Leader of "legezt"**, a 6-member team building LezzFlow.`,
  },
  {
    keys: ['project', 'lezzflow', 'built', 'portfolio', 'work'],
    reply: `His genuine projects:\n\n• **LezzFlow** — hyperlocal commerce platform; his SIH 2026 Top-50 project (info.legezt.in)\n• **LezzFlow Black** — premium 3D marketing site for LezzFlow\n• **Laptop Recommendation Chatbot** — LLM-powered chatbot\n• **Phishing Website Detection** — ML classification project\n• **Interior Design Cost Prediction** — ML regression project\n\nCheck the Works section for live links.`,
  },
  {
    keys: ['team', 'legezt', 'sih', 'hackathon', 'member'],
    reply: `He leads **Team "legezt"** — 6 members building **LezzFlow**, a hyperlocal commerce platform for rural India (connecting customers, kirana sellers & delivery partners). The team was selected among the **Top 50 in Smart India Hackathon 2026**.`,
  },
  {
    keys: ['contact', 'email', 'phone', 'hire', 'whatsapp', 'linkedin', 'reach', 'message'],
    reply: `You can reach him at:\n\n• Email: **mdjibjibran@gmail.com**\n• LinkedIn: linkedin.com/in/mohd-jibraan\n• WhatsApp: via the WhatsApp button in the Contact section\n• GitHub: github.com/legexzt\n\nHe's based in Hyderabad, India and open to freelance work.`,
  },
  {
    keys: ['who', 'about', 'yourself', 'name', 'jibraan'],
    reply: `**Mohd Jibraan** is a web developer from **Hyderabad, India**, specialising in **WordPress bug fixing & maintenance** (Elementor, PHP/JS errors, responsive fixes). He's a B.E. Computer Science student (5th sem) and Team Leader of "legezt" — Top 50 in SIH 2026 with LezzFlow.`,
  },
  {
    keys: ['price', 'rate', 'cost', 'charge', 'fee'],
    reply: `For pricing, it's best to discuss your specific issue with him directly — drop a mail at **mdjibjibran@gmail.com** or ping him on WhatsApp. He'll scope the bug and quote fairly.`,
  },
]

const FALLBACK = `I don't have that info — but you can ask Mohd Jibraan directly at **mdjibjibran@gmail.com**. Try asking me about his certificates, experience, projects, education, team, or contact details.`

const SUGGESTIONS = [
  'What are your certificates?',
  'Tell me about your experience',
  'What projects have you built?',
  'How can I contact you?',
]

function findReply(q) {
  const text = q.toLowerCase()
  for (const entry of KB) {
    if (entry.keys.some((k) => text.includes(k))) return entry.reply
  }
  return FALLBACK
}

function renderMarkdown(text) {
  // tiny renderer: **bold** and line breaks
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <strong key={i}>{p.slice(2, -2)}</strong>
      : <span key={i}>{p}</span>
  )
}

export default function AskAI() {
  const [messages, setMessages] = useState([
    {
      from: 'ai',
      text: `Hey! I'm **Jibraan's AI assistant**. Ask me anything about his certificates, experience, projects, education or how to contact him.`,
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text) => {
    const q = (text ?? input).trim()
    if (!q || typing) return
    setMessages((m) => [...m, { from: 'user', text: q }])
    setInput('')
    setTyping(true)
    const reply = findReply(q)
    // natural-feeling delay based on reply length
    const delay = Math.min(900 + reply.length * 4, 2600)
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'ai', text: reply }])
      setTyping(false)
    }, delay)
  }

  return (
    <section className="askai" id="ai">
      <div className="sec-label" data-reveal><i />AI ASSISTANT</div>
      <h2 className="sec-title" data-reveal>Ask AI <em>about me</em></h2>
      <p className="askai-sub" data-reveal>
        Curious about my certificates, experience or projects? Ask away — the assistant knows me well.
      </p>

      <div className="askai-chat" data-reveal>
        <div className="askai-head">
          <img src="/profile.jpg" alt="Mohd Jibraan" className="askai-avatar" />
          <div>
            <div className="askai-name">Jibraan's AI</div>
            <div className="askai-status"><i />online — knows his certificates, experience & projects</div>
          </div>
        </div>

        <div className="askai-messages">
          {messages.map((m, i) => (
            <div key={i} className={`askai-msg ${m.from}`}>
              {m.from === 'ai' && (
                <img src="/profile.jpg" alt="" className="askai-msg-avatar" />
              )}
              <div className="askai-bubble">{renderMarkdown(m.text)}</div>
            </div>
          ))}
          {typing && (
            <div className="askai-msg ai">
              <img src="/profile.jpg" alt="" className="askai-msg-avatar" />
              <div className="askai-bubble askai-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="askai-suggestions">
          {SUGGESTIONS.map((s) => (
            <button key={s} className="askai-chip" onClick={() => send(s)}>
              {s}
            </button>
          ))}
        </div>

        <form
          className="askai-input-row"
          onSubmit={(e) => { e.preventDefault(); send() }}
        >
          <input
            className="askai-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about certificates, experience, projects…"
            aria-label="Ask a question"
          />
          <button type="submit" className="askai-send" aria-label="Send">↑</button>
        </form>
      </div>
    </section>
  )
}
