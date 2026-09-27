import { useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Profile from './components/Profile'
import Works from './components/Works'
import Services from './components/Services'
import Certificates from './components/Certificates'
import AskAI from './components/AskAI'
import Footer from './components/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  // Scroll-reveal: watch everything tagged with data-reveal
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal], [data-reveal-words]')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div className="noise" />
      <Cursor />
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <Nav />
      <main>
        <Hero started={loaded} />
        <Marquee />
        <About />
        <Profile />
        <Works />
        <Services />
        <Certificates />
        <AskAI />
        <Footer />
      </main>
    </>
  )
}
