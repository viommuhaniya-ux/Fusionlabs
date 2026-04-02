import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [label, setLabel] = useState('')
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const dot = cursorDotRef.current
    const ring = cursorRingRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setHidden(false)
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)
    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)

    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const el = t.closest('[data-cursor]') as HTMLElement | null
      if (el) {
        setHovered(true)
        setLabel(el.dataset.cursor || '')
      } else {
        setHovered(false)
        setLabel('')
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onMouseOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          width: clicked ? '6px' : '8px',
          height: clicked ? '6px' : '8px',
          background: hovered ? '#fff' : '#09090b',
          borderRadius: '50%',
          opacity: hidden ? 0 : 1,
          transition: 'width 0.15s, height 0.15s, background 0.2s, opacity 0.3s',
          mixBlendMode: hovered ? 'difference' : 'normal',
        }}
      />
      {/* Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform flex items-center justify-center"
        style={{
          width: hovered ? '64px' : clicked ? '28px' : '36px',
          height: hovered ? '64px' : clicked ? '28px' : '36px',
          border: `1.5px solid ${hovered ? '#09090b' : 'rgba(9,9,11,0.35)'}`,
          borderRadius: hovered ? '12px' : '50%',
          opacity: hidden ? 0 : 1,
          background: hovered ? 'rgba(9,9,11,0.06)' : 'transparent',
          transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-radius 0.3s, border-color 0.2s, background 0.2s, opacity 0.3s',
        }}
      >
        {label && (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#09090b',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.2s',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  )
}
