import { useRef, useState, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  href?: string
  strength?: number
  'data-cursor'?: string
}

export default function MagneticButton({ children, className = '', href = '#', strength = 0.12, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    })
  }

  const onLeave = () => setPos({ x: 0, y: 0 })

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: pos.x === 0 && pos.y === 0
          ? 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
          : 'transform 0.1s ease',
        display: 'inline-flex',
        alignItems: 'center',
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
