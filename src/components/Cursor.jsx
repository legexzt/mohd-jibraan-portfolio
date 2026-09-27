import { useEffect, useRef } from 'react'
import './Cursor.css'

// Normal cursor stays; a glow aura follows the mouse everywhere
export default function Cursor() {
  const glowRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const glow = glowRef.current
    let mx = -300, my = -300, gx = mx, gy = my, raf

    const onMove = (e) => { mx = e.clientX; my = e.clientY }

    const loop = () => {
      gx += (mx - gx) * 0.12
      gy += (my - gy) * 0.12
      glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={glowRef} className="cursor-glow" />
}
