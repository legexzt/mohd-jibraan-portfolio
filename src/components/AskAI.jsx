import { useEffect, useRef, useState } from 'react'
import './AskAI.css'

const PROFILE = {
  name: 'Mohd Jibraan',
  role: 'Web Developer — Websites, Web Apps & AI Automations',
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
    keys: ['experience', 'work', 'job', 'skill', 'service', 'wordpress', 'elementor'],
    reply: `Mohd Jibraan has **~1 year of hands-on experience** in:\n\n• **Web development** — responsive websites with modern stacks\n• **Web apps & software** — full-stack applications, frontend to backend\n• **AI tools & automation** — AI-powered workflows that design, build and ship faster\n• **Debugging & maintenance** — PHP/JS errors, broken layouts, WordPress fixes\n\nHe's currently open to freelance projects and internships.`,
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
    reply: `**Mohd Jibraan** is a web developer from **Hyderabad, India** — he builds **websites, web apps & AI-powered automations** (responsive sites, full-stack applications, smart workflows). He's a B.E. Computer Science student (5th sem) and Team Leader of "legezt" — Top 50 in SIH 2026 with LezzFlow.`,
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
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      from: 'ai',
      text: `Hey! I'm **Jibraan's AI assistant**. Ask me anything about his certificates, experience, projects, education or how to contact him.`,
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Listen for open/close/toggle events or initial URL hash
  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)
    const handleToggle = () => setIsOpen((prev) => !prev)

    window.addEventListener('open-ai-drawer', handleOpen)
    window.addEventListener('close-ai-drawer', handleClose)
    window.addEventListener('toggle-ai-drawer', handleToggle)

    if (window.location.hash === '#ai' || window.location.hash === '#ask-ai') {
      setIsOpen(true)
    }

    return () => {
      window.removeEventListener('open-ai-drawer', handleOpen)
      window.removeEventListener('close-ai-drawer', handleClose)
      window.removeEventListener('toggle-ai-drawer', handleToggle)
    }
  }, [])

  // Close drawer on Escape key
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  // Manage body scroll and desktop focus
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      if (window.innerWidth > 768) {
        const timer = setTimeout(() => inputRef.current?.focus(), 320)
        return () => clearTimeout(timer)
      }
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Scroll to latest message
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, typing, isOpen])

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
    <>
      {/* Fixed AI Trigger Button below Nav at Top-Left */}
      <button
        className={`askai-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open AI Assistant"
        aria-expanded={isOpen}
      >
        <span className="askai-trigger-dot" />
        <span className="askai-trigger-text">AI</span>
      </button>

      {/* Backdrop Overlay */}
      <div
        className={`askai-backdrop ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-in Drawer */}
      <aside
        className={`askai-drawer ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mohd Jibraan AI Assistant"
      >
        <div className="askai-drawer-head">
          <div className="askai-head-info">
            <img src="/profile.jpg" alt="Mohd Jibraan" className="askai-avatar" />
            <div>
              <div className="askai-name">Jibraan's AI</div>
              <div className="askai-status">
                <i />online — knows certificates, experience & projects
              </div>
            </div>
          </div>
          <button
            className="askai-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close AI Assistant"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
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
            ref={inputRef}
            className="askai-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about certificates, experience, projects…"
            aria-label="Ask a question"
          />
          <button type="submit" className="askai-send" aria-label="Send">↑</button>
        </form>
      </aside>
    </>
  )
}
