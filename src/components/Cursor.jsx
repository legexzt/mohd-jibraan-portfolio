import { useEffect, useRef } from 'react'
import './Cursor.css'

// Normal cursor stays; a glow aura follows the mouse everywhere
export default function Cursor() {
  const glowRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches) return
    const glow = glowRef.current
    if (!glow) return

    let mx = -300, my = -300, gx = mx, gy = my, raf
    let running = false

    const loop = () => {
      const dx = mx - gx
      const dy = my - gy
      gx += dx * 0.14
      gy += dy * 0.14
      glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`

      // If still interpolating toward mouse, keep running; otherwise sleep
      if (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15) {
        raf = requestAnimationFrame(loop)
      } else {
        running = false
      }
    }

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (!running) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={glowRef} className="cursor-glow" />
}
